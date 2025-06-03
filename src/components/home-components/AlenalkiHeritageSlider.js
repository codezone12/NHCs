import React from 'react';

const AlenalkiSlider = () => {
  const headings = [
    "Alenalki: A Trusted Digital Home for Eritrean Heritage and Community!",
    "Connecting, Preserving, Empowering - Pillar of information and cultural empowerment for Eritreans in the diaspora.",
    "Authentic Stories. Reliable News. United Community."
  ];

  const allText = headings.join(" • ");

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-lg font-semibold pr-16">
          {allText}
        </span>
        <span className="text-lg font-semibold pr-16">
          {allText}
        </span>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AlenalkiSlider;