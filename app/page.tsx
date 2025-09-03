"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { HeroBanner } from "@/components/hero-banner"
import { InfoCard } from "@/components/info-card"
import { ImageGallery } from "@/components/image-gallery"
import { WeatherPanel } from "@/components/weather-panel"
import { CurrencyConverter } from "@/components/currency-converter"
import { FlightsCard } from "@/components/flights-card"
import { HousingCard } from "@/components/housing-card"
import { FoodCard } from "@/components/food-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mockData } from "@/lib/mock-data"

export default function TravelDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("Tokyo, Japan")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedLocation(query || "Tokyo, Japan")
  }

  const locationData = mockData[selectedLocation] || mockData["Tokyo, Japan"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">TC</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Travel Companion
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <HeroBanner location={selectedLocation} />

      {/* Search Bar */}
      <div className="relative -mt-16 z-40 px-4 md:px-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-8 space-y-8">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HousingCard data={locationData.housing} />
          <FoodCard data={locationData.food} />
          <FlightsCard data={locationData.flights} />
          <WeatherPanel data={locationData.weather} />
          <CurrencyConverter data={locationData.currency} />
          <InfoCard
            title="Local Tips"
            icon="💡"
            content={
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Best time to visit:</p>
                <p className="font-medium">{locationData.tips.bestTime}</p>
                <p className="text-sm text-muted-foreground mt-3">Language:</p>
                <p className="font-medium">{locationData.tips.language}</p>
              </div>
            }
          />
        </div>

        {/* Image Gallery */}
        <ImageGallery images={locationData.images} location={selectedLocation} />
      </main>
    </div>
  )
}
