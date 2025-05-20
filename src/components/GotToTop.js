import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50
        transition-all duration-300
        ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        group
      `}
      aria-label="Go to top"
    >
      <div className="
        bg-yellow-400 text-blue-900 shadow-lg rounded-full w-14 h-14 flex items-center justify-center
        transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
        hover:bg-yellow-500
        border-4 border-white
      ">
        <FaArrowUp className="text-2xl transition-transform duration-300 group-hover:-translate-y-1" />
      </div>
    </button>
  );
};

export default GoToTop;