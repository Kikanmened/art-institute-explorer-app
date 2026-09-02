import { useOutletContext } from 'react-router'
import { type GalleryContext } from '../App'
import ArtworkCard from '../components/ArtworkCard'

export default function GalleryPage() {
  const { gallery, updateArtworkNote, removeArtwork } =
    useOutletContext<GalleryContext>()

  if (gallery.length === 0) {
    return <p>Your gallery is empty. Search and add an artwork.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <ArtworkCard
          key={item.id}
          artwork={item}
          iiifUrl={item.iiifUrl}
          note={item.note}
          onSaveNote={(nextNote) => updateArtworkNote(item.id, nextNote)}
          onDelete={() => removeArtwork(item.id)}
        />
      ))}
    </div>
  )
}
