"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  FileText, 
  User, 
  Mail, 
  Camera, 
  Save, 
  Edit, 
  ArrowLeft, 
  LogOut, 
  Settings,
  History,
  Shield
} from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  bio: string
  avatar?: string
  joinDate: string
  analysisCount: number
  createdAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    bio: "",
    joinDate: "",
    analysisCount: 0,
    createdAt: ""
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  // Load profile data on component mount
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      const data = await response.json()
      
      if (data.success) {
        setProfile(data.profile)
      } else {
        setMessage("Failed to load profile")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Failed to load profile")
      setMessageType("error")
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage("")
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          bio: profile.bio
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setIsEditing(false)
        setMessage("Profile updated successfully!")
        setMessageType("success")
      } else {
        setMessage(data.error || "Failed to update profile")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Failed to update profile. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    // Mock logout - replace with real authentication
    window.location.href = "/"
  }

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/analyze" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Analysis</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account and preferences</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <Alert className={`mb-6 ${messageType === "success" ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"}`}>
            <AlertDescription className={messageType === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span>Change Photo</span>
                    </Button>
                  )}
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                {/* Bio Field */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Account Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Member since</span>
                  <span className="font-medium">{profile.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Resumes analyzed</span>
                  <span className="font-medium">{profile.analysisCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/analyze">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Analyze New Resume
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 