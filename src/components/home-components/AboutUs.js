import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = ({ showCards = false }) => {
  // Stats data with start and end values and icons
  const statsData = [
    { start: 0, end: 500, suffix: '+', label: 'Projects completed', icon: '🚀' },
    { start: 0, end: 200, suffix: '%', label: 'Year on year growth', icon: '📈' },
    { start: 0, end: 50, suffix: 'm', prefix: '$', label: 'Funded', icon: '💰' },
    { start: 0, end: 10, suffix: 'k', label: 'Downloads', icon: '📱' }
  ];

  // State to track animated values
  const [animatedValues, setAnimatedValues] = useState(statsData.map(stat => stat.start));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Initialize AOS with improved settings
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      offset: 120,
      delay: 50,
      throttleDelay: 99,
      mirror: true,
    });

    // Create intersection observer for stats counter
    const statsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        animateNumbers();
        setHasAnimated(true);
      }
    }, { threshold: 0.5 });

    // Observe the stats section
    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Scroll to paragraph when it becomes visible
  useEffect(() => {
    if (showCards && paragraphRef.current) {
      setTimeout(() => {
        // Get the element's position
        const elementPosition = paragraphRef.current.getBoundingClientRect().top;
        // Get the current scroll position
        const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight * 0.5);
        
        // Scroll to the adjusted position
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [showCards]);

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
    <div className="max-w-6xl mx-auto px-4 py-12" id="about-section">
      {/* Header */}
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        
        {/* Paragraph with show/hide functionality */}
        <div 
          ref={paragraphRef}
          className={`max-w-2xl mx-auto text-gray-600 text-sm transition-all duration-700 ${
            showCards 
              ? 'opacity-100 max-h-[2000px] transform translate-y-0' 
              : 'opacity-0 max-h-[80px] overflow-hidden transform translate-y-0'
          }`}
        >
          <p>
          Alenalki is a digital platform that aims to collect and share relevant information for Eritreans in the diaspora, with a special focus on culture, history and identity. It supports young people in their dual belonging and aims to create community and pride. At the same time, the platform acts as a bridge between Eritreans and other communities, promoting integration and collaboration.
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-xl font-bold mb-8 text-center">
          Highlight achievements by the numbers
        </h3>
        
        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                {stat.icon}
              </div>
              
              {/* Number */}
              <h4 className="text-4xl font-bold mb-2 text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                {stat.prefix || ''}{animatedValues[index]}{stat.suffix || ''}
              </h4>
              
              {/* Label */}
              <p className="text-gray-600 text-sm font-medium group-hover:text-gray-700 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced sections with cards and animations - Always visible */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {['Background', 'Vision', 'Mission'].map((section, index) => (
          <div
            key={section}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 150}
            data-aos-anchor-placement="center-bottom"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{section}</h2>
                <span className="text-4xl" role="img" aria-label={section}>
                  {sectionIcons[section]}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6">
              <p className="text-gray-600 text-sm">
                {section === 'Background' && 
                  "Alenalki emerged from the need for a dynamic website for Eritreans in the diaspora, where they could easily access news and information about their culture, history and identity. The project aimed to fill the gap in relevant resources for both adults and young Eritreans growing up in other countries."}
                {section === 'Vision' && 
                  "Alenalki's vision is to be the definitive digital platform for Eritreans in the Scandinavian diaspora, where reliable information and strong culture are constantly promoted. By highlighting community and cultural heritage, we want to strengthen the Eritrean identity and support young people in their development."}
                {section === 'Mission' && 
                  "Alenalki's mission is to strengthen the community by providing reliable information, highlighting news and activities, and creating opportunities for collaboration and engagement. The platform seeks to foster pride in Eritrean culture and identity, especially among young people."}
              </p>
              <a
                href="https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com"
                className="text-center mt-4 px-4 py-2 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-colors hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;