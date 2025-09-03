interface CurrencyInfo {
  baseCurrency: string
  targetCurrency: string
  exchangeRate: number
  lastUpdated: string
}

export async function getCurrencyInfo(baseCurrency: string, targetCurrency = "USD"): Promise<CurrencyInfo | null> {
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${targetCurrency}`)

    if (!response.ok) {
      throw new Error(`Currency API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error("Currency API returned error")
    }

    return {
      baseCurrency,
      targetCurrency,
      exchangeRate: data.rates[targetCurrency] || 1,
      lastUpdated: data.date,
    }
  } catch (error) {
    console.error("Error fetching currency info:", error)
    return {
      baseCurrency,
      targetCurrency,
      exchangeRate: 1,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
  }
}
