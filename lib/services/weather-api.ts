interface WeatherInfo {
  current: {
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
  }
  forecast: Array<{
    date: string
    temperature: {
      min: number
      max: number
    }
    description: string
    icon: string
  }>
}

export async function getWeatherInfo(city: string): Promise<WeatherInfo | null> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY

    if (!apiKey) {
      console.warn("OpenWeather API key not configured, returning mock data")
      return getMockWeatherData(city)
    }

    // Get current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
    )

    if (!currentResponse.ok) {
      throw new Error(`Weather API error: ${currentResponse.status}`)
    }

    const currentData = await currentResponse.json()

    // Get forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
    )

    const forecastData = forecastResponse.ok ? await forecastResponse.json() : null

    return {
      current: {
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        icon: currentData.weather[0].icon,
      },
      forecast:
        forecastData?.list?.slice(0, 5).map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temperature: {
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
          },
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        })) || [],
    }
  } catch (error) {
    console.error("Error fetching weather info:", error)
    return getMockWeatherData(city)
  }
}

function getMockWeatherData(city: string): WeatherInfo {
  return {
    current: {
      temperature: 22,
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 3.2,
      icon: "02d",
    },
    forecast: [
      {
        date: new Date().toLocaleDateString(),
        temperature: { min: 18, max: 25 },
        description: "sunny",
        icon: "01d",
      },
      {
        date: new Date(Date.now() + 86400000).toLocaleDateString(),
        temperature: { min: 20, max: 27 },
        description: "partly cloudy",
        icon: "02d",
      },
    ],
  }
}
