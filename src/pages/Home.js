import React from 'react';
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

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Slider />
      <FeaturesSlider />
      <BlueSection />
      {/* <ThreeCardsSection /> */}
      <div id="about-section">
        <AboutUs />
      </div>
      {/* <ImpactStatsSection /> */}
      <JoinCommunitySection />
      <div id="contact-section">
        <ContactUs />
      </div>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default HomePage;