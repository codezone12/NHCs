import React, { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaUsers, FaGlobe, FaHandshake, FaFlag, FaHistory, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImagePreview from '../components/image-preview';
import Slider from '../components/home-components/Slider';
import { submitContactForm } from '../apis/authService';
import FeaturesSlider from '../components/home-components/ThreeTornImages';
import GoToTop from '../components/GotToTop';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MapPin, Globe, Users, User, Mail, Phone, MessageSquare, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventServices } from '../apis/eventService';
import { format } from 'date-fns';
import { subscribeToNewsletter } from '../apis/authService';
import { toast } from 'react-toastify';

// CountUpCard component for animated statistics
const CountUpCard = ({ endValue, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new window.IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        animateCount();
        if (countRef.current) {
          observerRef.current.unobserve(countRef.current);
        }
      }
    }, { threshold: 0.1 });

    if (countRef.current) {
      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (observerRef.current && countRef.current) {
        observerRef.current.unobserve(countRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  const animateCount = () => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easedProgress * endValue);

      setCount(currentCount);

      if (currentStep === steps) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, stepTime);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center" ref={countRef}>
      <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-700 text-sm sm:text-base">{label}</p>
    </div>
  );
};

const NhccPage = () => {
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

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Add state for contact form
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(contactForm);
      setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (err) {
      // Error toast handled in API
    }
    setSubmitting(false);
  };

  const [hoveredFAQ, setHoveredFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How can I participate in NHCC events?",
      answer: "Anyone can participate in our events! Most of our celebrations are open to the public. For specific events, you may need to register in advance. Check our website or social media for upcoming event details and registration information.",
      bgColor: "bg-blue-500",
      hoverBg: "hover:bg-blue-600",
      borderColor: "border-blue-500",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      question: "Does the NHCC accept volunteers?",
      answer: "Yes, we always welcome volunteers! Whether you're Eritrean or simply interested in Eritrean culture, we have various volunteer opportunities available. Please contact us through our website or email to learn more about current volunteer needs.",
      bgColor: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      borderColor: "border-green-500",
      textColor: "text-green-600"
    },
    {
      id: 3,
      question: "When is the annual Eritrean Festival held?",
      answer: "The annual Eritrean Festival in Scandinavia typically takes place during the summer months (July-August). The exact dates vary each year, so please check our official announcements for the current year's schedule.",
      bgColor: "bg-purple-500",
      hoverBg: "hover:bg-purple-600",
      borderColor: "border-purple-500",
      textColor: "text-purple-600"
    },
    {
      id: 4,
      question: "Can non-Eritreans join the celebrations?",
      answer: "Absolutely! Our events are open to everyone interested in Eritrean culture. We welcome friends from all backgrounds and encourage cultural exchange and understanding.",
      bgColor: "bg-yellow-500",
      hoverBg: "hover:bg-yellow-600",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-600"
    }
  ];

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const eventsPerPage = 2;
  const { getEvents } = useEventServices();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await getEvents({
          page: currentPage,
          limit: eventsPerPage,
          isActive: true,
          sort: 'date:asc' // Sort by date ascending (upcoming events first)
        });
        
        // Check if response has the correct structure
        if (response.data && response.data.events) {
          setEvents(response.data.events);
          
          // Get pagination info
          if (response.data.pagination) {
            setTotalPages(response.data.pagination.pages);
          } else {
            setTotalPages(Math.ceil(response.data.events.length / eventsPerPage));
          }
        } else {
          console.error('Unexpected API response structure:', response);
          setEvents([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]); // Remove getEvents from dependency array

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await subscribeToNewsletter(email);
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* <Slider /> */}
      <FeaturesSlider />

      {/* Hero Section */}
      {/* <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden"> */}
      {/* <div className="absolute inset-0 bg-blue-900/80 z-10"></div> */}
      {/* <img 
          src="/images/newImages/IMG_6851.JPG" 
          alt="NHCC Festival" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <span className="bg-yellow-400 text-blue-900 px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4" data-aos="fade-down">
            <FaGlobe className="inline mr-1 sm:mr-2" /> Eritrean Community
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4" data-aos="fade-up">
            The Eritrean National Holidays<br />Coordinating Committee
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl px-2" data-aos="fade-up" data-aos-delay="100">
            Preserving culture, celebrating heritage, and building community since 1998
          </p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="relative">
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-yellow-400 rounded-lg"></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl">
                    <ImagePreview
                      src="https://nchs-fe.vercel.app/images/newImages/WhatsApp Image 2025-06-11 at 23.22.31.jpeg"
                      alt="NHCC Celebration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
                  <FaHistory className="text-blue-500 mr-2 sm:mr-3" /> Introduction
                </h2>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                    Celebrating our national holidays and festivals is a tradition that was developed during the war for liberation.
                    Thus, "Festival" in the Eritrean context has a deep historical meaning. For example during the long and bitter
                    struggle years, Eritreans from all over the world gathered every summer in the city of Bologna, Italy for a
                    week long celebration which included seminars, folklore events, exhibitions and sports activities. Today, this
                    tradition continues even after Liberation both inside and outside Eritrea.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    That our national holidays and festivals should be well organized both in content and style, it was imperative
                    to have well defined goals and a committee which could shoulder the responsibility to motivate and engage all
                    Eritreans in the region. Thus, the Eritrean National Holidays Coordinating Committee (NHCC) was formed in 1998.
                    What started as a modest endeavor in the Stockholm area has today grown to encompass most major cities in Scandinavia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Timeline */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-900 flex items-center justify-center">
              <FaLandmark className="text-green-600 mr-2 sm:mr-3" /> Our Journey
            </h2>

            <div className="relative border-l-2 sm:border-l-4 border-green-500 pl-4 sm:pl-8 py-2 sm:py-4 ml-2 sm:ml-4 space-y-6 sm:space-y-8">
              <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full -ml-1.5 sm:-ml-2"></div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                {/* <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-7 sm:-ml-10"></div> */}
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">1998: Foundation</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  The Eritrean National Holidays Coordinating Committee (NHCC) was established to organize national celebrations
                  and preserve cultural heritage among the Eritrean diaspora in Scandinavia.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full -ml-7 sm:-ml-10"></div>
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">2000-2010: Growth Period</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  During this decade, the committee expanded its reach beyond Stockholm to include other major cities in Sweden.
                  The annual festival grew in size and significance, becoming a cornerstone event for the Eritrean community.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full -ml-7 sm:-ml-10"></div>
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">2010-Present: Scandinavian Expansion</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  The NHCC evolved into a pan-Scandinavian organization, coordinating events across Sweden, Norway, and Denmark.
                  Today, it serves as the primary cultural bridge between Eritrean communities throughout the Nordic region.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full -ml-1.5 sm:-ml-2"></div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
              <FaFlag className="text-red-500 mr-2 sm:mr-3" /> Our Mission
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                The NHCC's mission is to organize the following main Eritrean anniversaries and events:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaFlag className="text-blue-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-blue-900">Eritrean Independence Day</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Celebrating May 24th, the day Eritrea gained its independence in 1991 after a 30-year struggle.
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-red-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <FaFlag className="text-red-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-blue-900">Eritrean Martyr's Day</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Commemorating June 20th, honoring those who sacrificed their lives for Eritrea's freedom.
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FaHistory className="text-green-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-blue-900">September One</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Marking the beginning of the armed struggle for Liberation on September 1, 1961.
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-500">
                  <div className="flex items-center mb-2">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <FaUsers className="text-yellow-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-blue-900">Eritrean Festival in Scandinavia</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Annual cultural celebration bringing together Eritreans from across Scandinavia.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Additional Activities</h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  Beyond these major events, the NHCC also organizes:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Cultural workshops and educational seminars
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Youth development programs
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Community outreach initiatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Fundraising events for community development projects
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Objectives Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <FaLandmark className="text-purple-500 mr-2 sm:mr-3" /> Our Objectives
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: "Broad Participation",
                  description: "Ensure broad participation by all Eritreans and Friends of Eritrea in cultural and national events.",
                  icon: <FaUsers className="text-2xl sm:text-3xl text-blue-500" />,
                  color: "blue"
                },
                {
                  title: "Cultural Preservation",
                  description: "Preservation of Eritrean Identity, Culture and Heritage for current and future generations.",
                  icon: <FaGlobe className="text-2xl sm:text-3xl text-green-500" />,
                  color: "green"
                },
                {
                  title: "Fostering Nationalism",
                  description: "Fostering Eritrean nationalism and bequeath it to coming generations through education and events.",
                  icon: <FaFlag className="text-2xl sm:text-3xl text-red-500" />,
                  color: "red"
                },
                {
                  title: "Community Development",
                  description: "Enhancing and developing a vibrant and well organized Community across Scandinavia.",
                  icon: <FaHandshake className="text-2xl sm:text-3xl text-yellow-500" />,
                  color: "yellow"
                },
                {
                  title: "Positive Image",
                  description: "Profiling a good Eritrean image, tradition and history within the broader Scandinavian society.",
                  icon: <FaGlobe className="text-2xl sm:text-3xl text-indigo-500" />,
                  color: "#6664f2"
                },
                {
                  title: "Diaspora Engagement",
                  description: "Motivate and strengthen Eritreans in the Diaspora to be engaged in national issues.",
                  icon: <FaUsers className="text-2xl sm:text-3xl text-purple-500" />,
                  color: "purple"
                },
                {
                  title: "Fundraising",
                  description: "Raise funds to benefit community development projects both in Scandinavia and Eritrea.",
                  icon: <FaHandshake className="text-2xl sm:text-3xl text-teal-500" />,
                  color: "#20b3a5"
                },
                {
                  title: "Youth Empowerment",
                  description: "Empower the next generation of Eritrean-Scandinavians to connect with their heritage.",
                  icon: <FaUsers className="text-2xl sm:text-3xl text-orange-500" />,
                  color: "#f87314"
                }
              ].map((objective, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-${objective.color}-500 flex flex-col items-center text-center`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className={`bg-${objective.color}-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4`}>
                    {objective.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">{objective.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{objective.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structure and Organization */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
              <FaUsers className="text-blue-500 mr-2 sm:mr-3" /> Structure and Organization
            </h2>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Committee Structure</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    The NHCC operates with a democratic structure consisting of:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm sm:text-base mb-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Executive Committee:</strong> <span className='text-right'>Elected leadership responsible for overall direction</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Regional Representatives:</strong> <span className='text-right'>Coordinators from different cities</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>Specialized Teams:</strong> <span className='text-right'>Focus on specific events or functions</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><strong>General Assembly:</strong> <span className='text-right'>All participating organizations and members</span></span>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="relative h-48 sm:h-64 mb-4">
                    <ImagePreview
                      src="https://nchs-fe.vercel.app/images/newImages/image.png"
                      alt="NHCC Committee Meeting"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-base sm:text-lg">Committee Meeting</h3>
                      <p className="text-xs sm:text-sm">Planning session for upcoming events</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base">
                    The committee meets regularly to plan events, coordinate activities, and ensure the successful
                    execution of all national celebrations. Decisions are made democratically with input from all
                    member organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements and Impact */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <FaLandmark className="text-green-500 mr-2 sm:mr-3" /> Achievements and Impact
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {/* Animated statistic cards */}
                <CountUpCard endValue={25} suffix="+" label="Years of Service" />
                <CountUpCard endValue={30} suffix="K+" label="Annual Festival Attendees" />
                <CountUpCard endValue={45} suffix="+" label="Member Organizations" />
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Key Accomplishments</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                      <FaFlag className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Cultural Preservation</h4>
                      <p className="text-gray-700 text-sm">
                        Successfully maintained Eritrean cultural traditions among second and third generation
                        Eritrean-Scandinavians, ensuring cultural continuity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <FaUsers className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Community Building</h4>
                      <p className="text-gray-700 text-sm">
                        Created a strong network of Eritrean communities across Scandinavia, fostering
                        cooperation and mutual support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                      <FaHandshake className="text-purple-600 text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Cross-Cultural Exchange</h4>
                      <p className="text-gray-700 text-sm">
                        Facilitated meaningful cultural exchange between Eritrean communities and broader
                        Scandinavian society through public events and collaborations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3 mt-1">
                      <FaGlobe className="text-yellow-600 text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Youth Engagement</h4>
                      <p className="text-gray-700 text-sm">
                        Developed successful programs to engage Eritrean youth in cultural activities,
                        ensuring the passing of traditions to new generations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Get Involved Section */}
          <div className="mb-12 sm:mb-16 bg-gradient-to-br from-blue-800 to-blue-900 text-white p-4 sm:p-8 rounded-lg shadow-lg relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-yellow-400 rounded-full opacity-10 -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-blue-400 rounded-full opacity-10 -ml-16 sm:-ml-32 -mb-16 sm:-mb-32"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Get Involved</h2>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-3">Join Our Community</h3>
                  <p className="text-blue-100 text-sm sm:text-base mb-4 md:mb-0">
                    There are many ways to participate in NHCC activities and contribute to the Eritrean community:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base mb-4">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Volunteer at events and festivals
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Join a planning committee
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Represent your local Eritrean organization
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Share your skills and expertise
                    </li>
                  </ul>
                  <button className="px-4 sm:px-6 py-2 mt-4 sm:py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform text-sm sm:text-base">
                    <a href="mailto:nhccsweden@gmail.com">
                      Become a Volunteer
                    </a>
                  </button>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-3">Upcoming Events</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                      </div>
                    ) : events.length > 0 ? (
                      events.map((event) => (
                        <div key={event.id} className="bg-blue-700/50 p-3 sm:p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-yellow-400 mr-2" />
                            <h4 className="font-semibold">{event.title}</h4>
                          </div>
                          <p className="text-sm text-blue-100 mb-1">
                            {format(new Date(event.date), 'MMMM d, yyyy')} | {event.isOnline ? 'Online' : event.location}
                          </p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-blue-700/50 p-3 sm:p-4 rounded-lg">
                        <p className="text-center text-sm">No upcoming events at this time.</p>
                      </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-4">
                        <button 
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-1 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-400 hover:bg-blue-800'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                              ${currentPage === index + 1 
                                ? 'bg-yellow-400 text-blue-900' 
                                : 'text-white hover:bg-blue-800'}`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-1 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-400 hover:bg-blue-800'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
              <MapPin className="text-red-500 mr-2 sm:mr-3" /> Contact Us
            </h2>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                {/* Left Section - Contact Info & Map */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Get in Touch</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Have questions about our events or want to get involved? Reach out to us through any of the following channels:
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <MapPin className="text-blue-600 text-sm w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Address</h4>
                        <p className="text-gray-700 text-sm">
                          Eritrean Cultural Center<br />
                          Stockholm, Sweden
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                        <Globe className="text-green-600 text-sm w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Email</h4>
                        <p className="text-gray-700 text-sm">
                          <a href="mailto:nhccsweden@gmail.com" className="hover:text-blue-600 transition-colors">nhccsweden@gmail.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3 mt-1">
                        <Users className="text-yellow-600 text-sm w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Social Media</h4>
                        <p className="text-gray-700 text-sm">
                          Follow us on social media for the latest updates and event announcements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mini Map */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <MapPin className="text-red-500 w-6 h-6" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                        <p className="text-sm font-medium">Stockholm, Sweden</p>
                        <p className="text-xs opacity-90">Eritrean Cultural Center</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Contact Form */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-lg border border-gray-100 h-full">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-6">Send a Message</h3>
                    <div className="space-y-6">
                      {/* Name Fields */}
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name*
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={contactForm.firstName}
                              onChange={handleContactChange}
                              className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-400"
                              placeholder="Enter First Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name*
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={contactForm.lastName}
                              onChange={handleContactChange}
                              className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-400"
                              placeholder="Enter Last Name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email and Phone */}
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email*
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={contactForm.email}
                              onChange={handleContactChange}
                              className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-400"
                              placeholder="Enter Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number*
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={contactForm.phone}
                              onChange={handleContactChange}
                              className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-400"
                              placeholder="Enter Phone Number"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message*
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                          <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={contactForm.message}
                            onChange={handleContactChange}
                            className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-400 resize-none"
                            placeholder="Enter Message"
                            required
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleContactSubmit}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mb-12 sm:mb-16 bg-gradient-to-r from-blue-500 to-blue-700 p-4 sm:p-8 rounded-lg shadow-lg text-white" data-aos="fade-up">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-100 text-sm sm:text-base mb-4 md:mb-0">
                  Subscribe to our newsletter to receive updates about upcoming events, community news, and cultural activities.
                </p>
              </div>

              <div className="w-full max-w-md mx-auto">
                {/* Desktop/Tablet Layout - Side by side */}
                <form onSubmit={handleNewsletterSubmit} className="hidden sm:flex">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 rounded-l-md focus:outline-none text-gray-800 border border-gray-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-r-md transition-colors whitespace-nowrap ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>

                {/* Mobile Layout - Stacked vertically */}
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2 sm:hidden">
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-md focus:outline-none text-gray-800 border border-gray-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-md transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className="text-xs text-blue-100 mt-2 text-center sm:text-left">
                  By subscribing, you consent to our Privacy Policy and receiving updates.
                </p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <FaGlobe className="text-blue-500 mr-2 sm:mr-3" /> Photo Gallery
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
              {[
                "https://nchs-fe.vercel.app/images/nhcc-page/DSC_6951.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_1523.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_4205.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_8139.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_8296-001.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_9449.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_9456.JPG",
                "https://nchs-fe.vercel.app/images/nhcc-page/IMG_9561.JPG"
              ].map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <ImagePreview
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-medium text-sm sm:text-base">View Image</span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <HelpCircle className="text-yellow-500 mr-2 sm:mr-3" /> Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => {
                const isHovered = hoveredFAQ === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer
                      ${isHovered ? 'shadow-xl transform -translate-y-1' : 'hover:shadow-lg'}
                      border-l-4 ${faq.borderColor}`}
                    onMouseEnter={() => setHoveredFAQ(faq.id)}
                    onMouseLeave={() => setHoveredFAQ(null)}
                    // data-aos="fade-up"
                    data-aos-delay={faq.id * 50}
                  >
                    {/* Header */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`p-2 sm:p-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 
                            ${faq.bgColor} ${faq.hoverBg} ${isHovered ? 'scale-110' : ''}`}>
                            <HelpCircle className="text-white text-lg sm:text-xl" />
                          </div>
                          <h3 className={`font-bold text-lg sm:text-xl text-blue-800 transition-colors duration-300
                            ${isHovered ? faq.textColor : ''} pr-4`}>
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-300 ${faq.textColor} flex-shrink-0
                            ${isHovered ? 'rotate-180' : ''}`}
                          size={24}
                        />
                      </div>
                    </div>

                    {/* Dropdown Content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out
                      ${isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 ${faq.borderColor} 
                        bg-gradient-to-r from-gray-50 to-white`}>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className={`mt-3 inline-flex items-center text-sm font-medium 
                          ${faq.textColor} group`}>
                          More details
                          <ChevronDown className="ml-1 w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <GoToTop />

      <Footer />
    </div>
  );
};

export default NhccPage;