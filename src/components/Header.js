import { ChartArea, Home, Menu, Newspaper, Phone, Users, X, Shield, Award, BookOpen, LogIn } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ onAboutUsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    // If on home page, scroll to the section
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger the About Us cards visibility when About Us is clicked
        if (sectionId === 'about-section' && onAboutUsClick) {
          // Small delay to ensure scrolling starts first
          setTimeout(() => {
            onAboutUsClick();
          }, 300);
        }
        
        // Close mobile menu if open
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    } else {
      // If not on home page, navigate to home page with hash
      if (sectionId === 'about-section') {
        navigate('/');
        // Delay the scroll and show cards after navigation
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (onAboutUsClick) {
              setTimeout(() => {
                onAboutUsClick();
              }, 300);
            }
          }
        }, 100);
      } else {
        navigate(`/#${sectionId}`);
      }
      
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  // Handle hash navigation when coming from another page
  useEffect(() => {
    if (isHomePage && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # character
      const section = document.getElementById(sectionId);
      if (section) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
          // If it's about-section, show the cards
          if (sectionId === 'about-section' && onAboutUsClick) {
            setTimeout(() => {
              onAboutUsClick();
            }, 300);
          }
        }, 100);
      }
    }
  }, [isHomePage, location.hash, onAboutUsClick]);

  return (
    <header className="sticky top-0 left-0 right-0 z-[100] bg-blue-500 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:ml-3">
          <a href="/" className="flex gap-2 text-white hover:text-yellow-400 transition relative group">
            <Home />Home
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 mt-1 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="flex gap-2 text-white hover:text-yellow-400 transition cursor-pointer relative group"
          >
            <Phone />Contact Us
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 mt-1 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </button>
          <button
            onClick={() => scrollToSection('about-section')}
            className="flex gap-2 text-white hover:text-yellow-400 transition cursor-pointer relative group"
          >
            <Users />About Us
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 mt-1 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </button>
          <a href="/news" className="flex gap-2 text-white hover:text-yellow-400 transition relative group">
            <Newspaper />News Feed
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 mt-1 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-yellow-400 transition flex items-center relative">
              More <span className="ml-1">▼</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 mt-1 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
            </button>
            <div className="absolute hidden group-hover:block bg-yellow-500 rounded-lg mt-0 w-40">
              <a href="/privacy" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition relative group flex items-center gap-2">
                <Shield size={16} /> Privacy Policy
              </a>
              <a href="/festival" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition relative group flex items-center gap-2">
                <Award size={16} /> Festival
              </a>
              <a href="/nhcc" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition relative group flex items-center gap-2">
                <Award size={16} /> Nhcc
              </a>
              <a href="/publicdiplomacy" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition relative group flex items-center gap-2">
                <BookOpen size={16} /> Public Diplomacy
              </a>
              <a href="/login" className="block px-4 py-3 text-white hover:bg-blue-600/30 transition relative group flex items-center gap-2">
                <LogIn size={16} /> User Login
              </a>
            </div>
          </div>
        </nav>
        
        {/* Logo - Centered */}
        <div className="flex gap-6 items-center">
          <Link to='/'>
            <img 
              src="/images/alenalki.Logo.png" 
              alt="NHCS Logo" 
              className="h-12 rounded-full overflow-hidden hover:scale-105 duration-[300ms]"
            />
          </Link>
          
          <a className="px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10" href="mailto:info@alenalki.se">
            <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
            Join Alenalki
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white relative group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900/80 backdrop-blur-md">
          <a href="/" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <Home /> Home
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <button 
            onClick={() => scrollToSection('about-section')}
            className="block p-4 text-white hover:bg-blue-800/50 w-full text-left relative group flex items-center gap-2"
          >
            <Users /> About Us
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </button>
          <a href="/news" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <Newspaper /> News Feed
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <a href="/festival" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <Award /> Festival
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <a href="/nhcc" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <Award /> Nhcc
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <a href="/publicdiplomacy" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <BookOpen /> Public Diplomacy
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="block p-4 text-white hover:bg-blue-800/50 w-full text-left relative group flex items-center gap-2"
          >
            <Phone /> Contact Us
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </button>
          <a href="/privacy" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <Shield /> Privacy Policy
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
          <a href="/login" className="block p-4 text-white hover:bg-blue-800/50 relative group flex items-center gap-2">
            <LogIn /> User Login
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;