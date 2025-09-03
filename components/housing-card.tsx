"use client"

import { Home, TrendingUp } from "lucide-react"
import { InfoCard } from "./info-card"

interface HousingData {
  rent: string
  buy: string
  trend: "up" | "down" | "stable"
}

interface HousingCardProps {
  data: HousingData
}

export function HousingCard({ data }: HousingCardProps) {
  return (
    <InfoCard
      title="Housing Costs"
      icon="🏠"
      content={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Rent</p>
              <p className="text-xl font-bold text-primary">{data.rent}</p>
            </div>
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Purchase</p>
              <p className="text-xl font-bold text-accent">{data.buy}</p>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp
                className={`h-4 w-4 ${
                  data.trend === "up"
                    ? "text-green-500"
                    : data.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }`}
              />
              <span className="text-xs text-muted-foreground capitalize">{data.trend}</span>
            </div>
          </div>
        </div>
      }
    />
  )
}
