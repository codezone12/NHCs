import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaImage } from 'react-icons/fa';

const NewsGrid = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/news/public`);
        
        if (response.data.success) {
          setNewsItems(response.data.data.news);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error fetching news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  // Function to extract the first image from HTML content
  const extractFirstImageFromContent = (content) => {
    if (!content) return null;
    
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(imgRegex);
    
    return match ? match[1] : null;
  };

  // Function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
  };

  const NewsCard = ({ item, index }) => {
    // Determine which image to display
    let imageToShow = null;
    
    if (item.imageUrl) {
      // Use the dedicated image if it exists
      imageToShow = item.imageUrl;
    } else {
      // Try to extract image from content
      const contentImage = extractFirstImageFromContent(item.content);
      if (contentImage) {
        // Check if it's a data URL or regular URL
        imageToShow = contentImage.startsWith('data:') ? contentImage : contentImage;
      }
    }
    
    // Get plain text content for preview
    const plainTextContent = stripHtmlTags(item.content);
    
    return (
      <div 
        data-aos="fade-up"
        data-aos-delay={index * 100}
        data-aos-anchor-placement="center-bottom"
        className="bg-white rounded-lg overflow-hidden shadow-md mb-8 h-full flex flex-col"
      >
        <Link to={`/news-details?id=${item.id}`} className="flex-grow flex flex-col">
          <div className="relative h-48 overflow-hidden">
            {imageToShow ? (
              <img 
                src={imageToShow} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FaImage className="text-gray-400 text-5xl" />
              </div>
            )}
            <span className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded">
              {item.category}
            </span>
          </div>
          
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-bold mb-3 leading-tight">{item.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {plainTextContent.length > 120 ? `${plainTextContent.substring(0, 120)}...` : plainTextContent}
            </p>
            
            <div className="flex items-center border-t pt-4 mt-auto">
              <div className="flex items-center text-xs text-gray-500">
                <span>{new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span className="mx-2">•</span>
                <span>{Math.ceil(plainTextContent.length / 1000)} Min Read</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600 mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Latest News</h1>
        <p className="text-gray-600 text-lg">Stay informed with our curated selection of top stories</p>
      </div>

      {newsItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No news articles available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsGrid;