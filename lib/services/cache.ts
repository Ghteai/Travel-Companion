interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, expiresInMs = 300000): void {
    // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: expiresInMs,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    if (Date.now() - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }
}

export const cache = new MemoryCache()

export function getCacheKey(prefix: string, ...params: string[]): string {
  return `${prefix}:${params.join(":")}`.toLowerCase()
}
