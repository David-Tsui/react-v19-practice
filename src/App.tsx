import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import EventPage from './pages/EventPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events/:eventId" element={<EventPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
