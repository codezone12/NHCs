import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaFilePdf, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      offset: 120,
      delay: 50,
      mirror: true
    });

    // Reading progress functionality
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);

    // Fetch blog details
    fetchBlogDetails();

    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, [id]);

  const fetchBlogDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/v1/blogs/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setBlog(data.data);
      } else {
        setError('Failed to fetch blog details');
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('An error occurred while fetching blog details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-blue-100 rounded w-40"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error || 'Blog not found'}</p>
            <Link to="/publicdiplomacy" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/publicdiplomacy" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
            data-aos="fade-right"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Blogs
          </Link>
          
          {/* Social Share Sidebar */}
          <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-gray-500 text-sm font-medium">Share</span>
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FaFacebookF />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaTwitter />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <FaLinkedinIn />
              </button>
              <div className="h-20 w-px bg-gray-300 my-2"></div>
              <span className="text-gray-500 text-sm font-medium transform rotate-90">Scroll</span>
            </div>
          </div>
          
          {/* Blog Header */}
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-md mb-8" data-aos="fade-up">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
              </span>
              {blog.authorName && (
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  {blog.authorName}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6" data-aos="fade-up">
              {blog.title}
            </h1>
            
            {blog.pdfUrl && (
              <a 
                href={blog.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors mb-6"
                data-aos="fade-up"
              >
                <FaFilePdf className="mr-2" />
                View PDF Document
              </a>
            )}
          </div>
          
          {/* Blog Image Display */}
          {blog.imageUrl && (
            <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          {/* Blog Content */}
          <div 
            className="bg-white p-6 md:p-10 rounded-lg shadow-md prose prose-lg max-w-none"
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          {/* Share on Mobile */}
          <div className="mt-8 flex justify-center space-x-4 lg:hidden" data-aos="fade-up">
            <span className="text-gray-500 self-center">Share:</span>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
              <FaFacebookF />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
              <FaTwitter />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
              <FaLinkedinIn />
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
};

export default BlogDetails;
