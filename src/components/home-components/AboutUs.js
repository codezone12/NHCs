import React, { useState, useEffect, useRef } from 'react';
import ImagePreview from '../image-preview';

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
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        animateNumbers();
        setHasAnimated(true);
      }
    }, { threshold: 0.3 }); // Trigger when 30% of the element is visible

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm">
          NKCS is designed to facilitate seamless content management for admins and editors. With
          intuitive tools, users can easily create, edit, and publish news articles.
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Stats */}
        <div>
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
        <div className="relative">
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
    </div>
  );
};

export default AboutUs;