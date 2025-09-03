"use client"

interface HeroBannerProps {
  location: string
}

export function HeroBanner({ location }: HeroBannerProps) {
  const getLocationImage = (location: string) => {
    const locationKey = location.toLowerCase()
    if (locationKey.includes("tokyo")) return "/tokyo-skyline-with-mount-fuji-at-sunset.jpg"
    if (locationKey.includes("paris")) return "/eiffel-tower-and-paris-cityscape-at-golden-hour.jpg"
    if (locationKey.includes("new york")) return "/new-york-city-manhattan-skyline-with-central-park.png"
    if (locationKey.includes("london")) return "/london-big-ben-and-thames-river-with-red-buses.jpg"
    if (locationKey.includes("bali")) return "/bali-rice-terraces-and-tropical-landscape.png"
    if (locationKey.includes("rome")) return "/roman-colosseum-and-ancient-architecture.jpg"
    if (locationKey.includes("dubai")) return "/dubai-burj-khalifa-and-modern-skyline.jpg"
    if (locationKey.includes("sydney")) return "/sydney-opera-house-bridge.png"
    return "/beautiful-travel-destination-with-mountains-and-ci.jpg"
  }

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getLocationImage(location)})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance drop-shadow-lg">
            Discover{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{location}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty drop-shadow-md">
            Your comprehensive travel companion for exploring destinations, costs, and experiences
          </p>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-pulse" />
      <div className="absolute top-32 right-16 w-1 h-1 bg-primary rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-700" />
    </div>
  )
}
