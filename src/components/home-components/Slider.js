import React, { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    "/images/newImages/DSC_0468.JPG",
    "/images/newImages/DSC_0890.JPG",
    "/images/newImages/DSC_0446-001.JPG"
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const headings = [
    'Development Document',
    'Technical Resources',
    'Programming Guides'
  ];
  
  // Function to handle auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    const currentHeading = headings[loopNum % headings.length];
    
    const handleTyping = () => {
      setTypewriterText(currentHeading.substring(0, isDeleting 
        ? typewriterText.length - 1 
        : typewriterText.length + 1
      ));
      
      // Set typing speed
      if (!isDeleting && typewriterText === currentHeading) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(100);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 100 : 150);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopNum, typingSpeed]);
  
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
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
               <span className='text-yellow-500'>Discover</span> the Future of <br /><span className='text-blue-600 inline-block min-h-[40px] md:min-h-[60px]'>{typewriterText}<span className="animate-pulse">|</span></span>
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8">
              Welcome to NHCS, your go-to platform for all things development. Stay updated with the latest news and insights while engaging with our vibrant community.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="/news" className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10">
                <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                Go to News
                </span>
              </a>
              <a className="px-5 py-3 border-2 border-white text-lg font-semibold rounded-lg border-white-2px overflow-hidden relative group cursor-pointer bg-transparent hover:scale-105 duration-[700ms] z-10">
                  <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-gray-100 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                  Join Community
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