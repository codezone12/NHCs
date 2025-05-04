import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImagePreview from '../image-preview';

const NewsGrid = () => {
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      category: "TECHNOLOGY",
      image: "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      title: "The Future of Quantum Computing in Everyday Applications",
      description: "Exploring how quantum computing technologies are beginning to impact consumer products and daily technological interactions.",
      author: "Sarah Johnson",
      date: "April 22, 2025",
      readTime: "8 Min Read"
    },
    {
      id: 2,
      category: "SCIENCE",
      image: "/images/slider-images-2.jpg",
      title: "New Breakthrough in Sustainable Energy Storage",
      description: "Researchers have developed a revolutionary battery technology that could solve renewable energy's biggest challenge.",
      author: "Michael Chang",
      date: "April 20, 2025",
      readTime: "6 Min Read"
    },
    {
      id: 3,
      category: "BUSINESS",
      image: "/images/slider-images-3.jpg",
      title: "Global Markets Respond to Central Bank Policy Shifts",
      description: "How recent changes in monetary policy across major economies are reshaping investment strategies worldwide.",
      author: "Elena Rodriguez",
      date: "April 19, 2025",
      readTime: "7 Min Read"
    },
    {
      id: 4,
      category: "HEALTH",
      image: "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      title: "Revolutionary Gene Therapy Shows Promise for Chronic Conditions",
      description: "Clinical trials demonstrate unprecedented success in treating previously incurable genetic disorders.",
      author: "Dr. James Wilson",
      date: "April 18, 2025",
      readTime: "10 Min Read"
    },
    {
      id: 5,
      category: "CULTURE",
      image: "/images/slider-images-2.jpg",
      title: "Digital Art Renaissance: NFTs Enter Museum Collections",
      description: "Major cultural institutions are now acquiring digital artworks, signaling a new era for art preservation and exhibition.",
      author: "Amara Okafor",
      date: "April 17, 2025",
      readTime: "5 Min Read"
    },
    {
      id: 6,
      category: "ENVIRONMENT",
      image: "/images/slider-images-3.jpg",
      title: "Ocean Cleanup Initiative Reports 50% Reduction in Pacific Garbage Patch",
      description: "Innovative technologies and international cooperation lead to significant progress in addressing ocean plastic pollution.",
      author: "Thomas Greene",
      date: "April 16, 2025",
      readTime: "9 Min Read"
    },
    {
      id: 7,
      category: "POLITICS",
      image: "/images/range-buildings-shore-reflecting-lake-clear-blue-sky.jpg",
      title: "Global Summit Addresses AI Governance Frameworks",
      description: "World leaders gather to establish international standards for artificial intelligence development and implementation.",
      author: "Leila Hassan",
      date: "April 15, 2025",
      readTime: "12 Min Read"
    },
    {
      id: 8,
      category: "EDUCATION",
      image: "/images/slider-images-2.jpg",
      title: "Reimagining Higher Education: Universities Adopt Hybrid Learning Models",
      description: "Traditional institutions are transforming their approach to education in response to changing student needs and technological capabilities.",
      author: "Robert Chen",
      date: "April 14, 2025",
      readTime: "7 Min Read"
    },
    {
      id: 9,
      category: "SPACE",
      image: "/images/slider-images-3.jpg",
      title: "Private Sector Space Habitat Successfully Deploys in Low Earth Orbit",
      description: "The first commercially operated space habitat marks a milestone in the privatization and accessibility of space exploration.",
      author: "Sophia Müller",
      date: "April 13, 2025",
      readTime: "8 Min Read"
    }
  ]);

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const NewsCard = ({ item, index }) => (
    <div 
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-anchor-placement="center-bottom"
      className="bg-white rounded-lg overflow-hidden shadow-md mb-8 h-full"
    >
      <div className="relative">
        <ImagePreview 
          src={item.image} 
          alt={item.title} 
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded">
          {item.category}
        </span>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 leading-tight">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>
        
        <div className="flex items-center border-t pt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="ml-3">
            <p className="font-medium">{item.author}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{item.date}</span>
              <span className="mx-2">•</span>
              <span>{item.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Latest News</h1>
        <p className="text-gray-600 text-lg">Stay informed with our curated selection of top stories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <NewsCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;