"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLeaderboard } from "@/lib/actions"
import { ArrowLeft, Medal, Trophy, Award } from "lucide-react"
import Link from "next/link"
import type { UserProfile } from "@/lib/types"

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-amber-700" />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen p-4 bg-gradient-to-b from-sky-100 to-blue-50">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" asChild className="border-blue-600 text-blue-600">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              <Trophy className="inline-block mr-2 h-6 w-6" />
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-700">Loading leaderboard...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-700">No players yet. Be the first to join!</p>
                <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Link href="/register">Start Playing</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-gray-500 font-medium">Rank</th>
                      <th className="px-4 py-3 text-left text-gray-500 font-medium">Player</th>
                      <th className="px-4 py-3 text-right text-gray-500 font-medium">Correct</th>
                      <th className="px-4 py-3 text-right text-gray-500 font-medium">Total</th>
                      <th className="px-4 py-3 text-right text-gray-500 font-medium">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => (
                      <tr key={user.username} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4 flex items-center">
                          <span className="mr-2 font-semibold">{index + 1}</span>
                          {getMedalIcon(index)}
                        </td>
                        <td className="px-4 py-4 font-medium">{user.username}</td>
                        <td className="px-4 py-4 text-right text-green-600 font-semibold">{user.score.correct}</td>
                        <td className="px-4 py-4 text-right text-gray-700">{user.score.total}</td>
                        <td className="px-4 py-4 text-right font-medium">
                          {user.score.total > 0
                            ? `${Math.round((user.score.correct / user.score.total) * 100)}%`
                            : "0%"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

