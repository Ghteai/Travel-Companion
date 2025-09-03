interface ImageInfo {
  id: string
  url: string
  thumbnailUrl: string
  description: string
  photographer: string
  photographerUrl: string
}

export async function getLocationImages(location: string, count = 6): Promise<ImageInfo[] | null> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    if (!accessKey) {
      console.warn("Unsplash API key not configured, returning mock images")
      return getMockImages(location, count)
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(location)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()

    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbnailUrl: photo.urls.small,
      description: photo.alt_description || `Photo of ${location}`,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    }))
  } catch (error) {
    console.error("Error fetching images:", error)
    return getMockImages(location, count)
  }
}

function getMockImages(location: string, count: number): ImageInfo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}`,
    url: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${location} travel destination photo ${i + 1}`)}`,
    thumbnailUrl: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(`${location} travel thumbnail ${i + 1}`)}`,
    description: `Beautiful view of ${location}`,
    photographer: "Travel Photographer",
    photographerUrl: "#",
  }))
}
