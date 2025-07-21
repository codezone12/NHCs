import { useState, useEffect, useRef } from 'react';
// import { Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GoToTop from '../components/GotToTop';
import { useNewsServices } from '../apis/newsService';
import { FaImage } from 'react-icons/fa';

export default function NewsDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newsId = queryParams.get('id');
  
  const [newsDetails, setNewsDetails] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use useRef to track if the initial fetch has been made
  const initialFetchDone = useRef(false);
  
  const newsServices = useNewsServices();
  const { getNewsById, getPublicNews } = newsServices;

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
    
    const fetchNewsDetails = async () => {
      if (!newsId) {
        setError('News ID is missing');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        // Fetch news details
        const response = await getNewsById(newsId);
        
        if (response.success && response.data) {
          setNewsDetails(response.data);
          
          // Fetch related news (same category)
          const relatedResponse = await getPublicNews({ 
            category: response.data.category,
            limit: 5,
            page: 1
          });
          
          if (relatedResponse.success) {
            // Filter out the current news article
            const filteredRelatedNews = relatedResponse.data.news.filter(
              news => news.id !== newsId
            );
            setRelatedNews(filteredRelatedNews);
            
            // Fetch other news (different category)
            const otherResponse = await getPublicNews({
              excludeCategory: response.data.category,
              limit: 10 - filteredRelatedNews.length,
              page: 1
            });
            
            if (otherResponse.success) {
              setOtherNews(otherResponse.data.news);
            }
          }
        } else {
          setError('Failed to fetch news details');
        }
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError('Error fetching news details. Please try again later.');
      } finally {
        setIsLoading(false);
        initialFetchDone.current = true;
      }
    };
    
    fetchNewsDetails();
    
    // Cleanup function to reset the ref when component unmounts
    return () => {
      initialFetchDone.current = false;
    };
  }, [newsId]); // Only depend on newsId

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

  // News card component for related and other news
  const NewsCard = ({ item }) => {
    const imageToShow = getImageToShow(item);
    const plainTextContent = stripHtmlTags(item.content);
    
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
          {imageToShow ? (
            <img 
              src={imageToShow} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <FaImage className="text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <Link to={`/news-details?id=${item.id}`}>
            <h4 className="font-medium hover:text-blue-600 cursor-pointer">{item.title}</h4>
          </Link>
          <div className="text-sm text-gray-500 mt-1 flex items-center">
            <span>{new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-1">•</span>
            <span>{Math.ceil(plainTextContent.length / 1000)} min read</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading news details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !newsDetails) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>{error || 'News article not found'}</p>
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
              Return to homepage
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get main image to display
  const mainImageToShow = getImageToShow(newsDetails);
  const plainTextContent = stripHtmlTags(newsDetails.content);

  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {newsDetails.category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(newsDetails.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{newsDetails.title}</h1>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">
                      {Math.ceil(plainTextContent.length / 1000)} min read
                      {newsDetails.isTrending && (
                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Trending</span>
                      )}
                    </p>
                  </div>
                  
                  {/* <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Bookmark size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div> */}
                </div>
              </div>
              
              {/* Article Image */}
              {mainImageToShow && (
                <div className="w-full h-96 relative">
                  <img 
                    src={mainImageToShow}
                    alt={newsDetails.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Article Content */}
              <div className="p-6">
                {/* Render HTML content safely */}
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: newsDetails.content }}
                />
                
                {/* Article Actions */}
                {/* <div className="mt-8 flex items-center justify-between border-t py-4">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                      <Bookmark size={20} />
                      <span>Save</span>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Related News */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {relatedNews.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-6">Related News</h3>
                  <div className="space-y-4 mb-8">
                    {relatedNews.map(news => (
                      <NewsCard key={news.id} item={news} />
                    ))}
                  </div>
                </>
              )}
              
              {otherNews.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-6">More News</h3>
                  <div className="space-y-4">
                    {otherNews.map(news => (
                      <NewsCard key={news.id} item={news} />
                    ))}
                  </div>
                </>
              )}
              
              {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-bold text-lg mb-2">Newsletter</h4>
                <p className="text-sm text-gray-600 mb-4">Stay updated with our latest news and articles</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow rounded-l-lg border border-r-0 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg font-medium">
                    Subscribe
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
    <GoToTop />
    <Footer />
    </>
  );
}