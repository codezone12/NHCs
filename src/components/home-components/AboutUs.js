import React, { useState, useEffect, useRef } from 'react';
import ImagePreview from '../image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  // Stats data with start and end values
  const statsData = [
    { start: 0, end: 500, suffix: '+', label: 'Projects completed' },
    { start: 0, end: 200, suffix: '%', label: 'Year on year growth' },
    { start: 0, end: 50, suffix: 'm', prefix: '$', label: 'Funded' },
    { start: 0, end: 10, suffix: 'k', label: 'Downloads' }
  ];

  // State to track animated values
  const [animatedValues, setAnimatedValues] = useState(statsData.map(stat => stat.start));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });

    // Create intersection observer for stats counter
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        animateNumbers();
        setHasAnimated(true);
      }
    }, { threshold: 0.3 });

    // Observe the stats section
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Function to animate numbers
  const animateNumbers = () => {
    // Duration of animation in ms
    const animationDuration = 2000;
    // Number of steps in the animation
    const steps = 60;
    // Time per step
    const stepTime = animationDuration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      
      const newValues = statsData.map((stat, index) => {
        const progress = currentStep / steps;
        const value = Math.floor(stat.start + progress * (stat.end - stat.start));
        return value;
      });

      setAnimatedValues(newValues);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Ensure final values are exact
        setAnimatedValues(statsData.map(stat => stat.end));
      }
    }, stepTime);
  };

  // Icons for each section
  const sectionIcons = {
    Background: "📚",
    Vision: "🔭",
    Mission: "🚀"
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm">
        Alenalki is a digital platform that aims to collect and share relevant information for Eritreans in the diaspora, with a special focus on culture, history and identity. It supports young people in their dual belonging and aims to create community and pride. At the same time, the platform acts as a bridge between Eritreans and other communities, promoting integration and collaboration.
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left side - Stats */}
        <div data-aos="fade-right" data-aos-delay="100">
          <h3 className="text-xl font-bold mb-6">
            Highlight achievements by the numbers
          </h3>
          <p className="text-gray-600 text-sm mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
            in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor
            interdum nulla, ut commodo diam libero vitae erat.
          </p>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {statsData.map((stat, index) => (
              <div key={index}>
                <h4 className="text-4xl font-bold">
                  {stat.prefix || ''}{animatedValues[index]}{stat.suffix || ''}
                </h4>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Images */}
        <div className="relative" data-aos="fade-left" data-aos-delay="200">
          <div className="grid grid-cols-2 gap-4">
            {/* Top image - full width */}
            <div className="col-span-2">
              <ImagePreview 
                src="/images/about-us-first.png" 
                alt="Mountain landscape" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            {/* Middle right image */}
            <div className="col-span-2">
              <ImagePreview 
                src="/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg" 
                alt="Coastal village" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            {/* Bottom left image with overlay */}
            <div className="relative col-span-1 -mt-16 -ml-10 border-2 border-white rounded-lg">
              <ImagePreview 
                src="/images/about-us-third.png" 
                alt="People hiking" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-800 font-bold p-2 rounded">
                <p className="text-lg mb-0">10k+</p>
                <p className="text-xs">Community Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced sections with cards and animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {['Background', 'Vision', 'Mission'].map((section, index) => (
          <div
            key={section}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{section}</h2>
                <span className="text-4xl" role="img" aria-label={section}>
                  {sectionIcons[section]}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm">
                {section === 'Background' && 
                  "Alenalki emerged from the need for a dynamic website for Eritreans in the diaspora, where they could easily access news and information about their culture, history and identity. The project aimed to fill the gap in relevant resources for both adults and young Eritreans growing up in other countries."}
                {section === 'Vision' && 
                  "Alenalki's vision is to be the definitive digital platform for Eritreans in the Scandinavian diaspora, where reliable information and strong culture are constantly promoted. By highlighting community and cultural heritage, we want to strengthen the Eritrean identity and support young people in their development."}
                {section === 'Mission' && 
                  "Alenalki's mission is to strengthen the community by providing reliable information, highlighting news and activities, and creating opportunities for collaboration and engagement. The platform seeks to foster pride in Eritrean culture and identity, especially among young people."}
              </p>
              <button 
                className="mt-4 px-4 py-2 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-colors hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Animated quote section */}
      <div 
        className="bg-blue-800 text-white p-8 rounded-xl mb-16 relative overflow-hidden"
        data-aos="zoom-in"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -mr-16 -mt-16 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full -ml-12 -mb-12 opacity-20"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Our Community Impact</h3>
          <blockquote className="text-lg italic mb-4">
            "By serving as a bridge between the diaspora and the local community, Alenalki strives to promote integration, togetherness, and mutual understanding."
          </blockquote>
          <p className="text-sm text-yellow-300">— Alenalki Team</p>
        </div>
      </div>

      {/* Call to action */}
      <div 
        className="text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-2xl font-bold mb-4">Join Our Community Today</h3>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm mb-6">
          Be part of our growing network of Eritreans in the diaspora and help build a stronger, more connected community.
        </p>
        <button 
          className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-colors hover:scale-105 transform"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default AboutUs;