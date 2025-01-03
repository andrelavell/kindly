import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { CauseSection } from './components/CauseSection';
import { ImpactStories } from './components/ImpactStories';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';
import { FAQ } from './components/FAQ';
import { WhyPeopleSection } from './components/WhyPeopleSection';

function App() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Navigation />
      <Hero />
      <HowItWorks />
      <ImpactStories />
      <CauseSection />
      <WhyPeopleSection />
      <FAQ />
      <CallToAction /> 
    
      <Footer />
    </div>
  );
}

export default App;