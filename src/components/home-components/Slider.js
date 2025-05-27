import React, { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    "/images/newImages/DSC_0468.JPG",
    "/images/newImages/DSC_0890.JPG",
    "/images/newImages/DSC_0446-001.JPG"
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  
  const contentItems = [
    {
      heading: (
        <>
          <span className='text-yellow-500'>Where three generations</span> come together <br />
          <span className='text-blue-600'>under one roof.</span>
        </>
      ),
      // heading: "Where three generations come together under one roof.",
      content: "Welcome to Alenalki.se – a dynamic force for unity. A bridge connecting people and communities, built on trust, collaboration, and inclusive engagement. Through articles, podcasts, and video discussions, we amplify voices, strengthen connections, and promote meaningful dialogue. Join us on social media to be part of the conversation and stay informed."
    },
    {
      heading: (
        <>
          <span className='text-yellow-500'>Unlock</span> the Power of the <br />
          <span className='text-blue-600'>Eritrean Diaspora</span>
        </>
      ),
      content: "The Eritrean diaspora is more than just a community—it's a dynamic force. With deep cultural roots, vibrant traditions, and an unbreakable sense of unity, Eritreans worldwide have built a powerful network that thrives on connection, resilience, and integration. From rich cultural celebrations to entrepreneurial spirit, Eritreans are shaping industries, influencing global conversations, and fostering a strong identity wherever they go. Their ability to blend tradition with innovation makes them invaluable in any space—be it business, entertainment, or social development. Invest in this energetic, unified, and forward-thinking community, and you're tapping into boundless potential. The Eritrean diaspora isn't just part of the world—it's actively transforming it."
      // content: "The Eritrean diaspora is more than just a community—it's a dynamic force. With deep cultural roots, vibrant traditions, and an unbreakable sense of unity, Eritreans worldwide have built a powerful network that thrives on connection, resilience, and integration. From rich cultural celebrations to entrepreneurial spirit, Eritreans are shaping industries, influencing global conversations, and fostering a strong identity wherever they go. Their ability to blend tradition with innovation makes them invaluable in any space"
    }
  ];
  
  // Function to handle auto-sliding for images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to handle auto-rotation for content
  useEffect(() => {
    const contentInterval = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contentItems.length);
    }, 7000); // Change content every 7 seconds
    
    return () => clearInterval(contentInterval);
  }, []);
  
  // Function to handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden mt-0 md:mt-[-0px]">
      {/* Background Images */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image}
            className="absolute w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          
          {/* Gradient overlay - dark at bottom, transparent at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-16">
          <div className="max-w-2xl">
            {/* Dynamic Heading */}
            <div className="min-h-[120px] md:min-h-[140px] mb-4">
              {contentItems.map((item, index) => (
                <h1 
                  key={index}
                  className={`text-3xl md:text-5xl max-w-[600px] font-bold text-white absolute transition-opacity duration-1000 ${
                    index === currentContent ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.heading}
                </h1>
              ))}
            </div>
            
            {/* Dynamic Content */}
            <div className="min-h-[200px] md:min-h-[240px]">
              {contentItems.map((item, index) => (
                <p 
                  key={index}
                  className={`text-base md:text-lg text-white mb-6 md:mb-8 max-w-[800px] transition-opacity duration-1000 absolute ${
                    index === currentContent ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.content}
                </p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="/news" className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                Go to News
                </span>
              </a>
              <a href='https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com' className="px-5 py-3 border-2 border-white text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                  <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-gray-100 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                  Join alenalki
                  </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-yellow-400 scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;