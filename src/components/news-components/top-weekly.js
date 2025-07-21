import { useState, useEffect, useRef } from 'react';
import ImagePreview from '../image-preview';
import { Link } from 'react-router-dom';
import { useNewsServices } from '../../apis/newsService';
import { FaImage } from 'react-icons/fa';

const TopWeekly = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use useRef to track if the initial fetch has been made
  const initialFetchDone = useRef(false);
  
  const newsServices = useNewsServices();
  const { getPublicNews } = newsServices;

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

  useEffect(() => {
    // Prevent multiple fetches
    if (initialFetchDone.current) return;
    
    const fetchFeaturedNews = async () => {
      try {
        setLoading(true);
        // Fetch trending news (up to 7 items)
        const response = await getPublicNews({ 
          isTrending: true,
          limit: 7,
          page: 1
        });
        
        if (response.success) {
          setFeaturedNews(response.data.news);
        } else {
          setError('Failed to fetch featured news');
        }
      } catch (err) {
        console.error('Error fetching featured news:', err);
        setError('Error fetching featured news. Please try again later.');
      } finally {
        setLoading(false);
        initialFetchDone.current = true;
      }
    };

    fetchFeaturedNews();
    
    // Cleanup function to reset the ref when component unmounts
    return () => {
      initialFetchDone.current = false;
    };
  }, []); // Empty dependency array to run only once

  // Helper function to determine which image to display
  const getImageToShow = (item) => {
    if (item.imageUrl) {
      return item.imageUrl;
    } else {
      const contentImage = extractFirstImageFromContent(item.content);
      if (contentImage) {
        return contentImage;
      }
    }
    return null;
  };

  const ArticleCard = ({ article, isLarge }) => {
    const imageToShow = getImageToShow(article);
    const plainTextContent = stripHtmlTags(article.content);
    const readTime = `${Math.ceil(plainTextContent.length / 1000)} Min Read`;
    
    return (
      <div className={`mb-6 ${isLarge ? 'md:col-span-1' : ''}`}>
        <Link to={`/news-details?id=${article.id}`}>
          <div className="relative overflow-hidden rounded-lg">
            {imageToShow ? (
              <img 
                src={imageToShow} 
                alt={article.title} 
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <FaImage className="text-gray-400 text-4xl" />
              </div>
            )}
            <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
          <h3 className="font-bold text-lg mt-3 leading-tight hover:text-blue-600">
            {article.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </Link>
      </div>
    );
  };

  const SideArticleCard = ({ article }) => {
    const imageToShow = getImageToShow(article);
    const plainTextContent = stripHtmlTags(article.content);
    const readTime = `${Math.ceil(plainTextContent.length / 1000)} Min Read`;
    
    return (
      <div className="flex flex-col mb-6">
        <Link to={`/news-details?id=${article.id}`}>
          <div className="relative overflow-hidden rounded-lg mb-3">
            {imageToShow ? (
              <img 
                src={imageToShow} 
                alt={article.title} 
                className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105" 
              />
            ) : (
              <div className="w-full h-36 bg-gray-200 flex items-center justify-center">
                <FaImage className="text-gray-400 text-3xl" />
              </div>
            )}
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
          <h3 className="font-bold text-base leading-tight hover:text-blue-600">
            {article.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading featured news...</p>
        </div>
      </div>
    );
  }

  if (error || featuredNews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-1">Top Weekly Trending Topics</h1>
          <p className="text-gray-600">Stay informed with our top weekly news articles.</p>
        </div>
        <div className="text-center text-gray-500">
          <p>{error || 'No featured news available at the moment.'}</p>
        </div>
      </div>
    );
  }

  // Split the news articles for different sections
  const mainArticles = featuredNews.slice(0, 4);
  const sideArticles = featuredNews.slice(4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-1">Top Weekly Trending Topics</h1>
        <p className="text-gray-600">Stay informed with our top weekly news articles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="w-full text-lg font-bold mb-6 pb-2 inline-block relative">
            Featured News
            <div className="absolute flex justify-start w-full h-[4px] bg-gray-200 overflow-hidden border-[0px] border-x-0 border-gray-500 top-full">
              <div className='w-[100px] h-[100px] -translate-x-[50%] -translate-y-[60%] bg-yellow-400 transform rotate-45'></div>
              <div className='w-[10px] h-[100px] -translate-x-[400%] -translate-y-[50%] bg-blue-500 transform rotate-45'></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainArticles.slice(0, 2).map(article => (
              <ArticleCard key={article.id} article={article} isLarge={true} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {mainArticles.slice(2, 4).map(article => (
              <ArticleCard key={article.id} article={article} isLarge={true} />
            ))}
          </div>
        </div>

        {sideArticles.length > 0 && (
          <div>
            <h2 className="w-full text-lg font-bold mb-6 pb-2 inline-block relative">
              More Trending
              <div className="absolute flex justify-start w-full h-[4px] bg-gray-200 overflow-hidden border-[0px] border-x-0 border-gray-500 top-full">
                <div className='w-[100px] h-[100px] -translate-x-[50%] -translate-y-[60%] bg-yellow-400 transform rotate-45'></div>
                <div className='w-[10px] h-[100px] -translate-x-[400%] -translate-y-[50%] bg-blue-500 transform rotate-45'></div>
              </div>
            </h2>
            
            <div className="space-y-6">
              {sideArticles.map(article => (
                <SideArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopWeekly;