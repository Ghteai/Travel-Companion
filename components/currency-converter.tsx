"use client"

import { DollarSign, TrendingUp } from "lucide-react"
import { InfoCard } from "./info-card"

interface CurrencyData {
  local: string
  rate: string
  symbol: string
}

interface CurrencyConverterProps {
  data: CurrencyData
}

export function CurrencyConverter({ data }: CurrencyConverterProps) {
  return (
    <InfoCard
      title="Currency"
      icon="💱"
      content={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Local Currency</p>
              <p className="text-xl font-bold text-primary">{data.local}</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div>
              <p className="text-sm text-muted-foreground">Exchange Rate</p>
              <p className="text-lg font-semibold">
                1 USD = {data.rate} {data.symbol}
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
        </div>
      }
    />
  )
}
