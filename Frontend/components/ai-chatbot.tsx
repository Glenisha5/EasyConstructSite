"use client"

import React, { useState, useRef, useEffect } from "react"
// TypeScript browser API types workaround
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T } ? T : any
type SpeechRecognitionEventType = typeof window extends { SpeechRecognitionEvent: infer T } ? T : any
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function AIChatbot() {
  const { language: contextLanguage, setLanguage: setContextLanguage } = useLanguage()
  const [language, setLanguage] = useState<"en" | "hi" | "kn">(contextLanguage || "en")
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      chatTitle: "Construction Assistant",
      chatSubtitle: "Ask me about construction materials",
      placeholder: "Ask about cement, paint, steel...",
      send: "Send",
      minimize: "Minimize",
      maximize: "Maximize",
      close: "Close",
      typing: "Assistant is typing...",
      quickQuestions: [
        "What cement is best for foundation?",
        "How much paint for 1000 sq ft?",
        "Steel bar prices today?",
        "Best tiles for bathroom?",
      ],
      welcomeMessage: "Hello! I'm your construction assistant. How can I help you with building materials today?",
    },
    hi: {
      chatTitle: "निर्माण सहायक",
      chatSubtitle: "निर्माण सामग्री के बारे में पूछें",
      placeholder: "सीमेंट, पेंट, स्टील के बारे में पूछें...",
      send: "भेजें",
      minimize: "छोटा करें",
      maximize: "बड़ा करें",
      close: "बंद करें",
      typing: "सहायक टाइप कर रहा है...",
      quickQuestions: [
        "नींव के लिए कौन सा सीमेंट सबसे अच्छा है?",
        "1000 वर्ग फुट के लिए कितना पेंट?",
        "आज स्टील बार की कीमतें?",
        "बाथरूम के लिए सबसे अच्छी टाइलें?",
      ],
      welcomeMessage: "नमस्ते! मैं आपका निर्माण सहायक हूं। आज मैं निर्माण सामग्री के साथ आपकी कैसे मदद कर सकता हूं?",
    },
     kn: {
    chatTitle: "ನಿರ್ಮಾಣ ಸಹಾಯಕ",
    chatSubtitle: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ",
    placeholder: "ಸಿಮೆಂಟ್, ಪೇಂಟ್, ಉಕ್ಕು ಬಗ್ಗೆ ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    minimize: "ಕುಗ್ಗಿಸಿ",
    maximize: "ವಿಸ್ತರಿಸಿ",
    close: "ಮುಚ್ಚಿ",
    typing: "ಸಹಾಯಕನು ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಾನೆ...",
    quickQuestions: [
      "ಅಡಿಪಾಯಕ್ಕೆ ಯಾವ ಸಿಮೆಂಟ್ ಉತ್ತಮ?",
      "1000 ಚದರ ಅಡಿಗೆ ಎಷ್ಟು ಬಣ್ಣ ಬೇಕು?",
      "ಇಂದು ಉಕ್ಕಿನ ಬಾರ್ ದರ ಎಷ್ಟು?",
      "ಬಾತ್‌ರೂಮ್‌ಗೆ ಉತ್ತಮ ಟೈಲ್ಸ್ ಯಾವುದು?",
    ],
    welcomeMessage: "ಹಲೋ! ನಾನು ನಿಮ್ಮ ನಿರ್ಮಾಣ ಸಹಾಯಕ. ಇಂದು ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳಲ್ಲಿ ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  },
}
  const t = translations[language]

  // Sync context language
  useEffect(() => {
    setContextLanguage && setContextLanguage(language)
  }, [language, setContextLanguage])


  // Call AI backend API
  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("https://macaque-touched-dassie.ngrok-free.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, lang: language }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.reply || "Sorry, I couldn't get a response from the assistant.";
    } catch (error) {
      return "Failed to get a response from the assistant.";
    }
  };

  // Speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = language === "hi" ? "hi-IN" : language === "kn" ? "kn-IN" : "en-US"
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        handleUserMessage(transcript)
      }

      recognition.onend = () => {
        setIsRecording(false)
        setStatusMessage("")
      }

      recognition.onerror = (event: any) => {
        setStatusMessage("Voice input error: " + event.error)
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    } else {
      setStatusMessage("⚠️ Voice input not supported in this browser.")
    }
  }, [language])

  // Text-to-speech
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech before starting new
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
      }
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "hi" ? "hi-IN" : language === "kn" ? "kn-IN" : "en-US"
      utterance.pitch = 1
      utterance.rate = 1
      utterance.onstart = () => {
        setStatusMessage("Assistant is speaking...")
        setIsSpeaking(true)
      }
      utterance.onend = () => {
        setStatusMessage("")
        setIsSpeaking(false)
      }
      utterance.onpause = () => setStatusMessage("Speech paused.")
      utterance.onresume = () => setStatusMessage("Assistant is speaking...")
      utterance.onerror = () => {
        setStatusMessage("")
        setIsSpeaking(false)
      }
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window && speechSynthesis.speaking) {
      speechSynthesis.cancel()
      setStatusMessage("")
      setIsSpeaking(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMsg: Message = {
        id: "welcome",
        type: "bot",
        content: t.welcomeMessage,
        timestamp: new Date(),
      }
      setMessages([welcomeMsg])
    }
  }, [isOpen, t.welcomeMessage])

  // Add user message and send to backend
  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    sendToChatbot(text)
  }

  // Send message to backend
  const sendToChatbot = async (message: string) => {
    setIsTyping(true)
    setStatusMessage("Sending to assistant...")
    try {
      const aiReply = await fetchAIResponse(message)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: aiReply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      speakText(aiReply)
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), type: "bot", content: "⚠️ Error contacting server.", timestamp: new Date() },
      ])
    } finally {
      setIsTyping(false)
      setStatusMessage("")
    }
  }

  // Send text input
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    handleUserMessage(inputValue.trim())
    setInputValue("")
  }

  // Toggle voice recording
  const toggleRecording = () => {
    if (!recognitionRef.current) return
    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.lang = language === "hi" ? "hi-IN" : language === "kn" ? "kn-IN" : "en-US"
      recognitionRef.current.start()
      setIsRecording(true)
      setStatusMessage("🎤 Listening...")
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue("")
    handleUserMessage(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
  <Card className={`w-[28rem] shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[36rem]"}`}> 
        <CardHeader className="p-4 bg-orange-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h4 className="font-semibold text-sm">{t.chatTitle}</h4>
                {!isMinimized && <p className="text-xs opacity-90">{t.chatSubtitle}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as any)}
                className="text-black text-xs rounded-md px-2 py-1 bg-white"
                style={{ minWidth: 70 }}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 hover:bg-orange-600"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 hover:bg-orange-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm">{message.content}</p>
                        {message.type === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {t.quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs h-8 justify-start bg-transparent hover:bg-orange-50"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t flex items-center space-x-2">
              <Button
                onClick={toggleRecording}
                className={`p-2 rounded-full ${isRecording ? "bg-red-500" : "bg-orange-500"} text-white`}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {/* Status and Stop button inside chat box */}
            {(statusMessage || isSpeaking) && (
              <div className="flex items-center justify-center py-1">
                {statusMessage && (
                  <div className="text-xs text-center text-gray-500 mr-2">{statusMessage}</div>
                )}
                {isSpeaking && (
                  <Button
                    onClick={stopSpeaking}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    title="Stop Speaking"
                  >
                    Stop
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
