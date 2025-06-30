"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Loader2, Download, LogOut, User } from "lucide-react"

interface AnalysisResult {
  score: number
  strengths: string[]
  improvements: string[]
  atsCompatibility: number
  keywordSuggestions: string[]
  extractedText?: string
  ai_feedback?: string
}

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = () => {
    // Mock logout - replace with real authentication
    window.location.href = "/"
  }

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
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to analyze resume')
      }

      const data = await response.json()
      setAnalysisResult(data.result)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze resume. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/profile">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Analysis</h1>
          <p className="text-gray-600 dark:text-gray-300">Upload your resume to get AI-powered feedback and optimization tips</p>
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
                  isDragActive 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600 dark:text-blue-400">Drop your resume here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Drag and drop your resume here, or click to browse</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Supports PDF, DOC, and DOCX files (max 10MB)</p>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-200 font-medium">{file.name}</span>
                    <span className="text-green-600 dark:text-green-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                </div>
              )}

              {error && (
                <Alert className="mt-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={analyzeResume}
                disabled={!file || isAnalyzing}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {analysisResult.score}/100
                  </div>
                  <Progress value={analysisResult.score} className="w-full" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {analysisResult.score >= 80 ? "Excellent!" : 
                     analysisResult.score >= 60 ? "Good, but room for improvement" : 
                     "Needs significant improvement"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600 dark:text-orange-400">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
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
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {analysisResult.atsCompatibility}%
                  </div>
                  <Progress value={analysisResult.atsCompatibility} className="w-full" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {analysisResult.atsCompatibility >= 90 ? "Excellent ATS compatibility" :
                     analysisResult.atsCompatibility >= 70 ? "Good ATS compatibility" :
                     "Needs improvement for ATS systems"}
                  </p>
                </div>
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
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extracted Text or AI Feedback (for debugging/transparency) */}
            {(analysisResult.extractedText || analysisResult.ai_feedback) && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Resume Text / AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {analysisResult.extractedText || analysisResult.ai_feedback}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  setFile(null)
                  setAnalysisResult(null)
                  setError(null)
                }}
                variant="outline"
                className="flex-1"
              >
                Analyze Another Resume
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
