import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import GalleryPage from './pages/GalleryPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
