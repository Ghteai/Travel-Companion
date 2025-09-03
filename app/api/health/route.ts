import { NextResponse } from "next/server"

export async function GET() {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        countries: "operational",
        weather: process.env.OPENWEATHER_API_KEY ? "operational" : "mock-data",
        currency: "operational",
        costs: "operational",
        flights: "mock-data",
        images: process.env.UNSPLASH_ACCESS_KEY ? "operational" : "mock-data",
      },
      version: "1.0.0",
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
