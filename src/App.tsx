import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import HomePage from '@/app/home/HomePage'

// Vite replaces import.meta.env.DEV with `false` in production builds.
// The lazy import becomes dead code → fully tree-shaken, zero bytes in prod bundle.
const DevBar = import.meta.env.DEV
  ? lazy(() => import('@/components/devMode/DevBar'))
  : null

function App() {
  return (
    <BrowserRouter>
      <div className="noise-overlay scanline">
        <Navbar />
        {DevBar && (
          <Suspense fallback={null}>
            <DevBar />
          </Suspense>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
