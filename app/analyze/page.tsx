"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Loader2, Download } from "lucide-react"

interface AnalysisResult {
  score: number
  strengths: string[]
  improvements: string[]
  atsCompatibility: number
  keywordSuggestions: string[]
}

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setAnalysisResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: () => {
      setError("Please upload a valid PDF or Word document (max 10MB)")
    },
  })

  const analyzeResume = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis result
      const mockResult: AnalysisResult = {
        score: 78,
        strengths: [
          "Strong technical skills section",
          "Quantified achievements with metrics",
          "Clear and concise formatting",
          "Relevant work experience",
        ],
        improvements: [
          "Add more action verbs to job descriptions",
          "Include a professional summary",
          "Optimize for ATS with better keyword usage",
          "Expand on leadership experiences",
        ],
        atsCompatibility: 85,
        keywordSuggestions: ["Project Management", "Data Analysis", "Team Leadership", "Strategic Planning"],
      }

      setAnalysisResult(mockResult)
    } catch (err) {
      setError("Failed to analyze resume. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">ResumeAI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
          <p className="text-gray-600">Upload your resume to get AI-powered feedback and optimization tips</p>
        </div>

        {/* Upload Section */}
        {!analysisResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600">Drop your resume here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">Drag and drop your resume here, or click to browse</p>
                    <p className="text-sm text-gray-500">Supports PDF, DOC, and DOCX files (max 10MB)</p>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">{file.name}</span>
                    <span className="text-green-600 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                </div>
              )}

              {error && (
                <Alert className="mt-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {file && !isAnalyzing && (
                <Button onClick={analyzeResume} className="w-full mt-4 bg-blue-600 hover:bg-blue-700" size="lg">
                  Analyze Resume
                </Button>
              )}

              {isAnalyzing && (
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-blue-600 font-medium">Analyzing your resume...</span>
                  </div>
                  <Progress value={66} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>Analysis Complete</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{analysisResult.score}/100</div>
                  <p className="text-gray-600">Overall Resume Score</p>
                  <Progress value={analysisResult.score} className="w-full mt-4" />
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* ATS Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle>ATS Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span>ATS Score</span>
                  <span className="font-bold">{analysisResult.atsCompatibility}%</span>
                </div>
                <Progress value={analysisResult.atsCompatibility} className="w-full mb-4" />
                <p className="text-sm text-gray-600">
                  Your resume is {analysisResult.atsCompatibility >= 80 ? "well" : "moderately"} optimized for Applicant
                  Tracking Systems.
                </p>
              </CardContent>
            </Card>

            {/* Keyword Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.keywordSuggestions.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  setFile(null)
                  setAnalysisResult(null)
                }}
                variant="outline"
                className="flex-1"
              >
                Analyze Another Resume
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
