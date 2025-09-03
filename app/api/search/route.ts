import { type NextRequest, NextResponse } from "next/server"
import { getCountryInfo } from "@/lib/services/countries-api"
import { getWeatherInfo } from "@/lib/services/weather-api"
import { getCurrencyInfo } from "@/lib/services/currency-api"
import { getCostInfo } from "@/lib/services/costs-api"
import { getFlightInfo } from "@/lib/services/flights-api"
import { getLocationImages } from "@/lib/services/images-api"
import { cache, getCacheKey } from "@/lib/services/cache"

interface TravelData {
  country: any
  weather: any
  currency: any
  costs: any
  flights: any
  images: any
  searchQuery: string
  timestamp: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const userCurrency = searchParams.get("currency") || "USD"
    const origin = searchParams.get("origin") || "New York"

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 })
    }

    // Check cache first
    const cacheKey = getCacheKey("travel-search", query, userCurrency, origin)
    const cachedData = cache.get<TravelData>(cacheKey)

    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
      })
    }

    // Fetch data from all APIs in parallel
    const [countryInfo, weatherInfo, currencyInfo, costInfo, flightInfo, imageInfo] = await Promise.allSettled([
      getCountryInfo(query),
      getWeatherInfo(query),
      getCurrencyInfo("USD", userCurrency), // Assuming base currency is USD
      getCostInfo(query),
      getFlightInfo(query, origin),
      getLocationImages(query, 8),
    ])

    // Process results and handle errors gracefully
    const travelData: TravelData = {
      country: countryInfo.status === "fulfilled" ? countryInfo.value : null,
      weather: weatherInfo.status === "fulfilled" ? weatherInfo.value : null,
      currency: currencyInfo.status === "fulfilled" ? currencyInfo.value : null,
      costs: costInfo.status === "fulfilled" ? costInfo.value : null,
      flights: flightInfo.status === "fulfilled" ? flightInfo.value : null,
      images: imageInfo.status === "fulfilled" ? imageInfo.value : null,
      searchQuery: query,
      timestamp: new Date().toISOString(),
    }

    // Cache the result for 5 minutes
    cache.set(cacheKey, travelData, 300000)

    // Check if we got any data
    const hasData = Object.values(travelData).some(
      (value) => value !== null && value !== undefined && value !== query && value !== travelData.timestamp,
    )

    if (!hasData) {
      return NextResponse.json(
        {
          error: "No data found for the specified location",
          searchQuery: query,
          suggestions: ["Try searching for a major city or country name", "Check spelling and try again"],
        },
        { status: 404 },
      )
    }

    return NextResponse.json(travelData)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error occurred while fetching travel data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
