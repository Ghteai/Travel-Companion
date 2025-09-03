interface CostInfo {
  housing: {
    rentOneBedroomCenter: number
    rentOneBedroomOutside: number
    buyPriceCenter: number
    buyPriceOutside: number
  }
  food: {
    mealInexpensive: number
    mealMidRange: number
    groceriesMonthly: number
    coffee: number
  }
  transportation: {
    publicTransportMonthly: number
    taxi1km: number
    gasoline1L: number
  }
}

// Static cost data - in a real app, this could come from Numbeo API or similar
const costDatabase: Record<string, CostInfo> = {
  paris: {
    housing: {
      rentOneBedroomCenter: 1200,
      rentOneBedroomOutside: 900,
      buyPriceCenter: 12000,
      buyPriceOutside: 8000,
    },
    food: {
      mealInexpensive: 15,
      mealMidRange: 35,
      groceriesMonthly: 300,
      coffee: 3.5,
    },
    transportation: {
      publicTransportMonthly: 75,
      taxi1km: 2.1,
      gasoline1L: 1.6,
    },
  },
  london: {
    housing: {
      rentOneBedroomCenter: 1800,
      rentOneBedroomOutside: 1300,
      buyPriceCenter: 15000,
      buyPriceOutside: 10000,
    },
    food: {
      mealInexpensive: 18,
      mealMidRange: 40,
      groceriesMonthly: 350,
      coffee: 4,
    },
    transportation: {
      publicTransportMonthly: 180,
      taxi1km: 2.8,
      gasoline1L: 1.4,
    },
  },
  tokyo: {
    housing: {
      rentOneBedroomCenter: 1000,
      rentOneBedroomOutside: 600,
      buyPriceCenter: 10000,
      buyPriceOutside: 6000,
    },
    food: {
      mealInexpensive: 8,
      mealMidRange: 25,
      groceriesMonthly: 250,
      coffee: 3,
    },
    transportation: {
      publicTransportMonthly: 80,
      taxi1km: 3.5,
      gasoline1L: 1.3,
    },
  },
}

export async function getCostInfo(city: string): Promise<CostInfo | null> {
  try {
    const cityKey = city.toLowerCase()

    if (costDatabase[cityKey]) {
      return costDatabase[cityKey]
    }

    // Return average costs if city not found
    return {
      housing: {
        rentOneBedroomCenter: 1000,
        rentOneBedroomOutside: 700,
        buyPriceCenter: 8000,
        buyPriceOutside: 5500,
      },
      food: {
        mealInexpensive: 12,
        mealMidRange: 30,
        groceriesMonthly: 280,
        coffee: 3.2,
      },
      transportation: {
        publicTransportMonthly: 90,
        taxi1km: 2.5,
        gasoline1L: 1.4,
      },
    }
  } catch (error) {
    console.error("Error fetching cost info:", error)
    return null
  }
}
