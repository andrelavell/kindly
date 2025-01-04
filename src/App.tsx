import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Stores } from './pages/Stores';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Banner />
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;