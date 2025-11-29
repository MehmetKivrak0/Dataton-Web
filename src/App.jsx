import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Team from './pages/Team'
import TeamDetail from './pages/TeamDetail'
import ScoreBoard from './pages/ScoreBoard'
import Challenges from './pages/Challenges'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import TeamSetup from './pages/Auth/TeamSetup'

function AppContent() {
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/auth')
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:teamName" element={<TeamDetail />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/team-setup" element={<TeamSetup />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #DC143C',
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
