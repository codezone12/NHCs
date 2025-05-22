import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
          {/* Logo and Newsletter */}
          <div className="w-full lg:w-1/3">
            {/* Logo */}
            <div className="mb-6">
              <Link to='/'>
                <img 
                  src="/images/alenalki.Logo.png" 
                  alt="NHCS Logo" 
                  className="h-16 rounded-full hover:scale-105 duration-[300ms]"
                />
              </Link>
            </div>
            
            {/* Newsletter */}
            <p className="mb-4 text-sm">Subscribe to our newsletter for the latest features and updates.</p>
            <form className="flex flex-col sm:flex-row gap-2 mb-3">
              <input 
                type="email" 
                placeholder="Your Email Here" 
                className="bg-black border border-gray-600 text-white px-4 py-2 flex-grow"
                required
              />
              <button 
                type="submit" 
                className="bg-black border border-gray-600 text-white px-6 py-2 hover:bg-gray-800 transition"
              >
                Join
              </button>
            </form>
            <p className="text-xs text-gray-400">By subscribing, you consent to our Privacy Policy and receiving updates.</p>
          </div>
          
          {/* Useful Links */}
          <div className="w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/home", text: "Contact Us" },
                { href: "/support", text: "Support Us" },
                { href: "/festival", text: "FestivalPage" },
                { href: "/nhcc", text: "Nhcc Page" },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-gray-300 hover:text-yellow-500 transition relative inline-block group">
                    {link.text}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Stay Updated */}
          <div className="w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-4">Stay Updated</h3>
            <ul className="space-y-2">
              {[
                { 
                  href: "https://www.facebook.com/share/1FuRggQXLu/?mibextid=wwXIfrhttps://facebook.com", 
                  text: "Facebook",
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                },
                { 
                  href: "https://twitter.com", 
                  text: "X",
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                },
                { 
                  href: "https://youtube.com", 
                  text: "YouTube",
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                  </svg>
                }
              ].map((social, index) => (
                <li key={index}>
                  <a href={social.href} className="text-sm text-gray-300 hover:text-yellow-500 transition flex items-center gap-2 relative group">
                    {social.icon}
                    <span className="relative">
                      {social.text}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2025 Alenalki. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-6">
            {[
              { href: "/privacy", text: "Privacy Policy" },
              { href: "/terms", text: "Terms of Use" },
              { href: "#", text: "Cookie Settings", isButton: true }
            ].map((item, index) => (
              item.isButton ? (
                <button key={index} className="text-xs text-gray-400 hover:text-yellow-500 transition relative group">
                  {item.text}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
                </button>
              ) : (
                <a key={index} href={item.href} className="text-xs text-gray-400 hover:text-yellow-500 transition relative group">
                  {item.text}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full"></div>
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;