import { z } from 'zod/v4'
import { ArtworkSchema, SearchResponseSchema, type Artwork } from '../schemas/artwork'

const SEARCH_URL = 'https://api.artic.edu/api/v1/artworks/search'

export async function getArtworks(query: string): Promise<Artwork[]> {
  const trimmed = query.trim()
  if (trimmed.length < 1) {
    throw new Error('Search query must not be empty')
  }

  const url = `${SEARCH_URL}?q=${encodeURIComponent(trimmed)}&fields=id,title,artist_title,image_id&limit=12`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  const resData: unknown = await response.json()

  const { data, error, success } = SearchResponseSchema.safeParse(resData)
  if (!success) {
    throw new Error(z.prettifyError(error))
  }

  const artworks: Artwork[] = []
  for (const item of data.data) {
    const parsed = ArtworkSchema.safeParse(item)
    if (parsed.success) {
      artworks.push(parsed.data)
    }
  }

  return artworks
}