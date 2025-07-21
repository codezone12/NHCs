import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaClock, FaBookmark, FaChevronLeft, FaChevronRight, FaCheckCircle, FaLightbulb, FaFilePdf } from 'react-icons/fa';
import { ChevronDown, FileText } from 'lucide-react';
import FeaturesSlider from '../components/home-components/ThreeTornImages';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const PublicDiplomacyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState(null);

  // Hero slider images
  const heroImages = [
    "/images/public-diplomacy-page/DSC_6257.JPG",
    "/images/public-diplomacy-page/IMG_4228.JPG",
    "/images/public-diplomacy-page/IMG_4232.JPG",
    "/images/public-diplomacy-page/20150530-IMG_7397.JPG"
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

  const [hoveredObjective, setHoveredObjective] = useState(null);
  const [hoveredGoal, setHoveredGoal] = useState(null);

  // Color schemes for different objectives
  const colorSchemes = [
    { borderColor: 'border-blue-500', bgColor: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', textColor: 'text-blue-600' },
    { borderColor: 'border-green-500', bgColor: 'bg-green-500', hoverBg: 'hover:bg-green-600', textColor: 'text-green-600' },
    { borderColor: 'border-purple-500', bgColor: 'bg-purple-500', hoverBg: 'hover:bg-purple-600', textColor: 'text-purple-600' },
    { borderColor: 'border-red-500', bgColor: 'bg-red-500', hoverBg: 'hover:bg-red-600', textColor: 'text-red-600' },
    { borderColor: 'border-orange-500', bgColor: 'bg-orange-500', hoverBg: 'hover:bg-orange-600', textColor: 'text-orange-600' },
    { borderColor: 'border-teal-500', bgColor: 'bg-teal-500', hoverBg: 'hover:bg-teal-600', textColor: 'text-teal-600' },
    { borderColor: 'border-indigo-500', bgColor: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-600', textColor: 'text-indigo-600' },
    { borderColor: 'border-pink-500', bgColor: 'bg-pink-500', hoverBg: 'hover:bg-pink-600', textColor: 'text-pink-600' }
  ];

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

    // Fetch blogs
    fetchBlogs();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateReadingProgress);
      clearInterval(sliderInterval);
    };
  }, []);

  // Function to fetch blogs from API
  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/v1/blogs/public`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data.blogs || []);
      } else {
        setBlogsError('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogsError('An error occurred while fetching blogs');
    } finally {
      setBlogsLoading(false);
    }
  };

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

      <FeaturesSlider />

      {/* Blog Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-blue-900 mb-4"
              data-aos="fade-up"
            >
              Latest Blog Posts
            </h2>
            <p
              className="text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Explore our latest articles, insights, and updates on diplomacy, culture, and community engagement.
            </p>
          </div>

          {blogsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : blogsError ? (
            <div className="text-center py-12">
              <p className="text-red-500">{blogsError}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Blog Card Header */}
                  <div className="h-48 bg-blue-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/80 flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white px-4 text-center">
                        {blog.title}
                      </h3>
                    </div>
                  </div>

                  {/* Blog Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {blog.category}
                      </span>
                    </div>

                    <div className="mb-4 h-24 overflow-hidden">
                      <div
                        className="text-gray-600 text-sm line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: blog.content.length > 200
                            ? blog.content.substring(0, 200) + '...'
                            : blog.content,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Read More
                        <ChevronDown
                          className="ml-1 transform rotate-270"
                          size={16}
                        />
                      </Link>

                      {blog.pdfUrl && (
                        <a
                          href={blog.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-600 hover:text-red-800 text-sm"
                        >
                          <FaFilePdf className="mr-1" />
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>  

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
              className="text-3xl font-bold mb-6 text-blue-900 mt-12 flex items-center justify-center"
              data-aos="fade-up"
            >
              <FaTag className="mr-3 text-yellow-500" />
              Strategic Objectives – Public Diplomacy
            </h2>

            <div className="space-y-4 mb-12">
              {pageContent.strategicObjectives.map((objective, index) => {
                const isHovered = hoveredObjective === index;
                const colors = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer
                      ${isHovered ? 'shadow-xl transform -translate-y-1' : 'hover:shadow-lg'}
                      border-l-4 ${colors.borderColor}`}
                    onMouseEnter={() => setHoveredObjective(index)}
                    onMouseLeave={() => setHoveredObjective(null)}
                    // data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    {/* Header */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div
                            className={`p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 
                            ${colors.bgColor} ${colors.hoverBg} ${isHovered ? 'scale-110' : ''}`}
                          >
                            <FaTag className="text-white text-lg sm:text-xl" />
                          </div>
                          <h3
                            className={`font-bold text-lg sm:text-xl text-blue-800 transition-colors duration-300
                            ${isHovered ? colors.textColor : ''} pr-4`}
                          >
                            {index + 1}. {objective.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 ${colors.textColor} flex-shrink-0
                            ${isHovered ? 'rotate-180' : ''}`}
                          size={24}
                        />
                      </div>
                    </div>

                    {/* Dropdown Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out
                      ${isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div
                        className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 ${colors.borderColor} 
                        bg-gradient-to-r from-gray-50 to-white`}
                      >
                        <ul className="space-y-3">
                          {objective.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <FaCheckCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div
                          className={`mt-4 inline-flex items-center text-sm font-medium 
                          ${colors.textColor} group`}
                        >
                          View implementation details
                          <ChevronDown
                            className="ml-1 w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SMART Goals Section */}
            <h2
              className="text-3xl font-bold mb-6 text-blue-900 mt-12 flex items-center justify-center"
              data-aos="fade-up"
            >
              <FaTag className="mr-3 text-yellow-500" />
              SMART Goals - Public Diplomacy
            </h2>

            <div className="space-y-4 mb-12">
              {pageContent.smartGoals.map((goal, index) => {
                const isHovered = hoveredGoal === index;
                const colors = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer
                      ${isHovered ? 'shadow-xl transform -translate-y-1' : 'hover:shadow-lg'}
                      border-l-4 ${colors.borderColor}`}
                    onMouseEnter={() => setHoveredGoal(index)}
                    onMouseLeave={() => setHoveredGoal(null)}
                    // data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    {/* Header */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div
                            className={`p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 
                            ${colors.bgColor} ${colors.hoverBg} ${isHovered ? 'scale-110' : ''}`}
                          >
                            <FaTag className="text-white text-lg sm:text-xl" />
                          </div>
                          <h3
                            className={`font-bold text-lg sm:text-xl text-blue-800 transition-colors duration-300
                            ${isHovered ? colors.textColor : ''} pr-4`}
                          >
                            {index + 1}. {goal.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 ${colors.textColor} flex-shrink-0
                            ${isHovered ? 'rotate-180' : ''}`}
                          size={24}
                        />
                      </div>
                    </div>

                    {/* Dropdown Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out
                      ${isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div
                        className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 ${colors.borderColor} 
                        bg-gradient-to-r from-gray-50 to-white`}
                      >
                        <ul className="space-y-3">
                          {goal.points.map((point, pointIndex) => {
                            const [category, description] = point.split(': ');
                            return (
                              <li key={pointIndex} className="flex items-start">
                                <FaCheckCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                  <span className="font-semibold text-blue-700">{category}: </span>
                                  {description}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                        <div
                          className={`mt-4 inline-flex items-center text-sm font-medium 
                          ${colors.textColor} group`}
                        >
                          View implementation details
                          <ChevronDown
                            className="ml-1 w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </div>

      <Footer />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default PublicDiplomacyPage;