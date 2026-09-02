import { Link } from 'react-router'
import { type ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
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
      <main className="p-4">{children}</main>
    </div>
  )
}