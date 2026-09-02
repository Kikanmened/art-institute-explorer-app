import { useState } from 'react'
import { type Artwork } from '../schemas/artwork'

type ArtworkCardProps = {
  artwork: Artwork
  iiifUrl: string
  onAdd?: () => void
  isSaved?: boolean
  note?: string
  onSaveNote?: (note: string) => void
  onDelete?: () => void
}

function imageSrc(iiifUrl: string, imageId: string | null): string | null {
  if (!imageId) return null
  const base = iiifUrl.replace(/\/$/, '')
  const remote = `${base}/${imageId}/full/843,/0/default.jpg`
  try {
    return new URL(remote).pathname
  } catch {
    return remote
  }
}

export default function ArtworkCard({
  artwork,
  iiifUrl,
  onAdd,
  isSaved,
  note,
  onSaveNote,
  onDelete,
}: ArtworkCardProps) {
  const initialSrc = imageSrc(iiifUrl, artwork.image_id)
  const artist = artwork.artist_title ?? 'Unknown artist'
  const [draft, setDraft] = useState(note ?? '')
  const [noteError, setNoteError] = useState<string | null>(null)
  const [imgFailed, setImgFailed] = useState(false)
  const src = imgFailed ? null : initialSrc

  return (
    <article className="card bg-base-100 shadow">
      <div className="bg-base-300 aspect-[4/3] w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={artwork.title}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-sm text-base-content/60">
            No image
          </div>
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">{artwork.title}</h2>
        <p>{artist}</p>
        {onAdd && (
          <div className="card-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAdd}
              disabled={isSaved}
            >
              {isSaved ? 'In gallery' : 'Add to Gallery'}
            </button>
          </div>
        )}
        {onSaveNote && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Note</span>
            <textarea
              className={`textarea textarea-bordered w-full ${noteError ? 'textarea-error' : ''}`}
              maxLength={280}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                setNoteError(null)
              }}
            />
            {noteError && (
              <p className="text-error text-sm">{noteError}</p>
            )}
            <button
              type="button"
              className="btn btn-sm self-start"
              onClick={() => {
                try {
                  onSaveNote(draft)
                  setNoteError(null)
                } catch (error: unknown) {
                  if (error instanceof Error) {
                    setNoteError(error.message)
                  } else {
                    setNoteError('Something went wrong')
                  }
                }
              }}
            >
              Save note
            </button>
          </div>
        )}
        {onDelete && (
          <button
            type="button"
            className="btn btn-error btn-sm"
            onClick={onDelete}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  )
}
