"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  FileText, 
  ArrowLeft, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Award,
  Mail,
  Linkedin,
  Github,
  Building2
} from "lucide-react"

export default function AboutPage() {
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
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              ImperialDev Corporation
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of AI-powered career development tools. We're dedicated to helping 
            professionals achieve their career goals through innovative technology solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              At ImperialDev Corporation, we believe that every professional deserves access to 
              cutting-edge tools that can accelerate their career growth. Our mission is to 
              democratize AI technology and make professional development accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Through our innovative AI Resume Analyzer, we're helping job seekers optimize their 
              resumes, improve their chances of landing interviews, and ultimately achieve their 
              career aspirations.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To become the leading platform for AI-powered career development, 
                  empowering millions of professionals worldwide to reach their full potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Choose ImperialDev?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cutting-Edge AI</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by the latest artificial intelligence technology to provide 
                accurate and actionable insights.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data security is our top priority. We use enterprise-grade 
                encryption and never share your information.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Serving professionals worldwide with our innovative solutions 
                and dedicated support team.
              </p>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Development Team</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">AI & Software Engineers</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expert developers creating cutting-edge AI solutions and 
                maintaining our platform's performance and reliability.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-lg">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Product Team</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">UX/UI & Product Managers</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dedicated to creating intuitive user experiences and 
                ensuring our products meet the needs of modern professionals.
              </p>
            </Card>

            <Card className="text-center p-6 shadow-lg">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Security Team</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Data protection specialists</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ensuring your personal and professional information remains secure 
                with industry-leading security practices.
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">contact@imperialdev.com</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Linkedin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-300">ImperialDev Corporation</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Github className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-300">@imperialdev</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using our AI-powered tools 
            to advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/analyze">
              <Button size="lg" variant="outline" className="px-8">
                Try Resume Analyzer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 