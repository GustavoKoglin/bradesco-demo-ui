import localContent from '../data/homeData.json'

const API_URL = import.meta.env.VITE_CONTENT_API_URL

export async function getHomeContent(signal) {
  if (!API_URL) {
    return localContent
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const payload = await response.json()

    if (payload && typeof payload === 'object') {
      if (payload.home && typeof payload.home === 'object') {
        return payload.home
      }

      return payload
    }

    throw new Error('Invalid API payload')
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    return localContent
  }
}
