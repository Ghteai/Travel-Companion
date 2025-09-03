"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const popularDestinations = ["Tokyo, Japan", "Paris, France", "New York, USA", "London, UK", "Bali, Indonesia"]

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for a city or country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-24 h-14 text-lg bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Popular Destinations */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-muted-foreground mr-2 leading-8">Popular:</span>
        {popularDestinations.map((destination) => (
          <Button
            key={destination}
            variant="outline"
            size="sm"
            onClick={() => onSearch(destination)}
            className="text-xs rounded-full border-border/50 hover:bg-accent/20 hover:border-accent transition-all duration-300"
          >
            <MapPin className="h-3 w-3 mr-1" />
            {destination}
          </Button>
        ))}
      </div>
    </div>
  )
}
