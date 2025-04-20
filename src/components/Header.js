import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-20 bg-gray-500/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-white hover:text-blue-200 transition">Home</a>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="text-white hover:text-blue-200 transition cursor-pointer"
          >
            Contact Us
          </button>
          <button 
            onClick={() => scrollToSection('about-section')}
            className="text-white hover:text-blue-200 transition cursor-pointer"
          >
            About Us
          </button>
          <a href="/news" className="text-white hover:text-blue-200 transition">News Feed</a>
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-blue-200 transition flex items-center">
              More <span className="ml-1">▼</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white/20 backdrop-blur-md rounded mt-0 w-40">
              {/* <a href="/contact" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition">Contact Us</a> */}
              <a href="/privacy" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition">Privacy Policy</a>
              <a href="/login" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition">User Login</a>
            </div>
          </div>

          
        </nav>
        
        {/* Logo - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/images/logo.png" 
            alt="NHCS Logo" 
            className="h-10"
          />
        </div>
          
        {/* Menu Button */}
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
            Join
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900/80 backdrop-blur-md">
          <a href="/" className="block p-4 text-white hover:bg-blue-800/50">Home</a>
          <button 
            onClick={() => scrollToSection('about-section')}
            className="block p-4 text-white hover:bg-blue-800/50 w-full text-left"
          >
            About Us
          </button>
          <a href="/news" className="block p-4 text-white hover:bg-blue-800/50">News Feed</a>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="block p-4 text-white hover:bg-blue-800/50 w-full text-left"
          >
            Contact Us
          </button>
          <a href="/privacy" className="block p-4 text-white hover:bg-blue-800/50">Privacy Policy</a>
          <a href="/login" className="block p-4 text-white hover:bg-blue-800/50">User Login</a>
        </div>
      )}
    </header>
  );
};

export default Header;