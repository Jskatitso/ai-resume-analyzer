import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, FileText, Zap, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">ResumeAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI-Powered Resume{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Feedback</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and get instant AI-powered optimization tips to land your dream job.
          </p>

          <Link href="/analyze">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Analyze My Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Instant Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get comprehensive feedback on your resume in seconds using advanced AI technology.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Targeted Improvements</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive specific suggestions to improve your resume's impact and effectiveness.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">ATS Optimization</h3>
            <p className="text-gray-600 dark:text-gray-300">Ensure your resume passes through Applicant Tracking Systems successfully.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6" />
              <span className="text-lg font-semibold">ResumeAI</span>
              <span className="text-gray-400">by ImperialDev Corporation</span>
            </div>

            <div className="flex space-x-6">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <a
                href="https://github.com/Jskatitso/ai-resume-analyzer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@imperialdev.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ImperialDev Corporation. Built with Next.js and AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
