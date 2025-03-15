"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getUserProfile, getRandomDestination, submitAnswer } from "@/lib/actions"
import ConfettiExplosion from "@/components/confetti-explosion"
import { ArrowRight, Home, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Destination, UserProfile } from "@/lib/types"

export default function ChallengeGame({ params }: { params: { username: string } }) {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [revealedFact, setRevealedFact] = useState<string | null>(null)
  const [challenger, setChallenger] = useState<UserProfile | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { username } = params

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load challenger profile
        const profile = await getUserProfile(decodeURIComponent(username))
        setChallenger(profile)

        // Load destination
        await loadNewDestination()

        // Load score from localStorage
        const savedScore = localStorage.getItem("globetrotter_score")
        if (savedScore) {
          setScore(JSON.parse(savedScore))
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load challenge data. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [username])

  const loadNewDestination = async () => {
    setLoading(true)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setRevealedFact(null)

    try {
      const data = await getRandomDestination()
      setDestination(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load destination. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer || !destination) return

    setSelectedAnswer(answer)

    try {
      const result = await submitAnswer(destination.id, answer)
      setIsCorrect(result.correct)

      // Update score
      const newScore = {
        correct: score.correct + (result.correct ? 1 : 0),
        total: score.total + 1,
      }
      setScore(newScore)
      localStorage.setItem("globetrotter_score", JSON.stringify(newScore))

      // Show confetti for correct answers
      if (result.correct) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }

      // Reveal a random fact
      if (destination.facts && destination.facts.length > 0) {
        const randomFact = destination.facts[Math.floor(Math.random() * destination.facts.length)]
        setRevealedFact(randomFact)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading challenge...</p>
        </div>
      </div>
    )
  }

  if (!destination || !challenger) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700 mb-6">We couldn't load the challenge data.</p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 bg-gradient-to-b from-sky-100 to-blue-50">
      {showConfetti && <ConfettiExplosion />}

      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => router.push("/")} className="border-blue-600 text-blue-600">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>

          <div className="bg-white px-4 py-2 rounded-full shadow-md">
            <span className="font-medium">Your Score: </span>
            <span className="text-green-600 font-bold">{score.correct}</span>
            <span className="text-gray-500"> / </span>
            <span className="text-gray-700">{score.total}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-xl font-semibold text-blue-800">You've been challenged by {challenger.username}!</h2>
          <p className="text-gray-700 mt-2">
            Their score: <span className="font-bold text-green-600">{challenger.score.correct}</span>
            <span className="text-gray-500"> / </span>
            <span>{challenger.score.total}</span>
          </p>
          <p className="mt-2 text-blue-600 font-medium">Can you beat them?</p>
        </div>

        <Card className="p-6 shadow-lg bg-white mb-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Where in the world is this?</h1>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Clues:</h2>
            <ul className="list-disc pl-6 space-y-3">
              {destination.clues.slice(0, 2).map((clue, index) => (
                <li key={index} className="text-lg text-gray-700">
                  {clue}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {destination.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`h-16 text-lg transition-all ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                    : selectedAnswer !== null && option === destination.correctAnswer
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {revealedFact && (
            <div
              className={`p-4 rounded-lg mb-6 transition-all ${
                isCorrect ? "bg-green-100 border border-green-300" : "bg-amber-100 border border-amber-300"
              }`}
            >
              <h3 className="font-semibold mb-2">
                {isCorrect
                  ? `🎉 Correct! Fun fact about ${destination.correctAnswer}:`
                  : `😢 Incorrect! The answer was ${destination.correctAnswer}. Fun fact:`}
              </h3>
              <p className="text-gray-700">{revealedFact}</p>
            </div>
          )}

          {selectedAnswer && (
            <div className="flex justify-center">
              <Button onClick={loadNewDestination} className="bg-blue-600 hover:bg-blue-700">
                Next Destination
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </Card>

        <div className="text-center">
          <Button asChild variant="outline" className="border-blue-600 text-blue-600">
            <Link href="/register">
              <Trophy className="mr-2 h-4 w-4" />
              Create Your Own Profile
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

