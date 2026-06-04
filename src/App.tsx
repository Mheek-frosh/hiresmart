import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import AboutPage from '@/pages/AboutPage'
import BlogPage from '@/pages/BlogPage'
import CareersPage from '@/pages/CareersPage'
import DocumentationPage from '@/pages/DocumentationPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import SecurityPage from '@/pages/SecurityPage'
import CookiesPage from '@/pages/CookiesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
