export interface Destination {
 clues : string[];
 id : string;
 facts : string[];
 correctAnswer : string;
 options : string[]
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

