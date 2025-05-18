import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImagePreview from '../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaClock, FaComments, FaBookmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Sample hero slider images
  const heroImages = [
    "/images/newImages/IMG_9432.JPG",
    "/images/newImages/IMG_9449.JPG",
    "/images/newImages/IMG_3554-001.JPG",
    "/images/newImages/Highres-Independence_party_portrait_2015-05-30-0199.jpg"
  ];
  
  // Sample blog data - in a real app, you would fetch this from your API
  const [blog, setBlog] = useState({
    title: "The Cultural Renaissance: Preserving Heritage in the Digital Age",
    subtitle: "How diaspora communities are using technology to maintain their cultural identity",
    author: "Alenalki Team",
    date: "November 15, 2023",
    category: "Culture",
    readTime: "8 min read",
    views: "1.2K",
    coverImage: "/images/newImages/IMG_8845.JPG",
    content: [
      {
        type: "paragraph",
        content: "In an increasingly interconnected world, diaspora communities face unique challenges in preserving their cultural heritage while adapting to new environments. The digital revolution has transformed how we connect, communicate, and consume information, offering unprecedented opportunities for cultural preservation and expression."
      },
      {
        type: "paragraph",
        content: "For Eritrean communities living abroad, digital platforms have become vital tools for maintaining connections to their homeland, language, and traditions. These technologies enable the sharing of stories, music, art, and historical knowledge across geographical boundaries, creating virtual spaces where cultural identity can flourish."
      },
      {
        type: "heading",
        content: "Digital Archives: Preserving the Past"
      },
      {
        type: "paragraph",
        content: "Digital archives have emerged as powerful repositories for cultural heritage. Organizations like the Eritrean Digital Archive Project are collecting, digitizing, and preserving historical documents, photographs, and oral histories that might otherwise be lost to time."
      },
      {
        type: "image",
        src: "/images/newImages/IMG_6851.JPG",
        alt: "Digital archiving of cultural artifacts",
        caption: "Digital preservation efforts help maintain connections to cultural heritage across generations."
      },
      {
        type: "paragraph",
        content: "These archives serve not only as historical records but as educational resources for younger generations who may have limited direct experience with their ancestral homeland. By making these materials accessible online, they become living libraries that can be explored by anyone with an internet connection."
      },
      {
        type: "quote",
        content: "The digital archive is our modern-day time capsule, preserving not just artifacts but the stories, voices, and lived experiences of our community.",
        author: "Dr. Senait Tekle, Cultural Preservation Specialist"
      },
      {
        type: "heading",
        content: "Social Media: Building Virtual Communities"
      },
      {
        type: "paragraph",
        content: "Social media platforms have revolutionized how diaspora communities connect and share cultural experiences. Facebook groups, Instagram accounts, and YouTube channels dedicated to Eritrean culture have created virtual gathering spaces where community members can share traditional recipes, music, dance, and celebrations."
      },
      {
        type: "image",
        src: "/images/newImages/IMG_4818.JPG",
        alt: "Community cultural celebration",
        caption: "Social media enables the sharing of cultural celebrations and traditions across borders."
      },
      {
        type: "paragraph",
        content: "These platforms allow for real-time participation in cultural events, even from thousands of miles away. Live-streamed festivals, concerts, and discussions create shared experiences that strengthen community bonds and cultural identity."
      },
      {
        type: "heading",
        content: "Language Learning Apps: Preserving Linguistic Heritage"
      },
      {
        type: "paragraph",
        content: "Language is perhaps the most fundamental element of cultural identity, and digital tools are playing a crucial role in language preservation and learning. Custom apps and online courses for Tigrinya, Tigre, and other Eritrean languages make it possible for younger generations to maintain linguistic connections to their heritage."
      },
      {
        type: "image",
        src: "/images/newImages/cr_mining_post01.jpg.png",
        alt: "Digital language learning tools",
        caption: "Language learning applications help younger generations maintain linguistic connections to their heritage."
      },
      {
        type: "paragraph",
        content: "These digital resources often incorporate cultural context, teaching not just vocabulary and grammar but the stories, proverbs, and songs that give the language its richness and depth."
      },
      {
        type: "heading",
        content: "Challenges and Considerations"
      },
      {
        type: "paragraph",
        content: "While digital tools offer tremendous opportunities for cultural preservation, they also present challenges. Questions of authenticity, representation, and access must be carefully considered. Who controls these digital narratives? How can we ensure that digital preservation efforts respect the complexity and diversity of cultural expressions?"
      },
      {
        type: "paragraph",
        content: "Additionally, the digital divide remains a significant barrier. Not all community members have equal access to digital technologies or the skills to use them effectively. Efforts to digitize cultural heritage must be accompanied by initiatives to increase digital literacy and access."
      },
      {
        type: "conclusion",
        content: "The intersection of technology and cultural preservation represents a promising frontier for diaspora communities. By thoughtfully leveraging digital tools, Eritrean communities around the world can maintain vibrant connections to their heritage while creating new forms of cultural expression that bridge past and present, tradition and innovation. The key lies in approaching these technologies not as replacements for traditional cultural practices but as complementary tools that can amplify and extend cultural connections across generations and geographies."
      }
    ],
    relatedPosts: [
      {
        id: 1,
        title: "Traditional Music in the Streaming Era",
        excerpt: "How streaming platforms are helping preserve and promote traditional Eritrean music globally.",
        image: "/images/newImages/IMG_6640.JPG"
      },
      {
        id: 2,
        title: "Digital Storytelling and Oral Traditions",
        excerpt: "Exploring how podcasts and digital media are giving new life to traditional storytelling practices.",
        image: "/images/newImages/IMG_7246.JPG"
      },
      {
        id: 3,
        title: "Virtual Cultural Festivals: The New Normal?",
        excerpt: "Examining the rise of online cultural celebrations and their impact on community connection.",
        image: "/images/newImages/DSC_0468.JPG"
      }
    ]
  });

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
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Reading progress functionality
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    
    // Hero slider auto-rotation
    const sliderInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateReadingProgress);
      clearInterval(sliderInterval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroImages.length - 1 : prev - 1));
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
      
      {/* Hero Section with Slider */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden" ref={sliderRef}>
        <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
        
        {/* Slider Images */}
        <div className="relative h-full w-full">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        >
          <FaChevronRight />
        </button>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            ></button>
          ))}
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div data-aos="fade-up" className="max-w-4xl">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaCalendarAlt className="mr-1" /> {blog.date}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaClock className="mr-1" /> {blog.readTime}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaUser className="mr-1" /> {blog.views} views
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              {blog.subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                <img src="/images/newImages/images.jpg" alt="Author" className="w-full h-full object-cover" />
              </div>
              <span className="text-white">{blog.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
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
              <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaShareAlt />
              </button>
              <button className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <FaBookmark />
              </button>
              <div className="h-20 w-px bg-gray-300 my-2"></div>
              <span className="text-gray-500 text-sm font-medium transform rotate-90">Scroll</span>
            </div>
          </div>
          
          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {blog.content.map((section, index) => {
              switch (section.type) {
                case 'paragraph':
                  return (
                    <p 
                      key={index} 
                      className="text-gray-700 mb-6 leading-relaxed"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      {section.content}
                    </p>
                  );
                case 'heading':
                  return (
                    <h2 
                      key={index} 
                      className="text-3xl font-bold mb-6 text-blue-900 mt-12 flex items-center"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <FaTag className="mr-3 text-yellow-500" />
                      {section.content}
                    </h2>
                  );
                case 'image':
                  return (
                    <figure 
                      key={index} 
                      className="my-10"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <ImagePreview 
                          src={section.src}
                          alt={section.alt}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <figcaption className="text-center text-gray-500 mt-3 text-sm">
                        {section.caption}
                      </figcaption>
                    </figure>
                  );
                case 'quote':
                  return (
                    <blockquote 
                      key={index}
                      className="border-l-4 border-yellow-400 pl-6 py-2 my-8 bg-gray-50 rounded-r-lg shadow-sm"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <p className="text-xl italic text-gray-700 mb-2">{section.content}</p>
                      {section.author && (
                        <footer className="text-gray-600 flex items-center">
                          <FaUser className="mr-2 text-blue-500" /> {section.author}
                        </footer>
                      )}
                    </blockquote>
                  );
                case 'conclusion':
                  return (
                    <div 
                      key={index}
                      className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-10"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <h3 className="text-xl font-bold text-blue-900 mb-3">Conclusion</h3>
                      <p className="text-gray-700">{section.content}</p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </article>
          
          {/* Author Bio */}
          <div 
            className="bg-white p-6 rounded-lg shadow-md my-12 flex flex-col md:flex-row items-center md:items-start gap-6"
            data-aos="fade-up"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <img src="/images/newImages/images.jpg" alt="Author" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{blog.author}</h3>
              <p className="text-gray-600 mb-4">
                Content creator at Alenalki with a passion for cultural preservation and community building. 
                Specializes in digital storytelling and heritage documentation.
              </p>
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaFacebookF />
                </button>
                <button className="text-blue-400 hover:text-blue-600">
                  <FaTwitter />
                </button>
                <button className="text-blue-700 hover:text-blue-900">
                  <FaLinkedinIn />
                </button>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-12" data-aos="fade-up">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <FaTag className="mr-2 text-yellow-500" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Culture', 'Digital', 'Heritage', 'Diaspora', 'Technology', 'Identity'].map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-700 transition-colors cursor-pointer flex items-center"
                >
                  <FaTag className="mr-1 text-xs" /> {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Related Posts */}
          <div className="mb-12" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
              <FaBookmark className="mr-3 text-yellow-500" /> Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blog.relatedPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-48 overflow-hidden">
                    <ImagePreview 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                    <button className="text-yellow-500 font-medium hover:text-yellow-600 transition-colors flex items-center">
                      Read More 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div 
            className="bg-blue-800 text-white p-8 rounded-lg shadow-lg text-center mb-12"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Stay updated with our latest articles, events, and community news. 
              Join our growing network of readers interested in cultural preservation and diaspora stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-800"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          {/* Comments Section */}
          <div className="mb-12" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
              <FaComments className="mr-3 text-yellow-500" /> Comments (3)
            </h3>
            
            {/* Comment Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea 
                  placeholder="Your Comment" 
                  rows="4" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                ></textarea>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Comment
                </button>
              </form>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  date: "November 18, 2023",
                  avatar: "/images/newImages/IMG_6640.JPG",
                  content: "This article beautifully captures the importance of digital tools in preserving cultural heritage. As someone working in cultural education, I've seen firsthand how these technologies can bridge generational gaps and create new forms of cultural expression."
                },
                {
                  name: "Michael Tesfay",
                  date: "November 17, 2023",
                  avatar: "/images/newImages/IMG_7246.JPG",
                  content: "I appreciate the balanced perspective on both the opportunities and challenges of digital preservation. The point about community governance is particularly important - technology should serve community needs rather than dictate how cultural knowledge is shared and preserved."
                },
                {
                  name: "Aida Haile",
                  date: "November 16, 2023",
                  avatar: "/images/newImages/DSC_0468.JPG",
                  content: "The section on language preservation resonated with me deeply. I've been using language learning apps to reconnect with my heritage language, and while they're not perfect, they've made the process so much more accessible than it would have been otherwise."
                }
              ].map((comment, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img src={comment.avatar} alt={comment.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold">{comment.name}</h5>
                      <p className="text-gray-500 text-sm flex items-center">
                        <FaCalendarAlt className="mr-1 text-xs" /> {comment.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                    <FaComments className="mr-1" /> Reply
                  </button>
                </div>
              ))}
            </div>
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

export default BlogPost;