import { type Artwork } from '../schemas/artwork'

type ArtworkCardProps = {
  artwork: Artwork
  iiifUrl: string
}

function imageSrc(iiifUrl: string, imageId: string | null): string | null {
  if (!imageId) return null
  const base = iiifUrl.replace(/\/$/, '')
  return `${base}/${imageId}/full/843,/0/default.jpg`
}

export default function ArtworkCard({ artwork, iiifUrl }: ArtworkCardProps) {
  const src = imageSrc(iiifUrl, artwork.image_id)
  const artist = artwork.artist_title ?? 'Unknown artist'

  return (
    <article className="card bg-base-100 shadow">
      <figure className="bg-base-300 aspect-[4/3]">
        {src ? (
          <img
            src={src}
            alt={artwork.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="p-4 text-sm text-base-content/60">No image</span>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{artwork.title}</h2>
        <p>{artist}</p>
      </div>
    </article>
  )
}