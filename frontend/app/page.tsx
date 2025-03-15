import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-100 to-blue-50">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="animate-bounce inline-block mb-4">
          <Globe className="h-16 w-16 text-blue-600" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-blue-800">The Globetrotter Challenge</h1>

        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Test your travel knowledge with cryptic clues about famous destinations around the world!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
            <Link href="/register">
              Start Playing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
          >
            <Link href="/leaderboard">View Leaderboard</Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">How to Play</h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>Read the cryptic clues about a famous destination</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                2
              </span>
              <span>Select your answer from multiple choices</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                3
              </span>
              <span>Discover fun facts about each destination</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                4
              </span>
              <span>Challenge your friends to beat your score!</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

