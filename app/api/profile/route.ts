import { NextRequest, NextResponse } from 'next/server'

// Mock user profile data - replace with database
let mockProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Software developer passionate about creating innovative solutions.",
  avatar: null,
  joinDate: "January 2024",
  analysisCount: 12,
  createdAt: "2024-01-15T00:00:00Z"
}

export async function GET() {
  try {
    // Mock API call - replace with database query
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({ 
      success: true, 
      profile: mockProfile 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, bio } = body

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Mock API call - replace with database update
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update mock profile
    mockProfile = {
      ...mockProfile,
      name,
      email,
      bio: bio || mockProfile.bio
    }

    return NextResponse.json({ 
      success: true, 
      profile: mockProfile,
      message: "Profile updated successfully"
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    )
  }
} 