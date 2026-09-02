import { z } from 'zod/v4'
import {
  GallerySchema,
  NoteSchema,
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

  const next: GalleryItem[] = [...items, { ...artwork, iiifUrl, note: '' }]
  saveGallery(next)
  return next
}

export function updateNote(
  items: GalleryItem[],
  id: number,
  note: string,
): GalleryItem[] {
  const { data, error, success } = NoteSchema.safeParse(note)
  if (!success) {
    throw new Error(z.prettifyError(error))
  }

  const next = items.map((item) =>
    item.id === id ? { ...item, note: data } : item,
  )
  saveGallery(next)
  return next
}

export function removeFromGallery(
  items: GalleryItem[],
  id: number,
): GalleryItem[] {
  const next = items.filter((item) => item.id !== id)
  saveGallery(next)
  return next
}
