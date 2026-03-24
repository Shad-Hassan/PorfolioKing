import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import HomePage from '@/app/home/HomePage'

function App() {
  return (
    <BrowserRouter>
      {/* Noise overlay + scanline via CSS classes */}
      <div className="noise-overlay scanline">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
