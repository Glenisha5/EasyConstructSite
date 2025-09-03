"use client"

import { useState, useEffect } from "react"
import { X, RotateCcw, Maximize, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

interface ARVRPreviewProps {
  product: {
    id: number
    name: string
    image: string
    category: string
    brand: string
    price: number
  }
  isOpen: boolean
  onClose: () => void
  mode: "ar" | "vr"
}

export default function ARVRPreview({ product, isOpen, onClose, mode }: ARVRPreviewProps) {
  const { language } = useLanguage()
  const [rotation, setRotation] = useState([0])
  const [zoom, setZoom] = useState([50])
  const [lighting, setLighting] = useState("natural")
  const [environment, setEnvironment] = useState("room")
  const [isLoading, setIsLoading] = useState(true)

  const translations = {
    en: {
      arPreview: "AR Preview",
      vrPreview: "VR Preview",
      loading: "Loading 3D Model...",
      controls: "Controls",
      rotation: "Rotation",
      zoom: "Zoom",
      lighting: "Lighting",
      environment: "Environment",
      natural: "Natural",
      studio: "Studio",
      outdoor: "Outdoor",
      room: "Living Room",
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      office: "Office",
      reset: "Reset View",
      fullscreen: "Fullscreen",
      takePhoto: "Take Photo",
      settings: "Settings",
      close: "Close",
      placeInSpace: "Place in Your Space",
      moveAround: "Move around to place the item",
      tapToPlace: "Tap to place",
    },
    hi: {
      arPreview: "AR प्रीव्यू",
      vrPreview: "VR प्रीव्यू",
      loading: "3D मॉडल लोड हो रहा है...",
      controls: "नियंत्रण",
      rotation: "घुमाव",
      zoom: "ज़ूम",
      lighting: "प्रकाश",
      environment: "वातावरण",
      natural: "प्राकृतिक",
      studio: "स्टूडियो",
      outdoor: "बाहरी",
      room: "बैठक कक्ष",
      kitchen: "रसोई",
      bathroom: "बाथरूम",
      office: "कार्यालय",
      reset: "व्यू रीसेट करें",
      fullscreen: "फुलस्क्रीन",
      takePhoto: "फोटो लें",
      settings: "सेटिंग्स",
      close: "बंद करें",
      placeInSpace: "अपनी जगह में रखें",
      moveAround: "आइटम रखने के लिए घूमें",
      tapToPlace: "रखने के लिए टैप करें",
    },
    kn: {
  arPreview: "ಎಆರ್ ಪೂರ್ವಾವಲೋಕನ",
  vrPreview: "ವಿಆರ್ ಪೂರ್ವಾವಲೋಕನ",
  loading: "3D ಮಾದರಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  controls: "ನಿಯಂತ್ರಣಗಳು",
  rotation: "ಭ್ರಮಣೆ",
  zoom: "ಝೂಮ್",
  lighting: "ಬೆಳಕು",
  environment: "ಪರಿಸರ",
  natural: "ಸ್ವಾಭಾವಿಕ",
  studio: "ಸ್ಟುಡಿಯೋ",
  outdoor: "ಹೊರಾಂಗಣ",
  room: "ಕೊಠಡಿ",
  kitchen: "ಅಡುಗೆಮನೆ",
  bathroom: "ಬಾತ್‌ರೂಮ್",
  office: "ಕಚೇರಿ",
  reset: "ವೀಕ್ಷಣೆಯನ್ನು ಮರುಹೊಂದಿಸಿ",
  fullscreen: "ಪೂರ್ಣ ಪರದೆ",
  takePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
  settings: "ಸಂಯೋಜನೆಗಳು",
  close: "ಮುಚ್ಚಿ",
  placeInSpace: "ನಿಮ್ಮ ಜಾಗದಲ್ಲಿ ಇಡಿ",
  moveAround: "ಐಟಂ ಇಡಲು ಸುತ್ತಾಡಿ",
  tapToPlace: "ಇಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
},
}

  const t = translations[language]

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // Simulate loading time
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const Mock3DViewer = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      {/* Mock 3D Environment Background */}
      <div className="absolute inset-0">
        {environment === "room" && (
          <div className="w-full h-full bg-gradient-to-b from-blue-100 to-amber-50 relative">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-100 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-16 h-24 bg-amber-200 opacity-30 rounded"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-16 bg-blue-200 opacity-30 rounded"></div>
          </div>
        )}
        {environment === "kitchen" && (
          <div className="w-full h-full bg-gradient-to-b from-gray-100 to-white relative">
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-200 to-transparent"></div>
            <div className="absolute top-1/4 left-1/6 w-12 h-20 bg-gray-300 opacity-40 rounded"></div>
          </div>
        )}
        {environment === "office" && (
          <div className="w-full h-full bg-gradient-to-b from-blue-50 to-gray-100 relative">
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-300 to-transparent"></div>
          </div>
        )}
      </div>

      {/* Mock 3D Product */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `rotate(${rotation[0]}deg) scale(${zoom[0] / 50})`,
          }}
        >
          <div className="w-48 h-48 relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter:
                  lighting === "studio"
                    ? "brightness(1.2) contrast(1.1)"
                    : lighting === "outdoor"
                      ? "brightness(1.1) saturate(1.2)"
                      : "none",
              }}
            />
            {/* Mock 3D shadow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black opacity-20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>

      {/* AR Mode Overlay */}
      {mode === "ar" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 right-4 text-center">
            <Badge className="bg-green-500 text-white px-3 py-1">AR {t.placeInSpace}</Badge>
          </div>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
            <p className="text-sm mb-2">{t.moveAround}</p>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              {t.tapToPlace}
            </Button>
          </div>
          {/* AR targeting reticle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-white rounded-full opacity-60">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>{t.loading}</p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <Badge className={mode === "ar" ? "bg-green-500" : "bg-blue-500"}>
              {mode === "ar" ? t.arPreview : t.vrPreview}
            </Badge>
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 flex">
          {/* 3D Viewer */}
          <div className="flex-1 p-4">
            <Mock3DViewer />
          </div>

          {/* Controls Panel */}
          <div className="w-80 border-l p-4 space-y-6 overflow-y-auto">
            <div>
              <h4 className="font-semibold mb-3">{t.controls}</h4>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.rotation}</label>
                  <Slider value={rotation} onValueChange={setRotation} max={360} min={0} step={1} className="w-full" />
                  <div className="text-xs text-gray-500 mt-1">{rotation[0]}°</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t.zoom}</label>
                  <Slider value={zoom} onValueChange={setZoom} max={200} min={10} step={5} className="w-full" />
                  <div className="text-xs text-gray-500 mt-1">{zoom[0]}%</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t.lighting}</label>
                  <Select value={lighting} onValueChange={setLighting}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">{t.natural}</SelectItem>
                      <SelectItem value="studio">{t.studio}</SelectItem>
                      <SelectItem value="outdoor">{t.outdoor}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t.environment}</label>
                  <Select value={environment} onValueChange={setEnvironment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="room">{t.room}</SelectItem>
                      <SelectItem value="kitchen">{t.kitchen}</SelectItem>
                      <SelectItem value="bathroom">{t.bathroom}</SelectItem>
                      <SelectItem value="office">{t.office}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => {
                  setRotation([0])
                  setZoom([50])
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t.reset}
              </Button>

              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Maximize className="h-4 w-4 mr-2" />
                {t.fullscreen}
              </Button>

              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                {t.takePhoto}
              </Button>
            </div>

            {/* Product Info */}
            <Card>
              <CardContent className="p-4">
                <h5 className="font-semibold mb-2">{product.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-lg font-bold text-orange-600">₹{product.price.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
