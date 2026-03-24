import ModelBackground from '@/components/animations/ModelBackground'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ExperienceSection from './ExperienceSection'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'

export default function HomePage() {
  return (
    <>
      {/* Persistent cinematic model — fixed, full viewport */}
      <ModelBackground />

      {/* All sections sit above the model */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
