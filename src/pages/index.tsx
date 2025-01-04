import Head from 'next/head';
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ImpactStories } from '../components/ImpactStories'
import { CauseSection } from '../components/CauseSection'
import { WhyPeopleSection } from '../components/WhyPeopleSection'
import { FAQ } from '../components/FAQ'
import { CallToAction } from '../components/CallToAction'
import { CommunitySpotlight } from '../components/CommunitySpotlight'
import { CommunityImpact } from '../components/CommunityImpact'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, // will be passed to the page component as props
    revalidate: 60 // regenerate page every 60 seconds if needed
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Kindly - Shop & Support Causes You Care About</title>
        <meta name="description" content="Transform your everyday shopping into meaningful support for causes you care about. Join Kindly and make every purchase count." />
        <meta property="og:title" content="Kindly - Shop & Support Causes You Care About" />
        <meta property="og:description" content="Transform your everyday shopping into meaningful support for causes you care about. Join Kindly and make every purchase count." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kindly.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://kindly.com" />
      </Head>

      {/* Pre-launch Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex-1 text-center">
              <p className="text-sm sm:text-base font-medium">
                <span className="font-semibold">🚀 Coming Soon!</span>
                {" "}
                This is a preview of Kindly. All statistics and impact data shown are simulated examples of how our platform will work after launch.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main>
        <Hero />
        <HowItWorks />
        <ImpactStories />
        <CauseSection />
        <WhyPeopleSection />
        
        {/* Community Impact Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Making a Difference Together
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Every purchase creates positive change. See how our community is transforming lives, one donation at a time.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CommunityImpact />
              <CommunitySpotlight />
            </div>
          </div>
        </section>

        <FAQ />
        <CallToAction />
      </main>
    </>
  )
}
