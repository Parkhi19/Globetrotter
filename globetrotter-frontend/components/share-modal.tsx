"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share, X, PhoneIcon as WhatsApp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import html2canvas from "html2canvas"

interface ShareModalProps {
  score: { correct: number; total: number }
  onClose: () => void
  username?: string
}

export default function ShareModal({ score, onClose, username = "" }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [displayUsername, setDisplayUsername] = useState(username)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [shareImage, setShareImage] = useState<string | null>(null)
  const { toast } = useToast()
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If username is provided, use it
    if (username) {
      setDisplayUsername(username)
      generateShareUrl(username)
    } else {
      // Get username from localStorage if available
      const storedUsername = localStorage.getItem("globetrotter_username")
      if (storedUsername) {
        setDisplayUsername(storedUsername)
        generateShareUrl(storedUsername)
      }
    }
  }, [username])

  const generateShareUrl = (name: string) => {
    const baseUrl = window.location.origin
    const url = `${baseUrl}/challenge/${encodeURIComponent(name)}`
    setShareUrl(url)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUsername(e.target.value)
  }

  const handleGenerateLink = async () => {
    if (!displayUsername.trim()) {
      toast({
        title: "Username required",
        description: "Please enter your username to generate a share link",
        variant: "destructive",
      })
      return
    }

    // Save username to localStorage
    localStorage.setItem("globetrotter_username", displayUsername)

    // Generate share URL
    generateShareUrl(displayUsername)

    // Generate share image
    await generateShareImage()

    toast({
      title: "Share link generated!",
      description: "Now you can challenge your friends to beat your score!",
    })
  }

  const generateShareImage = async () => {
    if (!shareCardRef.current) return

    setIsGeneratingImage(true)

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: null,
      })

      const imageUrl = canvas.toDataURL("image/png")
      setShareImage(imageUrl)
    } catch (error) {
      console.error("Error generating image:", error)
      toast({
        title: "Error",
        description: "Failed to generate share image",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Copied!",
      description: "Share link copied to clipboard",
    })
  }

  const shareToWhatsApp = () => {
    const text = `I scored ${score.correct}/${score.total} in The Globetrotter Challenge! Can you beat me? Play here: ${shareUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Challenge a Friend</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!shareUrl ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Your Username</Label>
                <Input
                  id="username"
                  value={displayUsername}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                />
              </div>

              <Button
                onClick={handleGenerateLink}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!displayUsername.trim()}
              >
                Generate Challenge Link
              </Button>
            </div>
          ) : (
            <>
              <div
                ref={shareCardRef}
                className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg text-white shadow-lg"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">The Globetrotter Challenge</h3>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-lg font-medium">{displayUsername} challenges you!</p>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{score.correct}</span>
                      <span className="text-xl opacity-80"> / </span>
                      <span className="text-xl">{score.total}</span>
                    </div>
                    <p className="mt-2 text-sm opacity-80">Can you beat this score?</p>
                  </div>
                  <p className="text-sm">Scan or click the link to play!</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="share-link">Challenge Link</Label>
                <div className="flex">
                  <Input id="share-link" value={shareUrl} readOnly className="flex-1" />
                  <Button onClick={copyToClipboard} variant="outline" size="icon" className="ml-2">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={shareToWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
                  <WhatsApp className="mr-2 h-5 w-5" />
                  Share on WhatsApp
                </Button>

                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Share className="mr-2 h-5 w-5" />
                  Copy Link
                </Button>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="ghost" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

