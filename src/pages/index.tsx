import Head from 'next/head';
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
      <Head>
        <title>Kindly - Shop & Support Causes You Care About</title>
        <meta name="description" content="Transform your everyday shopping into meaningful support for causes you care about. Join Kindly and make every purchase count." />
        <meta property="og:title" content="Kindly - Shop & Support Causes You Care About" />
        <meta property="og:description" content="Transform your everyday shopping into meaningful support for causes you care about. Join Kindly and make every purchase count." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://kindly.com" />
      </Head>
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
