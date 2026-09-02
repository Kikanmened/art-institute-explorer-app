import { Link, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="min-h-screen bg-base-200">
      <header>
        <nav className="navbar bg-base-100">
          <Link to="/" className="btn btn-ghost">
            Search
          </Link>
          <Link to="/gallery" className="btn btn-ghost">
            Gallery
          </Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
