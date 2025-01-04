import React from 'react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { CauseSection } from '../components/CauseSection';
import { ImpactStories } from '../components/ImpactStories';
import { CallToAction } from '../components/CallToAction';
import { FAQ } from '../components/FAQ';
import { WhyPeopleSection } from '../components/WhyPeopleSection';

export function Home() {
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
  );
}
