"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getRandomDestination, submitAnswer, updateUserScore } from "@/lib/actions"
import ConfettiExplosion from "@/components/confetti-explosion"
import ShareModal from "@/components/share-modal"
import { ArrowRight, Home, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Destination } from "@/lib/types"

export default function Game() {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [revealedFact, setRevealedFact] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  let ans = "something else"
  // const correctAnswer =  fetch("http://localhost:5000/api/clues")
  //get correct ans from api using question id
  useEffect(() => {
    loadNewDestination()

    // Load username from localStorage
    const storedUsername = localStorage.getItem("globetrotter_username")
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      // Redirect to register if no username
      router.push("/register")
    }

    // Load score from localStorage
    const savedScore = localStorage.getItem("globetrotter_score")
    if (savedScore) {
      setScore(JSON.parse(savedScore))
    }
  }, [])

  const loadNewDestination = async () => {
    setLoading(true)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setRevealedFact(null)

    try {
      const data = await getRandomDestination()
      console.log("mai data hu bhai", data)
      const correctAnswer = data.id
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
      // ans = result.correct;
      // Update score
      const newScore = {
        correct: score.correct + (result.correct ? 1 : 0),
        total: score.total + 1,
      }
      setScore(newScore)
      localStorage.setItem("globetrotter_score", JSON.stringify(newScore))

      // Update server-side score if username is available
      if (username) {
        await updateUserScore(username, result.correct)
      }

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
          <p className="mt-4 text-lg text-gray-700">Loading your destination...</p>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700 mb-6">We couldn't load a destination for you.</p>
          <Button onClick={loadNewDestination}>Try Again</Button>
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
            <span className="font-medium">Score: </span>
            <span className="text-green-600 font-bold">{score.correct}</span>
            <span className="text-gray-500"> / </span>
            <span className="text-gray-700">{score.total}</span>
          </div>

          <Button variant="outline" onClick={() => setShowShareModal(true)} className="border-blue-600 text-blue-600">
            <Share2 className="mr-2 h-4 w-4" />
            Challenge a Friend
          </Button>
        </div>

        <Card className="p-6 shadow-lg bg-white mb-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Where in the world is this?</h1>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Clues:</h2>
            <ul className="list-disc pl-6 space-y-3">
              {destination?.clues?.slice(0, 2).map((clue, index) => (
                <li key={index} className="text-lg text-gray-700">
                  {clue}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {destination?.options?.map((option) => (
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
      </div>

      {showShareModal && (
        <ShareModal score={score} onClose={() => setShowShareModal(false)} username={username || ""} />
      )}
    </main>
  )
}

