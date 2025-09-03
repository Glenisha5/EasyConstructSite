"use client"

import { useState, useRef, useEffect } from "react"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { ArrowLeft, Camera, Sofa, Armchair, Lamp } from "lucide-react"

import Image from "next/image"

import Link from "next/link"


// --- Furniture Data (added modelUrl for AR) ---

const arFurnitureData = {

  chairs: {

    displayName: "Chairs",

    icon: <Armchair className="h-10 w-10 text-primary" />,

    products: [

      {

        id: "ac001",

        name: "Modern Shell Chair",

        image: "/images/chair1.jpg",

        modelUrl: "/models/chair1.glb",

      },

      {

        id: "ac002",

        name: "Classic Wooden Chair",

        image: "/images/chair2.jpg",

        modelUrl: "/models/chair2.glb",

      },

    ],

  },

  sofas: {

    displayName: "Sofas",

    icon: <Sofa className="h-10 w-10 text-primary" />,

    products: [

      {

        id: "sf001",

        name: "3-Seater Modern Sofa",

        image: "/images/sofa1.jpg",

        modelUrl: "/models/sofa1.glb",

      },

      {

        id: "sf002",

        name: "Loveseat Couch",

        image: "/images/sofa2.jpg",

        modelUrl: "/models/sofa2.glb",

      },

    ],

  },

  beds: {

    displayName: "Beds",

    icon: <Lamp className="h-10 w-10 text-primary" />,

    products: [

      {

        id: "tb001",

        name: "Double Bed",

        image: "/images/bed.jpg",

        modelUrl: "/models/bed.glb",

      },

    ],

  },

}

type CategoryKey = keyof typeof arFurnitureData

export default function ARViewPage() {

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null)

  const [selectedProduct, setSelectedProduct] = useState<{ name: string, modelUrl: string } | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (selectedProduct) {

      startWebcam();

    } else {

      stopWebcam();

    }

    // Clean up the stream when the component unmounts or state changes

    return () => stopWebcam();

  }, [selectedProduct]);

  const startWebcam = async () => {

    try {

      // Request camera access, preferring the rear-facing camera

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

        videoRef.current.play();

      }

    } catch (error) {

      console.error('Error accessing camera:', error);

      alert('Camera access denied. Please enable camera permissions for this site to use this feature.');

      setSelectedProduct(null); // Go back to the product selection view

    }

  };

  const stopWebcam = () => {

    if (videoRef.current && videoRef.current.srcObject) {

      const stream = videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach(track => track.stop());

    }

  };

  if (selectedProduct) {

    // This view displays the live camera feed

    return (

      <div className="relative w-full h-screen overflow-hidden">

        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline autoPlay />

        <div className="absolute top-4 left-4 z-10">

          <Button onClick={() => setSelectedProduct(null)}>

            <ArrowLeft className="h-4 w-4 mr-2" />

            Back

          </Button>

        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-background/50 backdrop-blur-sm rounded-lg text-center">

          <h2 className="text-xl font-semibold mb-2">{selectedProduct.name}</h2>

          <p className="text-sm">This is where the 3D model would be rendered on top of the camera feed.</p>

        </div>

      </div>

    )

  }

  if (selectedCategory) {

    const category = arFurnitureData[selectedCategory]

    return (

      <div className="container mx-auto px-4 py-8">

        <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="mb-6">

          <ArrowLeft className="h-4 w-4 mr-2" />

          Back to Categories

        </Button>

        <h2 className="text-3xl font-bold mb-8 text-center">{category.displayName}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {category.products.map((product) => (

            <Card key={product.id} className="group overflow-hidden">

              <CardContent className="p-0">

                <div className="relative aspect-square">

                  <Image

                    src={product.image}

                    alt={product.name}

                    fill

                    className="object-cover transition-transform group-hover:scale-105"

                  />

                </div>

                <div className="p-4 border-t flex justify-between items-center">

                  <h3 className="font-semibold">{product.name}</h3>

                  <Button

                    size="icon"

                    variant="outline"

                    onClick={() => setSelectedProduct(product)}

                  >

                    <Camera className="h-5 w-5" />

                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>

    )

  }

  return (

    <div className="container mx-auto px-4 py-12">

      <div className="flex justify-start mb-6">

        <Link href="/">

          <Button variant="ghost">

            <ArrowLeft className="h-4 w-4 mr-2" />

            Back to Home

          </Button>

        </Link>

      </div>

      <div className="text-center mb-12">

        <h1 className="font-playfair font-bold text-4xl mb-4">View in Your Space</h1>

        <p className="text-lg text-muted-foreground">Select a category to see products.</p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

        {(Object.keys(arFurnitureData) as CategoryKey[]).map((key) => {

          const category = arFurnitureData[key]

          return (

            <Card

              key={key}

              onClick={() => setSelectedCategory(key)}

              className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"

            >

              <CardContent className="p-8 flex flex-col items-center justify-center gap-4">

                {category.icon}

                <h3 className="text-2xl font-semibold">{category.displayName}</h3>

              </CardContent>

            </Card>          

          )

        })}

      </div>

    </div>

  )

}