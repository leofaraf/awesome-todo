import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import Footer from './components/footer'
import { AuthProvider, Protected } from '@/components/auth-provider.tsx'
import Dashboard from '@/pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Protected element={<Dashboard />} />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
