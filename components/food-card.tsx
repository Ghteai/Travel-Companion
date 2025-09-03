"use client"

import { UtensilsCrossed, Coffee } from "lucide-react"
import { InfoCard } from "./info-card"

interface FoodData {
  meal: string
  groceries: string
  coffee: string
}

interface FoodCardProps {
  data: FoodData
}

export function FoodCard({ data }: FoodCardProps) {
  return (
    <InfoCard
      title="Food & Dining"
      icon="🍽️"
      content={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Restaurant Meal</p>
              <p className="text-xl font-bold text-primary">{data.meal}</p>
            </div>
            <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Groceries</p>
              <p className="text-lg font-semibold text-accent">{data.groceries}</p>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Coffee</p>
                <p className="text-lg font-semibold">{data.coffee}</p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
