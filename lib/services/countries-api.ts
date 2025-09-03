interface CountryInfo {
  name: string
  capital: string
  population: number
  languages: string[]
  flag: string
  currency: {
    code: string
    name: string
    symbol: string
  }
  region: string
  subregion: string
}

export async function getCountryInfo(countryName: string): Promise<CountryInfo | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=false`,
    )

    if (!response.ok) {
      throw new Error(`Countries API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      return null
    }

    const country = data[0]
    const currencies = Object.values(country.currencies || {})
    const currency = currencies[0] as any

    return {
      name: country.name.common,
      capital: country.capital?.[0] || "N/A",
      population: country.population || 0,
      languages: Object.values(country.languages || {}),
      flag: country.flags.svg,
      currency: {
        code: Object.keys(country.currencies || {})[0] || "USD",
        name: currency?.name || "Unknown",
        symbol: currency?.symbol || "$",
      },
      region: country.region,
      subregion: country.subregion || "",
    }
  } catch (error) {
    console.error("Error fetching country info:", error)
    return null
  }
}
