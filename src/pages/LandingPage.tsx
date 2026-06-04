import Navigation from '@/sections/Navigation'
import HeroSection from '@/sections/HeroSection'
import TrustedBySection from '@/sections/TrustedBySection'
import FeaturesSection from '@/sections/FeaturesSection'
import HowItWorksSection from '@/sections/HowItWorksSection'
import DashboardPreviewSection from '@/sections/DashboardPreviewSection'
import TestimonialsSection from '@/sections/TestimonialsSection'
import PricingSection from '@/sections/PricingSection'
import CTABannerSection from '@/sections/CTABannerSection'
import Footer from '@/sections/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <CTABannerSection />
      <Footer />
    </div>
  )
}
