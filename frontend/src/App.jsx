import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const OurProducts = lazy(() => import('./pages/OurProducts'));
const OurCompany = lazy(() => import('./pages/OurCompany'));
const OurPeople = lazy(() => import('./pages/OurPeople'));
const Contacts = lazy(() => import('./pages/Contacts'));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f2c09]">
      <ScrollToTopOnNavigate />
      <Header />
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[65vh] flex items-center justify-center bg-[#0f2c09]">
              <div className="w-10 h-10 rounded-full border-3 border-[#66E347] border-t-transparent animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<OurProducts />} />
            <Route path="/company" element={<OurCompany />} />
            <Route path="/our-people" element={<OurPeople />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
