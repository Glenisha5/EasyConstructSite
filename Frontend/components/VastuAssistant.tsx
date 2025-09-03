"use client"

import { useState } from "react"
import { Compass, Send, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
}

export default function VastuAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Welcome! Ask me about Vastu guidelines for your home or workspace 🌿",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const vastuResponses = (query: string): string => {
    const q = query.toLowerCase()
    {/* these have details about the vastu structure for home*/}
    if(q.includes("planning")||q.includes("design"))
      return "Vastu-based planning uses the Vastu Purusha Mandala and divides the home into 16 angular zones(each 22.5°) to place rooms correctly.For accurate layout,use scaled drawings and consider Ayadi ratio calculations."
    if(q.includes("entrance")||q.includes("main door"))
      return "The main entrance is best in the North-East,East,or North Direction.Avoid South-West entrances.Again the main entrance placement depends on the ‘pada’ within the 32-segment Vastu Purusha Mandala. For instance, north-facing homes benefit from N3 (Mukhya), N4 (Bhallat), or N5 (Soma); avoid inauspicious Padas like N1 (Roga), N2 (Naga), etc. "
    if(q.includes("living room"))
      return "Living room should ideally be in the North-East(good for guests and positivity).Place heavy furniture in the South-West corner."
    if(q.includes("bedroom")||q.includes("master bedroom"))
      return "The master bedroom should be in the South-West.Avoid North-East."
    if(q.includes("children")||q.includes("kids room"))
      return "Children's bedroom is ideal in the East or North-West."
    if(q.includes("kitchen"))
      return "Kitchens are ideal in the South-East(Agni corner) or South of South-East.If not possible ,North-West is second-best."
    if(q.includes("toilet")||q.includes("bathroom"))
      return "Toilets are best in the North-West or West.Avoid North-East and South-West."
    if(q.includes("pooja")||q.includes("prayer")||q.includes("temple"))
      return "The Pooja/Prayer room should be in the North-East.Use light colors here."
    if(q.includes("dining"))
      return "Dining room should be in the West.The head of the family should face east while eating."
    if(q.includes("staircase"))
      return "Staircases are best in the South,South-West or West.Avoid North-East."
    if(q.includes("study")||q.includes("library"))
      return "Study room should be in the East.North or North-East.Students should face East while studying."
    if(q.includes("balcony")||q.includes("veranda"))
      return "Balconies are best in the North or East for good ventilation and positivity."
    if(q.includes("garage")||q.includes("car parking"))
      return "Garage/Car parking is ideal in the North-West or South-East.Avoid North-East."
    if(q.includes("colors")||q.includes("paint"))
      return "Light colors like white,yellow  and light light blue are Vastu-friendly.Avoid black or dark shades excessively"
    return "I can guide you on entrance, bedroom, kitchen, toilets, or prayer room directions. What would you like to know?"
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMsg: Message = { id: Date.now().toString(), type: "user", content: inputValue }
    const botMsg: Message = { id: (Date.now() + 1).toString(), type: "bot", content: vastuResponses(inputValue) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInputValue("")
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
        >
          <Compass className="h-6 w-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="flex justify-between items-center p-4 bg-green-600 text-white">
          <h4 className="font-semibold">Vastu Guide</h4>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-3rem)] p-0">
          <ScrollArea className="flex-1 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 p-2 rounded-lg max-w-[75%] ${
                  msg.type === "user" ? "ml-auto bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </ScrollArea>

          <div className="p-3 border-t flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Vastu..."
            />
            <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
