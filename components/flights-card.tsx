"use client"

import { Plane, Calendar } from "lucide-react"
import { InfoCard } from "./info-card"

interface FlightData {
  price: string
  duration: string
  airline: string
}

interface FlightsCardProps {
  data: FlightData
}

export function FlightsCard({ data }: FlightsCardProps) {
  return (
    <InfoCard
      title="Flight Information"
      icon="✈️"
      content={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Best Price</p>
              <p className="text-2xl font-bold text-primary">{data.price}</p>
            </div>
            <Plane className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{data.duration}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Airline</p>
              <p className="font-semibold text-accent">{data.airline}</p>
            </div>
          </div>
        </div>
      }
    />
  )
}
