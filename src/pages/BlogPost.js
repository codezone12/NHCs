import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaClock, FaBookmark, FaChevronLeft, FaChevronRight, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

const PublicDiplomacyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Hero slider images
  const heroImages = [
    "/images/newImages/IMG_9432.JPG",
    "/images/newImages/IMG_9449.JPG",
    "/images/newImages/IMG_3554-001.JPG",
    "/images/newImages/Highres-Independence_party_portrait_2015-05-30-0199.jpg"
  ];
  
  // Page content
  const pageContent = {
    title: "Public Diplomacy Mission – ተልእኾ",
    author: "Alenalki Team",
    date: "January 2024",
    category: "Diplomacy",
    readTime: "10 min read",
    views: "1.5K",
    mission: [
      "Our mission is to cultivate and fortify the relationships between Eritreans in the Diaspora, Swedes, and other minority ethnic communities in Sweden, fostering dialogue, mutual respect, and strategic cooperation.",
      "Through meaningful engagement with educational institutions, cultural organizations, governmental bodies, diplomatic missions, non-governmental institutions, and media representatives, we work to advance intercultural understanding and diplomatic goodwill.",
      "We are committed to shaping a balanced, informed, and dignified portrayal of Eritrea, highlighting its rich heritage, enduring resilience, and contributions to the global community.",
      "By championing inclusive representation and constructive discourse, we seek to strengthen bilateral and community relations, ensuring that Eritrean voices and perspectives are integrated into the broader societal fabric. Through diplomacy, outreach, and advocacy, we aim to foster enduring partnerships, promote collaboration, and inspire a shared vision of unity and progress."
    ],
    strategicObjectives: [
      {
        title: "Strengthen Bilateral and Community Relations",
        points: [
          "Foster meaningful partnerships between Eritreans in the Diaspora, Swedes, and other minority ethnic groups in Sweden.",
          "Promote inclusive dialogue that reinforces mutual respect and long-term collaboration."
        ]
      },
      {
        title: "Advance Intercultural Diplomacy",
        points: [
          "Facilitate cultural and intellectual exchanges that deepen understanding of Eritrean heritage and values.",
          "Encourage initiatives that highlight Eritrea's historical significance, resilience, and contributions to the global community."
        ]
      },
      {
        title: "Enhance Diplomatic Engagement",
        points: [
          "Build constructive alliances with government institutions, diplomatic missions, NGOs, and media networks to foster informed international discourse.",
          "Serve as a bridge for dialogue, collaboration, and policy discussions that benefit Eritrean-Swedish relations."
        ]
      },
      {
        title: "Promote a Balanced and Informed Narrative",
        points: [
          "Proactively shape accurate, nuanced, and dignified representations of Eritrea in international media and public discourse.",
          "Address misconceptions by engaging with thought leaders, scholars, and influential voices to ensure factual perspectives."
        ]
      },
      {
        title: "Expand Educational and Institutional Partnerships",
        points: [
          "Collaborate with academic institutions, schools, and cultural organizations to incorporate Eritrean history, traditions, and contemporary developments into learning spaces.",
          "Advocate for scholarships, research exchanges, and cross-cultural programs that bridge communities."
        ]
      },
      {
        title: "Strengthen Media and Public Outreach",
        points: [
          "Amplify Eritrean perspectives through strategic communication campaigns, journalistic partnerships, and diplomatic engagements.",
          "Cultivate relationships with key media outlets to share authentic narratives that enhance global understanding."
        ]
      },
      {
        title: "Empower Eritrean Communities in the Diaspora",
        points: [
          "Support initiatives that elevate social, economic, and cultural empowerment among Eritreans living abroad.",
          "Encourage leadership and civic engagement that contributes to national development and global representation."
        ]
      },
      {
        title: "Champion Diversity and Inclusion",
        points: [
          "Advocate for policies and platforms that promote representation, equity, and intercultural cooperation within Sweden's diverse social framework.",
          "Ensure Eritrean voices play a pivotal role in shaping inclusive and progressive societal narratives."
        ]
      }
    ],
    smartGoals: [
      {
        title: "Establish Strategic Partnerships",
        points: [
          "Specific: Build formal partnerships with at least five key institutions, including government agencies, NGOs, and media organizations.",
          "Measurable: Sign agreements or initiate collaborative projects with these institutions.",
          "Achievable: Engage through diplomatic meetings, networking events, and official outreach.",
          "Relevant: Strengthen Eritrean-Swedish relations while amplifying Eritrean representation.",
          "Time-Bound: Secure partnerships within 12 months and review annually."
        ]
      },
      {
        title: "Launch Cultural and Educational Exchange Programs",
        points: [
          "Specific: Develop and implement two cultural exchange programs annually.",
          "Measurable: Track participation rates, engagement levels, and educational outcomes.",
          "Achievable: Collaborate with schools, universities, and cultural organizations to establish these initiatives.",
          "Relevant: Promote mutual understanding and appreciation of Eritrean culture.",
          "Time-Bound: Initiate the first program within six months and evaluate impact yearly."
        ]
      },
      {
        title: "Enhance Media Representation",
        points: [
          "Specific: Ensure accurate and positive Eritrean narratives in Swedish and international media.",
          "Measurable: Publish at least 10 well-researched articles or interviews per year.",
          "Achievable: Partner with journalists and media platforms to distribute content.",
          "Relevant: Improve Eritrea's image through balanced and informed storytelling.",
          "Time-Bound: Achieve media coverage goals within the next 12 months and reassess annually."
        ]
      },
      {
        title: "Increase Public Engagement and Awareness",
        points: [
          "Specific: Organize quarterly public forums, seminars, and cultural events in Sweden.",
          "Measurable: Track attendance and participant feedback to gauge impact.",
          "Achievable: Utilize diplomatic resources and community networks to ensure participation.",
          "Relevant: Strengthen relationships and public perception of Eritrean communities.",
          "Time-Bound: Host first event within three months and maintain consistency."
        ]
      },
      {
        title: "Empower Eritrean Communities in the Diaspora",
        points: [
          "Specific: Develop leadership and mentorship programs for Eritrean youth and professionals.",
          "Measurable: Enroll at least 50 participants annually in leadership initiatives.",
          "Achievable: Coordinate with professionals, diplomats, and educators to run programs.",
          "Relevant: Foster strong, engaged, and successful Eritrean communities abroad.",
          "Time-Bound: Launch first cohort within six months and expand yearly."
        ]
      }
    ]
  };

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
                {pageContent.category}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaCalendarAlt className="mr-1" /> {pageContent.date}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaClock className="mr-1" /> {pageContent.readTime}
              </span>
              <span className="text-blue-100 flex items-center">
                <FaUser className="mr-1" /> {pageContent.views} views
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {pageContent.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Building bridges between communities and cultures
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                <img src="/images/newImages/images.jpg" alt="Author" className="w-full h-full object-cover" />
              </div>
              <span className="text-white">{pageContent.author}</span>
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
            {/* Mission Section */}
            <div 
              className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-10"
              data-aos="fade-up"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
                <FaLightbulb className="mr-3 text-yellow-500" />
                Our Mission
              </h2>
              
              {pageContent.mission.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-gray-700 mb-4 leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Strategic Objectives Section */}
            <h2 
              className="text-3xl font-bold mb-6 text-blue-900 mt-12 flex items-center"
              data-aos="fade-up"
            >
              <FaTag className="mr-3 text-yellow-500" />
              Strategic Objectives – Public Diplomacy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {pageContent.strategicObjectives.map((objective, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-800">
                    {index + 1}. {objective.title}
                  </h3>
                  <ul className="space-y-2">
                    {objective.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <FaCheckCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* SMART Goals Section */}
            <h2 
              className="text-3xl font-bold mb-6 text-blue-900 mt-12 flex items-center"
              data-aos="fade-up"
            >
              <FaTag className="mr-3 text-yellow-500" />
              SMART Goals - Public Diplomacy
            </h2>
            
            {pageContent.smartGoals.map((goal, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md mb-6"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <h3 className="text-xl font-bold mb-4 text-blue-800">
                  {index + 1}. {goal.title}
                </h3>
                <div className="pl-4 border-l-4 border-yellow-400">
                  {goal.points.map((point, pointIndex) => {
                    const [category, description] = point.split(': ');
                    return (
                      <div key={pointIndex} className="mb-3">
                        <span className="font-semibold text-blue-700">{category}: </span>
                        <span className="text-gray-700">{description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Conclusion */}
            <div 
              className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-10"
              data-aos="fade-up"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-3">Join Our Mission</h3>
              <p className="text-gray-700">
                We invite you to be part of our public diplomacy initiatives. Whether you're an individual, organization, or institution, your participation can make a significant difference in strengthening the Eritrean diaspora community and fostering intercultural understanding.
              </p>
            </div>
          </article>
          
          {/* Contact Section */}
          {/* <div 
            className="bg-white p-6 rounded-lg shadow-md my-12"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Get Involved</h3>
            <p className="text-gray-700 mb-6">
              If you're interested in our public diplomacy initiatives or would like to collaborate, please reach out to us. We welcome partnerships and participation from individuals and organizations committed to our mission.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Organization (Optional)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your organization"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="How would you like to get involved?"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div> */}
          
          {/* Newsletter Signup */}
          <div 
            className="bg-blue-800 text-white p-8 rounded-lg shadow-lg text-center mb-12"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Stay updated with our latest initiatives, events, and opportunities to get involved.
              Join our growing network of individuals committed to strengthening the Eritrean diaspora community.
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

export default PublicDiplomacyPage;