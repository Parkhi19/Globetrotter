export interface Destination {
  id: string
  name: string
  clues: string[]
  options: string[]
  correctAnswer: string
  facts: string[]
}

export interface UserProfile {
  username: string
  score: {
    correct: number
    total: number
  }
  createdAt: string
}

export interface AnswerResult {
  correct: boolean
  fact?: string
}

