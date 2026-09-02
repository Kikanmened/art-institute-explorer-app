import { z } from 'zod/v4'

export const ArtworkSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).default('Untitled'),
  artist_title: z.string().nullable().default('Unknown artist'),
  image_id: z.string().nullable().default(null),
})

export type Artwork = z.infer<typeof ArtworkSchema>

export const NoteSchema = z.string().trim().max(280).default('')

export const SearchResponseSchema = z.object({
  data: z.array(z.unknown()),
  config: z.object({
    iiif_url: z.url(),
  }),
})

export const GalleryItemSchema = ArtworkSchema.extend({
  iiifUrl: z.string().min(1),
  note: NoteSchema,
})

export const GallerySchema = z.array(GalleryItemSchema)

export type GalleryItem = z.infer<typeof GalleryItemSchema>
