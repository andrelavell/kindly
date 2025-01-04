import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ImpactStories } from '../components/ImpactStories'
import { CauseSection } from '../components/CauseSection'
import { WhyPeopleSection } from '../components/WhyPeopleSection'
import { FAQ } from '../components/FAQ'
import { CallToAction } from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ImpactStories />
      <CauseSection />
      <WhyPeopleSection />
      <FAQ />
      <CallToAction />
    </>
  )
}
