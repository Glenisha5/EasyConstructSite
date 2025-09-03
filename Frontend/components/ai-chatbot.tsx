"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"
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
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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

  // Mock AI responses
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (language === "hi") {
      if (message.includes("सीमेंट") || message.includes("cement")) {
        return "नींव के लिए OPC 53 ग्रेड सीमेंट सबसे अच्छा है। यह उच्च शक्ति प्रदान करता है। UltraTech और ACC अच्छे ब्रांड हैं। क्या आपको कोई विशिष्ट मात्रा की जानकारी चाहिए?"
      }
      if (message.includes("पेंट") || message.includes("paint")) {
        return "1000 वर्ग फुट के लिए लगभग 40-50 लीटर पेंट की जरूरत होती है (2 कोट के लिए)। Asian Paints और Berger अच्छे विकल्प हैं। आपको किस रूम के लिए पेंट चाहिए?"
      }
      if (message.includes("स्टील") || message.includes("steel")) {
        return "आज TMT स्टील बार की कीमत ₹45-48 प्रति किलो है। TATA Steel और JSW अच्छी गुणवत्ता देते हैं। आपको किस साइज़ की बार चाहिए?"
      }
      if (message.includes("टाइल") || message.includes("tile")) {
        return "बाथरूम के लिए anti-slip ceramic tiles सबसे अच्छी हैं। Kajaria और Somany अच्छे ब्रांड हैं। साइज़ 300x300mm या 600x600mm लें।"
      }
      return "मैं आपकी निर्माण सामग्री की जरूरतों में मदद कर सकता हूं। कृपया सीमेंट, पेंट, स्टील, या टाइल्स के बारे में पूछें।"
    } else {
      if (message.includes("cement")) {
        return "For foundation work, OPC 53 Grade cement is best. It provides high strength and durability. UltraTech and ACC are reliable brands. Do you need quantity calculations for your project?"
      }
      if (message.includes("paint")) {
        return "For 1000 sq ft, you'll need approximately 40-50 liters of paint (for 2 coats). Asian Paints and Berger offer excellent quality. What type of room are you painting?"
      }
      if (message.includes("steel")) {
        return "Current TMT steel bar prices are ₹45-48 per kg. TATA Steel and JSW provide good quality. What diameter bars do you need for your construction?"
      }
      if (message.includes("tile")) {
        return "For bathrooms, anti-slip ceramic tiles are recommended. Kajaria and Somany are trusted brands. Consider 300x300mm or 600x600mm sizes for better aesthetics."
      }
      return "I can help you with construction materials like cement, paint, steel, tiles, and more. What specific information do you need for your project?"
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
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
      <Card className={`w-80 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-96"}`}>
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
            <div className="p-4 border-t">
              <div className="flex space-x-2">
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
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
