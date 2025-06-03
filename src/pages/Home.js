import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Slider from '../components/home-components/Slider';
import FeaturesSlider from '../components/home-components/ThreeTornImages';
import BlueSection from '../components/home-components/BlueSection';
import ThreeCardsSection from '../components/home-components/ThreeCardsSection';
import ImpactStatsSection from '../components/home-components/ImpactStatesSection';
import JoinCommunitySection from '../components/home-components/JoinCommunitySection';
import Footer from '../components/Footer';
import ContactUs from '../components/home-components/ContactUs';
import AboutUs from '../components/home-components/AboutUs';
import GoToTop from '../components/GotToTop';
import AlenalkiSlider from '../components/home-components/AlenalkiHeritageSlider';

const HomePage = () => {
  const [showAboutUsCards, setShowAboutUsCards] = useState(false);
  const aboutSectionRef = useRef(null);

  // Function to handle About Us button click
  const handleAboutUsClick = () => {
    setShowAboutUsCards(true);
  };

  // Function to check if About Us section is in viewport
  const isAboutSectionInViewport = () => {
    if (!aboutSectionRef.current) return false;
    
    const rect = aboutSectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if any part of the About Us section is visible
    // We use a threshold to be more forgiving (section is considered visible if at least 20% is showing)
    const threshold = rect.height * 0.2;
    
    return (
      rect.bottom >= threshold && 
      rect.top <= (windowHeight - threshold)
    );
  };

  // Handle viewport detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Only hide cards if they are showing AND the About Us section is not in viewport
          if (showAboutUsCards && !isAboutSectionInViewport()) {
            setShowAboutUsCards(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener only if cards are visible
    if (showAboutUsCards) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Also listen to resize events in case window size changes
      window.addEventListener('resize', handleScroll, { passive: true });
    }

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showAboutUsCards]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAboutUsClick={handleAboutUsClick} />
      {/* <Slider /> */}
      <FeaturesSlider />
      <AlenalkiSlider />
      {/* <BlueSection /> */}
      {/* <ThreeCardsSection /> */}
      <div id="about-section" ref={aboutSectionRef}>
        <AboutUs showCards={showAboutUsCards} />
      </div>
      {/* <ImpactStatsSection /> */}
      {/* <JoinCommunitySection /> */}
      <div id="contact-section">
        <ContactUs />
      </div>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default HomePage;