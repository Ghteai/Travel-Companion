"use client"

import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react"
import { InfoCard } from "./info-card"

interface WeatherData {
  current: {
    temp: string
    condition: string
    humidity: string
  }
  forecast: Array<{
    day: string
    temp: string
    condition: string
  }>
}

interface WeatherPanelProps {
  data: WeatherData
}

export function WeatherPanel({ data }: WeatherPanelProps) {
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("rain")) return <CloudRain className="h-6 w-6" />
    if (condition.toLowerCase().includes("cloud")) return <Cloud className="h-6 w-6" />
    return <Sun className="h-6 w-6" />
  }

  return (
    <InfoCard
      title="Weather"
      icon="🌤️"
      className="md:col-span-2"
      content={
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="text-3xl font-bold text-primary">{data.current.temp}</p>
              <p className="text-sm text-muted-foreground">{data.current.condition}</p>
            </div>
            <div className="text-center">
              {getWeatherIcon(data.current.condition)}
              <div className="flex items-center gap-1 mt-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{data.current.humidity}</span>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="grid grid-cols-3 gap-2">
            {data.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-muted/20">
                <p className="text-xs text-muted-foreground">{day.day}</p>
                <div className="my-1 flex justify-center text-muted-foreground">{getWeatherIcon(day.condition)}</div>
                <p className="text-sm font-semibold">{day.temp}</p>
              </div>
            ))}
          </div>
        </div>
      }
    />
  )
}
