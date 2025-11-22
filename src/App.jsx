import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Team from './pages/Team'
import ScoreBoard from './pages/ScoreBoard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #00d9ff',
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
