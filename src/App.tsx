import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import {
  addToGallery,
  loadGallery,
  removeFromGallery,
  updateNote,
} from './gallery/storage'
import GalleryPage from './pages/GalleryPage'
import SearchPage from './pages/SearchPage'
import { type Artwork, type GalleryItem } from './schemas/artwork'

export type GalleryContext = {
  gallery: GalleryItem[]
  addArtwork: (artwork: Artwork, iiifUrl: string) => void
  updateArtworkNote: (id: number, note: string) => void
  removeArtwork: (id: number) => void
}

function AppLayout() {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadGallery())

  function addArtwork(artwork: Artwork, iiifUrl: string) {
    setGallery((current) => addToGallery(current, artwork, iiifUrl))
  }

  function updateArtworkNote(id: number, note: string) {
    setGallery(updateNote(gallery, id, note))
  }

  function removeArtwork(id: number) {
    setGallery(removeFromGallery(gallery, id))
  }

  return (
    <Layout>
      <Outlet
        context={
          {
            gallery,
            addArtwork,
            updateArtworkNote,
            removeArtwork,
          } satisfies GalleryContext
        }
      />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}