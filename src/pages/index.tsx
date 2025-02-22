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
import { useRef, useState, useEffect } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default function Home() {
  const roughRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsInView(entry.isIntersecting);
    }, { threshold: 1.0 });
    if (roughRef.current) {
      observer.observe(roughRef.current);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Kindly - Turn Shopping into Acts of Kindness</title>
        <meta name="description" content="Shop at your favorite stores and support causes you care about, at no extra cost." />
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

      <main>
        <Hero />
        <HowItWorks />
        <ImpactStories />
        <CauseSection />
        <WhyPeopleSection />
        
        {/* Community Impact Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
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
      <script type="text/javascript" src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=c5ac2f8bc09473db332245a828036c1827eb0767"></script>
      <script type="text/javascript" src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=c5ac2f8bc09473db332245a828036c1827eb0767"></script>
    </>
  )
}
