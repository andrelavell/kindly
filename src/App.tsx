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
import { Routes, Route } from 'react-router-dom';
import { Stores } from './pages/Stores';
import { Ambassadors } from './pages/Ambassadors';
import { About } from './pages/About';
import { Press } from './pages/Press';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Banner />
      <Navigation />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <HowItWorks />
            <ImpactStories />
            <CauseSection />
            <WhyPeopleSection />
            <FAQ />
            <CallToAction />
          </>
        } />
        <Route path="/stores" element={<Stores />} />
        <Route path="/ambassadors" element={<Ambassadors />} />
        <Route path="/about" element={<About />} />
        <Route path="/press" element={<Press />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;