interface ApiResponse<T> {
  data?: T
  error?: string
  cached?: boolean
}

class TravelApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async searchLocation(
    query: string,
    options: {
      currency?: string
      origin?: string
    } = {},
  ): Promise<ApiResponse<any>> {
    try {
      const params = new URLSearchParams({
        q: query,
        ...(options.currency && { currency: options.currency }),
        ...(options.origin && { origin: options.origin }),
      })

      const response = await fetch(`${this.baseUrl}/search?${params}`)
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "Failed to fetch travel data" }
      }

      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error occurred",
      }
    }
  }

  async getHealthStatus(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/health`)
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "Health check failed" }
      }

      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Health check failed",
      }
    }
  }
}

export const travelApi = new TravelApiClient()
