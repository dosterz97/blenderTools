import { AppContextState } from '../state/AppContext'

const KEY = '__storage'

type Cache = {
  context: AppContextState
}

function createDefaultCache(): Cache {
  return {
    context: {
      example: false
    }
  }
}

export function getCache() {
  const localStorageEntry = localStorage.getItem(KEY)

  if (localStorageEntry === null) return createDefaultCache()

  try {
    return JSON.parse(localStorageEntry) as Cache
  } catch (e) {
    console.warn('Failed to parse cache')
    return createDefaultCache()
  }
}

export function setCache(cache: Cache) {
  const value = JSON.stringify(cache)
  localStorage.setItem(KEY, value)
}

export function updateCache(mutate: (cache: Cache) => void) {
  const cache = getCache()
  mutate(cache)
  setCache(cache)
}
