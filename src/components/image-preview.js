import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Eye } from 'lucide-react';

// ImagePreview component that can be imported and used in other components
export default function ImagePreview({ src, alt, className }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openPreview = () => {
    setIsPreviewOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    // Restore body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Clean up body style if component unmounts while modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Modal component to be rendered via portal
  const Modal = () => {
    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 max-w-4xl relative">
          <button 
            onClick={closePreview}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 focus:outline-none"
          >
            <X size={24} />
          </button>
          <div className="flex justify-center">
            <img 
              src={src} 
              alt={alt || "Image preview"}
              className="max-h-[80vh] max-w-full object-contain" 
            />
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Image container with hover effect */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={src} 
          alt={alt || "Image"}
          className={className} 
        />
        
        {/* Eye icon overlay on hover */}
        {/* {isHovered && ( */}
          <div 
            className={`absolute ${isHovered ? "top-[5px]" : "top-[-35px]"} right-[5px] w-[30px] h-[30px] bg-black/40 hover:bg-white text-white hover:text-black flex items-center justify-center cursor-pointer duration-300 overflow-hidden rounded-lg`}
            onClick={openPreview}
          >
            <Eye size={28} className="" />
          </div>
        {/* )} */}
      </div>

      {/* Render modal via portal when open */}
      {isPreviewOpen && <Modal />}
    </>
  );
}