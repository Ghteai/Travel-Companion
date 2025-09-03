"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ImageGalleryProps {
  images: string[]
  location: string
}

export function ImageGallery({ images, location }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getLocationImages = (location: string, index: number) => {
    const locationKey = location.toLowerCase()
    const imageQueries = {
      tokyo: [
        "Tokyo Shibuya crossing with neon lights",
        "Tokyo cherry blossoms in Ueno Park",
        "Tokyo traditional temple with modern skyline",
        "Tokyo street food market scene",
        "Tokyo Mount Fuji view from city",
        "Tokyo traditional Japanese garden",
      ],
      paris: [
        "Paris Eiffel Tower romantic evening",
        "Paris Louvre Museum and pyramid",
        "Paris Seine River with bridges",
        "Paris Montmartre and Sacré-Cœur",
        "Paris café culture and bistros",
        "Paris Champs-Élysées shopping street",
      ],
      "new york": [
        "New York Times Square bright lights",
        "New York Central Park autumn colors",
        "New York Brooklyn Bridge sunset",
        "New York Statue of Liberty harbor",
        "New York Manhattan street canyon",
        "New York High Line urban park",
      ],
      london: [
        "London Tower Bridge and Thames",
        "London Big Ben and Parliament",
        "London Buckingham Palace guards",
        "London Camden Market street art",
        "London Hyde Park and Speaker's Corner",
        "London red telephone boxes",
      ],
      bali: [
        "Bali rice terraces green landscape",
        "Bali traditional temple ceremony",
        "Bali tropical beach sunset",
        "Bali monkey forest sanctuary",
        "Bali traditional market colorful",
        "Bali volcano and lake view",
      ],
    }

    const queries = imageQueries[locationKey] || [
      `${location} famous landmarks`,
      `${location} local culture and people`,
      `${location} traditional architecture`,
      `${location} natural landscapes`,
      `${location} street scenes`,
      `${location} tourist attractions`,
    ]

    const query = queries[index % queries.length]
    return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(query)}`
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(images.length, 6))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(images.length, 6)) % Math.max(images.length, 6))
  }

  const displayImages = images.length > 0 ? images : Array.from({ length: 6 }, (_, i) => getLocationImages(location, i))

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Explore {location}
        </h2>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Expand className="h-4 w-4" />
          View All
        </Button>
      </div>

      {/* Main Image Carousel */}
      <div className="relative mb-4">
        <div className="aspect-video rounded-xl overflow-hidden bg-muted">
          <img
            src={displayImages[currentIndex] || "/placeholder.svg"}
            alt={`${location} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex ? "ring-2 ring-primary shadow-lg" : "hover:ring-2 hover:ring-accent/50"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${location} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </Card>
  )
}
