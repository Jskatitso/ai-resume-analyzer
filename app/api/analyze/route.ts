import { NextRequest, NextResponse } from 'next/server'
import formidable, { File } from 'formidable'
import { promises as fs } from 'fs'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import OpenAI from 'openai'

// Helper to parse a form with formidable
async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await fs.readFile(file.filepath)
  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(buffer)
    return data.text
  } else if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  } else {
    throw new Error('Unsupported file type')
  }
}

async function analyzeWithOpenAI(resumeText: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not set in environment')
  }
  const openai = new OpenAI({ apiKey })

  // You can adjust the prompt and model as needed
  const prompt = `You are a professional resume reviewer. Analyze the following resume text and provide:
- An overall score out of 100
- 3 strengths
- 3 areas for improvement
- An ATS compatibility score out of 100
- 5 keyword suggestions

Resume:
${resumeText}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant for resume analysis.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 500,
    temperature: 0.7,
  })

  // Try to parse the response as JSON, fallback to plain text
  const content = completion.choices[0].message?.content || ''
  let result
  try {
    result = JSON.parse(content)
  } catch {
    result = { ai_feedback: content }
  }
  return result
}

// Fallback mock analysis for development
async function analyzeWithMock(resumeText: string) {
  return {
    score: 88,
    strengths: [
      'Well-structured experience section',
      'Good use of action verbs',
      'Relevant skills listed',
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Include a summary statement',
    ],
    atsCompatibility: 92,
    keywordSuggestions: ['Teamwork', 'Problem Solving', 'Communication'],
    extractedText: resumeText.slice(0, 500) + (resumeText.length > 500 ? '...' : ''),
  }
}

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form
    const { files } = await parseForm(req)
    const fileField = files.file;
    const resume = Array.isArray(fileField) ? fileField[0] : fileField;

    if (!resume) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Extract text from the uploaded file
    const resumeText = await extractTextFromFile(resume)

    // Use OpenAI if API key is set, otherwise fallback to mock
    let aiResult
    if (process.env.OPENAI_API_KEY) {
      aiResult = await analyzeWithOpenAI(resumeText)
    } else {
      aiResult = await analyzeWithMock(resumeText)
    }

    return NextResponse.json({ result: aiResult })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to analyze resume' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
} 