import { useState } from 'react'
import { getArtworks } from '../api/getArtworks'
import ArtworkCard from '../components/ArtworkCard'
import { type Artwork } from '../schemas/artwork'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(false)
  const [iiifUrl, setIiifUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const results = await getArtworks(query)
      setArtworks(results.artworks)
      setIiifUrl(results.iiifUrl)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'search-error' : undefined}
        className={`input ${error ? 'input-error' : ''}`}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setError(null)
        }}
      />
      <button type="submit" className="btn" disabled={loading}>
        Search
      </button>
      {loading && <p>Loading…</p>}
      {error && (
        <p id="search-error" className="text-error text-sm">
          {error}
        </p>
      )}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {artworks.map((artwork) => (
      <ArtworkCard
        key={artwork.id}
        artwork={artwork}
        iiifUrl={iiifUrl}
      />
    ))}
  </div>
    </form>
  )
}