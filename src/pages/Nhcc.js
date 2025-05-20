import React, { useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaGlobe, FaHandshake, FaFlag, FaHistory, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImagePreview from '../components/image-preview';

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
        <img 
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
      </div>

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
                      src="/images/newImages/IMG_6640.JPG"
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
                    Eritreans in the region. Thus, the Eritrean National Holidays Coordinating Committee (ENHCC) was formed in 1998. 
                    What started as a modest endeavor in the Stockholm area has today grown to encompass most major cities in Scandinavia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Timeline */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <FaLandmark className="text-blue-600 mr-2 sm:mr-3" /> Our Journey
            </h2>
            
            <div className="relative border-l-2 sm:border-l-4 border-blue-500 pl-4 sm:pl-8 py-2 sm:py-4 ml-2 sm:ml-4 space-y-6 sm:space-y-8">
              <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-1.5 sm:-ml-2"></div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-7 sm:-ml-10"></div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">1998: Foundation</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  The Eritrean National Holidays Coordinating Committee (ENHCC) was established to organize national celebrations 
                  and preserve cultural heritage among the Eritrean diaspora in Scandinavia.
                </p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-7 sm:-ml-10"></div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">2000-2010: Growth Period</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  During this decade, the committee expanded its reach beyond Stockholm to include other major cities in Sweden. 
                  The annual festival grew in size and significance, becoming a cornerstone event for the Eritrean community.
                </p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md relative">
                <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-7 sm:-ml-10"></div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">2010-Present: Scandinavian Expansion</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  The ENHCC evolved into a pan-Scandinavian organization, coordinating events across Sweden, Norway, and Denmark. 
                  Today, it serves as the primary cultural bridge between Eritrean communities throughout the Nordic region.
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full -ml-1.5 sm:-ml-2"></div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
              <FaFlag className="text-red-500 mr-2 sm:mr-3" /> Our Mission
            </h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                The ENHCC's mission is to organize the following main Eritrean anniversaries and events:
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
                  Beyond these major events, the ENHCC also organizes:
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
                  color: "indigo"
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
                  color: "teal"
                },
                {
                  title: "Youth Empowerment",
                  description: "Empower the next generation of Eritrean-Scandinavians to connect with their heritage.",
                  icon: <FaUsers className="text-2xl sm:text-3xl text-orange-500" />,
                  color: "orange"
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
                    The ENHCC operates with a democratic structure consisting of:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm sm:text-base mb-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Executive Committee:</strong> Elected leadership responsible for overall direction
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Regional Representatives:</strong> Coordinators from different cities
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Specialized Teams:</strong> Focus on specific events or functions
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>General Assembly:</strong> All participating organizations and members
                    </li>
                  </ul>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="relative h-48 sm:h-64 mb-4">
                    <ImagePreview 
                      src="/images/newImages/IMG_7246.JPG"
                      alt="NHCC Committee Meeting"
                      className="w-full h-full object-cover rounded-lg shadow-md"
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
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">25+</div>
                  <p className="text-gray-700 text-sm sm:text-base">Years of Service</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">10K+</div>
                  <p className="text-gray-700 text-sm sm:text-base">Annual Festival Attendees</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">45+</div>
                  <p className="text-gray-700 text-sm sm:text-base">Member Organizations</p>
                </div>
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
                  <p className="mb-4 text-sm sm:text-base text-blue-100">
                    There are many ways to participate in ENHCC activities and contribute to the Eritrean community:
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
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform text-sm sm:text-base">
                    Become a Volunteer
                  </button>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-3">Upcoming Events</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-blue-700/50 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-yellow-400 mr-2" />
                        <h4 className="font-semibold">Independence Day Celebration</h4>
                      </div>
                      <p className="text-sm text-blue-100 mb-1">May 24, 2023 | Stockholm</p>
                      <p className="text-sm">Annual celebration of Eritrean independence with cultural performances, food, and community activities.</p>
                    </div>
                    
                    <div className="bg-blue-700/50 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-yellow-400 mr-2" />
                        <h4 className="font-semibold">Summer Festival Planning Meeting</h4>
                      </div>
                      <p className="text-sm text-blue-100 mb-1">April 15, 2023 | Online</p>
                      <p className="text-sm">Planning session for the upcoming summer festival. All member organizations are invited to participate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

                    {/* Contact Section */}
                    <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2 sm:mr-3" /> Contact Us
            </h2>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Get in Touch</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Have questions about our events or want to get involved? Reach out to us through any of the following channels:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <FaMapMarkerAlt className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Address</h4>
                        <p className="text-gray-700 text-sm">
                          Eritrean Cultural Center<br />
                          Sveavägen 120<br />
                          113 50 Stockholm, Sweden
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                        <FaGlobe className="text-green-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Email</h4>
                        <p className="text-gray-700 text-sm">
                          info@enhcc.org<br />
                          events@enhcc.org
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3 mt-1">
                        <FaUsers className="text-yellow-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Social Media</h4>
                        <p className="text-gray-700 text-sm">
                          Follow us on social media for the latest updates and event announcements.
                        </p>
                        <div className="flex space-x-3 mt-2">
                          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Facebook</a>
                          <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">Twitter</a>
                          <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Instagram</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-100 p-4 sm:p-6 rounded-lg h-full">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Send a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea 
                          id="message" 
                          rows="4" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="mb-12 sm:mb-16 bg-gradient-to-r from-blue-500 to-blue-700 p-4 sm:p-8 rounded-lg shadow-lg text-white" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-2/3">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-100 text-sm sm:text-base mb-4 md:mb-0">
                  Subscribe to our newsletter to receive updates about upcoming events, community news, and cultural activities.
                </p>
              </div>
              
              <div className="w-full md:w-1/3">
                <div className="flex">
                  <input 
                    type="email" 
                    className="flex-grow px-3 py-2 rounded-l-md focus:outline-none text-gray-800"
                    placeholder="Your email address"
                  />
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-r-md transition-colors">
                    Subscribe
                  </button>
                </div>
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
                "/images/newImages/IMG_6640.JPG",
                "/images/newImages/IMG_6851.JPG",
                "/images/newImages/IMG_7246.JPG",
                "/images/newImages/IMG_4818.JPG",
                "/images/newImages/IMG_6640.JPG",
                "/images/newImages/IMG_6851.JPG",
                "/images/newImages/IMG_7246.JPG",
                "/images/newImages/IMG_4818.JPG"
              ].map((image, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-lg shadow-md aspect-square group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <ImagePreview 
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-medium text-sm sm:text-base">View Image</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
              <FaLandmark className="text-yellow-500 mr-2 sm:mr-3" /> Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "How can I participate in ENHCC events?",
                  answer: "Anyone can participate in our events! Most of our celebrations are open to the public. For specific events, you may need to register in advance. Check our website or social media for upcoming event details and registration information."
                },
                {
                  question: "Does the ENHCC accept volunteers?",
                  answer: "Yes, we always welcome volunteers! Whether you're Eritrean or simply interested in Eritrean culture, we have various volunteer opportunities available. Please contact us through our website or email to learn more about current volunteer needs."
                },
                {
                  question: "When is the annual Eritrean Festival held?",
                  answer: "The annual Eritrean Festival in Scandinavia typically takes place during the summer months (July-August). The exact dates vary each year, so please check our official announcements for the current year's schedule."
                },
                {
                  question: "Can non-Eritreans join the celebrations?",
                  answer: "Absolutely! Our events are open to everyone interested in Eritrean culture. We welcome friends from all backgrounds and encourage cultural exchange and understanding."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NhccPage;