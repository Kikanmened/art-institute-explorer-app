import { z } from 'zod/v4'
import {
  GallerySchema,
  type Artwork,
  type GalleryItem,
} from '../schemas/artwork'

const STORAGE_KEY = 'aic-gallery'

export function loadGallery(): GalleryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    return []
  }

  const { data, success } = GallerySchema.safeParse(parsedJson)
  if (!success) return []
  return data
}

export function saveGallery(items: GalleryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addToGallery(
  items: GalleryItem[],
  artwork: Artwork,
  iiifUrl: string,
): GalleryItem[] {
  if (items.some((item) => item.id === artwork.id)) return items

  const next: GalleryItem[] = [...items, { ...artwork, iiifUrl }]
  saveGallery(next)
  return next
}