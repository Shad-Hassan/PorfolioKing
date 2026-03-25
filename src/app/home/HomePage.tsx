import ModelBackground from '@/components/animations/ModelBackground'
import GridSkeleton from './GridSkeleton'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ExperienceSection from './ExperienceSection'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'
import { useAppSelector } from '@/hooks/reduxHooks'

export default function HomePage() {
  const skeletonMode = useAppSelector(s => s.dev.skeletonMode)

  return (
    <>
      <ModelBackground />
      <main style={{ position: 'relative', zIndex: 10 }}>
        {skeletonMode ? (
          <GridSkeleton />
        ) : (
          <>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </>
        )}
      </main>
    </>
  )
}
