"use server"

import type { Destination, UserProfile, AnswerResult } from "./types"
import { destinations } from "./destinations"
import { revalidatePath } from "next/cache"

// Mock database using server-side memory storage
const mockDB = {
  users: new Map<string, UserProfile>(),
  usersList: new Set<string>(),
}

// Add some sample users for the leaderboard
const sampleUsers = [
  {
    username: "TravelExplorer",
    score: { correct: 18, total: 22 },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    username: "GlobeTrotter42",
    score: { correct: 15, total: 20 },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    username: "WorldWanderer",
    score: { correct: 12, total: 15 },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Initialize sample data
sampleUsers.forEach((user) => {
  mockDB.users.set(user.username, user as UserProfile)
  mockDB.usersList.add(user.username)
})

// User Registration
export async function registerUser(username: string): Promise<UserProfile> {
  // Check if username already exists
  if (mockDB.users.has(username)) {
    throw new Error("Username already taken")
  }

  // Create new user profile
  const newUser: UserProfile = {
    username,
    score: {
      correct: 0,
      total: 0,
    },
    createdAt: new Date().toISOString(),
  }

  // Save to mock DB
  mockDB.users.set(username, newUser)
  mockDB.usersList.add(username)

  revalidatePath("/leaderboard")

  return newUser
}

// Get User Profile
export async function getUserProfile(username: string): Promise<UserProfile> {
  const user = mockDB.users.get(username)

  if (!user) {
    // For demo purposes, create a user if it doesn't exist
    return registerUser(username)
  }

  return user
}

// Update User Score
export async function updateUserScore(username: string, correct: boolean): Promise<UserProfile> {
  let user = mockDB.users.get(username)

  if (!user) {
    user = await registerUser(username)
  }

  user.score.correct += correct ? 1 : 0
  user.score.total += 1

  mockDB.users.set(username, user)

  revalidatePath("/leaderboard")

  return user
}

// Get Random Destination
export async function getRandomDestination(): Promise<Destination> {
  // In a real app, this would fetch from a database
  // For this demo, we'll use the static destinations array
  const randomIndex = Math.floor(Math.random() * destinations.length)
  return destinations[randomIndex]
}

// Submit Answer
export async function submitAnswer(destinationId: string, answer: string): Promise<AnswerResult> {
  // Find the destination
  const destination = destinations.find((d) => d.id === destinationId)

  if (!destination) {
    throw new Error("Destination not found")
  }

  const isCorrect = destination.correctAnswer === answer

  return {
    correct: isCorrect,
  }
}

// Get Leaderboard
export async function getLeaderboard(): Promise<UserProfile[]> {
  const users = Array.from(mockDB.users.values())

  // Sort by correct answers (descending)
  return users.sort((a, b) => b.score.correct - a.score.correct)
}

