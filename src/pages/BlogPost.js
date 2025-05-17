import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImagePreview from '../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample blog data - in a real app, you would fetch this from your API
  const [blog, setBlog] = useState({
    title: "The Cultural Renaissance: Preserving Heritage in the Digital Age",
    subtitle: "How diaspora communities are using technology to maintain their cultural identity",
    author: "Alenalki Team",
    date: "November 15, 2023",
    category: "Culture",
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
        content: "One of the most significant developments in cultural preservation is the creation of digital archives. These repositories safeguard historical documents, photographs, oral histories, and traditional knowledge that might otherwise be lost to time. By digitizing these materials, communities ensure their accessibility for future generations, regardless of physical location."
      },
      {
        type: "image",
        src: "/images/newImages/IMG_6851.JPG",
        alt: "Digital archive of cultural artifacts",
        caption: "Digital preservation efforts help maintain connections to cultural heritage across generations."
      },
      {
        type: "paragraph",
        content: "Community-led initiatives have been particularly effective in building these archives, as they combine technological expertise with deep cultural knowledge. These projects often involve collaboration between elders, who hold traditional knowledge, and younger community members, who contribute digital skills."
      },
      {
        type: "quote",
        content: "Our digital archive isn't just about preserving the past—it's about creating a living bridge between generations and ensuring our stories continue to be told in our own voices.",
        author: "Cultural Preservation Project Leader"
      },
      {
        type: "heading",
        content: "Social Media: Creating Virtual Communities"
      },
      {
        type: "paragraph",
        content: "Social media platforms have revolutionized how diaspora communities connect and share cultural experiences. Facebook groups, Instagram accounts, and YouTube channels dedicated to specific cultural traditions provide spaces where community members can engage with their heritage daily, regardless of physical distance."
      },
      {
        type: "paragraph",
        content: "These platforms facilitate the sharing of everything from traditional recipes and music to language learning resources and cultural celebrations. They also enable real-time participation in important events, allowing community members to maintain connections to seasonal traditions and celebrations."
      },
      {
        type: "image",
        src: "/images/newImages/Highres-Independence_party_portrait_2015-05-30-0256.jpg",
        alt: "Community celebration",
        caption: "Cultural celebrations shared through digital media create connections across the diaspora."
      },
      {
        type: "heading",
        content: "Language Preservation Through Technology"
      },
      {
        type: "paragraph",
        content: "Language is perhaps the most fundamental element of cultural identity, and digital tools have created new possibilities for language preservation and learning. Mobile apps, online courses, and digital dictionaries make it easier than ever for diaspora communities to maintain linguistic connections to their heritage."
      },
      {
        type: "paragraph",
        content: "For Eritrean languages like Tigrinya, Tigre, and others, these technologies have been transformative. They provide accessible learning resources for younger generations and help standardize written forms of traditionally oral languages."
      },
      {
        type: "heading",
        content: "Challenges and Opportunities"
      },
      {
        type: "paragraph",
        content: "Despite these advances, digital cultural preservation faces significant challenges. The digital divide—unequal access to technology and internet connectivity—can limit participation, particularly among older community members or those in regions with limited infrastructure."
      },
      {
        type: "paragraph",
        content: "Additionally, the commercialization of digital platforms raises questions about data ownership and cultural appropriation. When cultural knowledge is shared online, communities may lose control over how it is used and represented."
      },
      {
        type: "paragraph",
        content: "Looking forward, the most promising initiatives combine digital innovation with community governance. These approaches ensure that technology serves cultural preservation goals while respecting traditional knowledge systems and community values."
      },
      {
        type: "conclusion",
        content: "As we navigate the complex relationship between technology and cultural heritage, diaspora communities continue to demonstrate remarkable creativity and resilience. By adapting digital tools to serve cultural preservation needs, these communities are not only maintaining connections to their heritage but also creating new forms of cultural expression that bridge past and present, tradition and innovation."
      }
    ],
    relatedPosts: [
      {
        id: 1,
        title: "Traditional Music in Modern Contexts",
        image: "/images/newImages/IMG_4818.JPG",
        excerpt: "How traditional musical forms are finding new audiences through digital platforms."
      },
      {
        id: 2,
        title: "Culinary Heritage: Preserving Food Traditions",
        image: "/images/newImages/20150530-IMG_7415.JPG",
        excerpt: "The role of food in maintaining cultural identity across generations and borders."
      },
      {
        id: 3,
        title: "Language Revival Movements in Diaspora Communities",
        image: "/images/newImages/IMG_2797.JPG",
        excerpt: "Grassroots efforts to revitalize heritage languages among younger generations."
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
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Reading progress bar functionality
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);

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
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
        <ImagePreview 
          src={blog.coverImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div data-aos="fade-up" className="max-w-4xl">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaCalendarAlt className="mr-1" /> {blog.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              {blog.subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
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
                      className="text-3xl font-bold mb-6 text-blue-900 mt-12"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
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
                        <footer className="text-gray-600">— {section.author}</footer>
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
            <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0"></div>
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
            <h3 className="text-lg font-bold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Culture', 'Digital', 'Heritage', 'Diaspora', 'Technology', 'Identity'].map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-700 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Related Posts */}
          <div className="mb-12" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Related Articles</h3>
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
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Comments (3)</h3>
            
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
                  content: "This article beautifully captures the importance of digital tools in preserving cultural heritage. As someone working in cultural education, I've seen firsthand how these technologies can bridge generational gaps and create new forms of cultural expression."
                },
                {
                  name: "Michael Tesfay",
                  date: "November 17, 2023",
                  content: "I appreciate the balanced perspective on both the opportunities and challenges of digital preservation. The point about community governance is particularly important - technology should serve community needs rather than dictate how cultural knowledge is shared and preserved."
                },
                {
                  name: "Aida Haile",
                  date: "November 16, 2023",
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
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <h5 className="font-bold">{comment.name}</h5>
                      <p className="text-gray-500 text-sm">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">Reply</button>
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