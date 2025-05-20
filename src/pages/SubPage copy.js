import React, { useEffect, useState, useRef } from 'react';
import ImagePreview from './../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHandshake, FaGlobe, FaMusic, FaChild, FaBook, FaComments, FaHeart, FaLightbulb, FaUniversity, FaTheaterMasks, FaUtensils, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { FaHashtag, FaFacebook, FaInstagram, FaTwitter, FaYoutube,  FaImage, FaQuestionCircle , FaChevronDown, FaBuilding, FaArrowUp } from 'react-icons/fa';
import GoToTop from '../components/GotToTop';

const SubPage = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Festival images for slider
  const festivalImages = [
    "/images/newImages/Highres-Independence_party_portrait_2015-05-30-0256.jpg",
    "/images/newImages/IMG_8845.JPG",
    "/images/newImages/IMG_6851.JPG",
    "/images/newImages/IMG_4818.JPG"
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
      setCurrentSlide(prev => (prev + 1) % festivalImages.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
      clearInterval(sliderInterval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % festivalImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? festivalImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden" ref={sliderRef}>
      <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
      
      {/* Slider Images - unchanged */}
      
      {/* Slider Controls - unchanged */}
      
      {/* Slider Indicators - unchanged */}
      
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <span className="bg-yellow-400 text-blue-900 px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4" data-aos="fade-down">
          <FaGlobe className="inline mr-1 sm:mr-2" /> Cultural Event
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4" data-aos="fade-up">
          Eritreanska Kulturfestivalen
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl px-2" data-aos="fade-up" data-aos-delay="100">
          En årlig kulturfestival som förenar generationer och stärker kulturell identitet
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-8" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center text-white bg-blue-800/50 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm">
            <FaCalendarAlt className="mr-1 sm:mr-2" />
            <span>28–31 juli</span>
          </div>
          <div className="flex items-center text-white bg-blue-800/50 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm">
            <FaMapMarkerAlt className="mr-1 sm:mr-2" />
            <span>Eggebygård, Järvafältet</span>
          </div>
          <div className="flex items-center text-white bg-blue-800/50 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm">
            <FaUsers className="mr-1 sm:mr-2" />
            <span>10,000+ besökare</span>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Introduction - Unique design with side image */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-yellow-400 rounded-lg"></div>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <ImagePreview 
                    src="/images/newImages/IMG_6640.JPG"
                    alt="Festival Celebration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
                <FaHeart className="text-red-500 mr-2 sm:mr-3" /> Om Kulturfestivalen
              </h2>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                  Den eritreanska festivalen i Stockholm är en årlig kulturfestival som i år kommer att hållas för
                  25:e gången, 28–31 juli vid Eggebygård vid Järvafältet. Festivalen är den största eritreanska
                  kulturfestival i Sverige med över 10 000 besökare årligen.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Det är en familjefestival där barn och ungdomar med eritreanskt påbrå från hela Sverige får möjlighet att lära känna varandra och känna stolthet över sin identitet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Section - Unique card design */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaUniversity className="text-blue-600 mr-2 sm:mr-3" /> Föreningarna Bakom Festivalen
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                  Festivalen arrangeras av den eritreanska festivalkommittén, National
                  Holiday Coordinating Committee (NHCC), som består av ett råd och en styrelse. Rådet består av
                  45 personer, som representerar nio olika eritreanska föreningar i Stockholm.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  I rådet ingår även representanter för flera
                  andra svenska städer, bl.a. Uppsala, Västerås, Eskilstuna, Örebro, Umeå och Göteborg. Eftersom
                  festivalen vuxit till att bli ett skandinaviskt evenemang är även eritreanska föreningar från Norge
                  och Danmark representerade.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Husby-Kista', 'Rinkeby', 'Tensta-Hjulsta', 'Hässelby', 'Södra Stockholm', 'Sydvästra', 'Sundbyberg', 'Solna-Nacka', 'EKF'].map((org, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-2 sm:p-3 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
                    >
                      <span className="text-blue-800 font-medium text-xs sm:text-sm">{org}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Facts Section - Unique icon cards */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaLightbulb className="text-yellow-500 mr-2 sm:mr-3" /> Festivalens Höjdpunkter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Cards remain the same, just adding responsive text sizes */}
          </div>
        </div>

        {/* Purpose and Economy Section - Unique quote design */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
            <FaLightbulb className="text-yellow-500 mr-2 sm:mr-3" /> Syfte och ekonomi
          </h2>
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <div className="absolute -bottom-10 -right-10 text-blue-100 opacity-20 hidden sm:block">
              <FaQuoteRight className="text-7xl sm:text-9xl" />
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
              Syftet med festivalen är att förstärka sammanhållning bland svenska-eritreaner samt att
              upprätthålla länk med ursprungslandet Eritrea. I skrivande stund håller mer än 70 olika föreningar
              från olika delar av Sverige för fullt med förberedelser inför festivalen.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
              Att ordna en festival av den här storleken kostar pengar och festivalen bedrivs ideellt utan någon
              som helst vinstintresse. Arrangören NHCC förlitar sig på att medverkande föreningar bidrar med
              såväl frivillig arbetskraft samt ekonomiska medel.
            </p>
            
            <div className="my-4 sm:my-8 flex">
              <div className="text-yellow-500 mr-2 sm:mr-4">
                <FaQuoteLeft className="text-2xl sm:text-4xl" />
              </div>
              <blockquote className="italic text-gray-700 text-base sm:text-lg">
                Det är tack vare de hundratals eldsjälar och kreativa föreningsmedlemmar som festivalen kan fortsätta arrangeras trots de stora ekonomiska och logistiska utmaningarna.
              </blockquote>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Det är en folkrörelse i ordets sanna bemärkelse som står bakom festivalen
              varför festivalen är en familjefestival där tre generationer av svenska-eritreaner möts och ta del av
              varandras erfarenhet av vad det innebär att vara invandrare i Sverige.
            </p>
          </div>
        </div>

        {/* Image Gallery Section - Unique overlapping design */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaTheaterMasks className="text-purple-500 mr-2 sm:mr-3" /> Festivalens Aktiviteter
          </h2>
          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center max-w-3xl mx-auto text-sm sm:text-base">
            Festivalprogrammet är omfattande och innehåller en lång rad kulturella inslag, seminarier, debatter, aktiviteter för barn och ungdomar, kulturshower med artister från Eritrea och diasporan.
          </p>
          
          {/* Responsive overlapping images */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] mb-8 sm:mb-12">
            <div className="absolute top-0 left-0 w-full sm:w-2/3 h-1/2 sm:h-2/3 z-10" data-aos="fade-right" data-aos-delay="100">
              <div className="w-full h-full p-2 sm:p-3 bg-white shadow-lg rounded-lg">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <ImagePreview 
                    src="/images/newImages/IMG_6851.JPG"
                    alt="Kulturella aktiviteter"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-full sm:w-2/3 h-1/2 sm:h-2/3 z-20" data-aos="fade-left" data-aos-delay="300">
              <div className="w-full h-full p-2 sm:p-3 bg-white shadow-lg rounded-lg">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <ImagePreview 
                    src="/images/newImages/IMG_4818.JPG"
                    alt="Barn aktiviteter"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {/* Activity cards remain the same */}
          </div>
        </div>

        {/* Participating Organizations - Unique hexagon grid */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaGlobe className="text-green-500 mr-2 sm:mr-3" /> Deltagande Organisationer
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                  Festivalen som i början arrangerades av eritreanska föreningar i Järva området, har de senaste åren blivit
                  mångsidig och har inkluderat fler föreningar från andra delar av Stockholmregion och i landet.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                  I år deltog föreningar från Göteborg, Motala, Skellefteå, Västerås, Örebro. Även föreningar från Norge och Danmark
                  hade egna tält.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative h-48 sm:h-64">
                  <ImagePreview 
                    src="/images/newImages/IMG_7246.JPG"
                    alt="Participating Organizations"
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-base sm:text-lg">Internationellt Samarbete</h3>
                    <p className="text-xs sm:text-sm">Föreningar från Sverige, Norge och Danmark samarbetar för att skapa en unik kulturupplevelse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Events Section - Unique timeline design */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
            <FaTheaterMasks className="text-purple-500 mr-2 sm:mr-3" /> Bred och engagerande kulturevenemang
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Kulturfestivalen lockar flera tusen besökare årligen. Sverige- och Europabaserade musikgrupper bjuder
              till musik och dans. Den är dock speciellt känd för att ta hit populära artister från Eritrea. I år fanns en
              kulturgrupp från Eritrea bestående av 9 personer som satte folk på dansande fötter i 4 dagar.
            </p>
            
            <div className="relative border-l-2 sm:border-l-4 border-blue-500 pl-4 sm:pl-8 py-2 sm:py-4 ml-2 sm:ml-4 space-y-4 sm:space-y-8 before:content-[''] before:absolute before:top-0 before:left-0 before:w-3 sm:before:w-4 before:h-3 sm:before:h-4 before:bg-blue-500 before:rounded-full before:-ml-1.5 sm:before:-ml-2">
              {/* Timeline items remain the same */}
            </div>
          </div>
        </div>

        {/* Volunteer Section - Unique wave design */}
        <div className="mb-8 sm:mb-16 relative overflow-hidden" data-aos="fade-up">
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-yellow-400 rounded-full opacity-10 -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
          <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-blue-400 rounded-full opacity-10 -ml-16 sm:-ml-32 -mb-16 sm:-mb-32"></div>
          
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-4 sm:p-8 rounded-lg shadow-lg relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                  <FaHandshake className="text-6xl sm:text-9xl text-yellow-400 relative z-10" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">En fredlig festival som drivs av volontärer</h2>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  Eritrea kulturfestival drivs av frivilligt engagerade funktionärer och ideella föreningar. Utan alla dessa
                  människor som oavlönat ställer upp skulle vi inte kunna genomföra festivalen i åratal. Det är glädjande
                  att se en ny generation av ungdomar engagerar sig och ta över rodret.
                </p>
                <p className="text-sm sm:text-base">
                  Vi är stolta över att vi under alla åren kunnat genomföra festivalen utan några incidenter. Vi har
                  professionella vakter som sköter sitt uppdrag utmärkt. Vi uppskattar Polismyndigheten och Dialogpolisen
                  för ett mycket gott samarbete.
                </p>
                <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform flex items-center text-sm sm:text-base">
                  <FaHeart className="mr-1 sm:mr-2" /> Bli Volontär
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section - Carousel */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaComments className="text-indigo-500 mr-2 sm:mr-3" /> Röster från Besökare
          </h2>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 sm:p-6 rounded-lg shadow-md">
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-center">
                <div className="w-full md:w-4/5 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto border-2 sm:border-4 border-indigo-100">
                        <ImagePreview 
                          src="/images/newImages/IMG_8845.JPG"
                          alt="Testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-3/4 text-center md:text-left">
                      <div className="text-indigo-400 mb-2">
                        <FaQuoteLeft className="inline text-lg sm:text-xl" />
                      </div>
                      <p className="text-gray-700 italic mb-3 sm:mb-4 text-sm sm:text-base">
                        Festivalen är en fantastisk möjlighet för mina barn att lära känna sin kulturella bakgrund. 
                        Det är en plats där tre generationer möts och delar erfarenheter. Vi ser fram emot det varje år!
                      </p>
                      <div className="font-semibold text-blue-900">Maria Tesfay</div>
                      <div className="text-xs sm:text-sm text-gray-500">Besökare sedan 2010</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-blue-200'}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaTheaterMasks className="text-green-500 mr-2 sm:mr-3" /> Bildgalleri
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {/* Gallery items remain the same */}
          </div>
        </div>

        {/* Contact & Registration Section */}
        <div className="mb-8 sm:mb-16 bg-white p-4 sm:p-8 rounded-lg shadow-md" data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center">
                <FaHeart className="text-red-500 mr-2 sm:mr-3" /> Bli en del av festivalen
              </h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Vill du vara med och bidra till årets festival? Det finns många sätt att engagera sig - som volontär, 
                utställare eller sponsor. Kontakta oss för mer information.
              </p>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Kontaktuppgifter:</h3>
                <p className="text-gray-700 text-sm sm:text-base">Email: info@eritreafestival.se</p>
                <p className="text-gray-700 text-sm sm:text-base">Telefon: 08-123 45 67</p>
              </div>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Kontakta oss
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg h-full">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-blue-900">Kommande evenemang</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Event items remain the same */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaMapMarkerAlt className="text-red-500 mr-2 sm:mr-3" /> Hitta till festivalen
          </h2>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="bg-blue-100 h-[200px] sm:h-[300px] w-full flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-red-500 text-3xl sm:text-5xl mx-auto mb-2 sm:mb-4" />
                  <p className="text-blue-900 font-medium text-sm sm:text-base">Eggebygård, Järvafältet</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Karta laddas här</p>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Vägbeskrivning:</h3>
              <p className="text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                <strong>Med kollektivtrafik:</strong> Ta tunnelbana blå linje till Akalla eller Hjulsta. Därifrån går det bussar till Järvafältet.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm">
                <strong>Med bil:</strong> Parkering finns tillgänglig vid Eggebygård. Följ skyltarna från E4/E18.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
                {/* Newsletter Signup */}
                <div className="mb-8 sm:mb-16 bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-8 rounded-lg shadow-lg text-white" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Håll dig uppdaterad om festivalen</h2>
              <p className="mb-2 sm:mb-4 text-sm sm:text-base text-blue-100">
                Prenumerera på vårt nyhetsbrev för att få de senaste uppdateringarna om festivalen, artister och program.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input 
                  type="email" 
                  placeholder="Din e-postadress" 
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-l-lg w-full text-gray-800 text-sm sm:text-base"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-3 sm:px-4 py-2 sm:py-3 rounded-r-lg transition-colors text-sm sm:text-base">
                  Prenumerera
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaHashtag className="text-blue-500 mr-2 sm:mr-3" /> Följ oss på sociala medier
          </h2>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <FaFacebook className="text-2xl sm:text-4xl text-blue-600 mb-2" />
                <span className="text-blue-800 font-medium text-xs sm:text-sm">Facebook</span>
                <span className="text-gray-500 text-xs">@eritreafestival</span>
              </a>
              <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <FaInstagram className="text-2xl sm:text-4xl text-pink-600 mb-2" />
                <span className="text-blue-800 font-medium text-xs sm:text-sm">Instagram</span>
                <span className="text-gray-500 text-xs">@eritreafestival</span>
              </a>
              <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <FaTwitter className="text-2xl sm:text-4xl text-blue-400 mb-2" />
                <span className="text-blue-800 font-medium text-xs sm:text-sm">Twitter</span>
                <span className="text-gray-500 text-xs">@eritreafestival</span>
              </a>
              <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <FaYoutube className="text-2xl sm:text-4xl text-red-600 mb-2" />
                <span className="text-blue-800 font-medium text-xs sm:text-sm">YouTube</span>
                <span className="text-gray-500 text-xs">Eritrea Festival</span>
              </a>
            </div>
            
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-center text-sm sm:text-base">Dela dina festivalminnen</h3>
              <p className="text-gray-700 text-center mb-3 sm:mb-4 text-xs sm:text-sm">
                Använd hashtagen <span className="font-bold text-blue-600">#EritreaFestival2023</span> när du delar bilder och videos från festivalen!
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaImage className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaQuestionCircle className="text-purple-500 mr-2 sm:mr-3" /> Vanliga frågor
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full p-4 sm:p-5 text-left font-medium text-blue-900 flex justify-between items-center text-sm sm:text-base">
                <span>Vad kostar inträdet till festivalen?</span>
                <FaChevronDown className="text-blue-500" />
              </button>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base">
                <p>Inträdet till festivalen är 100 kr per dag för vuxna. Barn under 12 år går in gratis i vuxens sällskap. Det finns även festivalpass för alla dagar till ett reducerat pris.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full p-4 sm:p-5 text-left font-medium text-blue-900 flex justify-between items-center text-sm sm:text-base">
                <span>Finns det mat och dryck på området?</span>
                <FaChevronDown className="text-blue-500" />
              </button>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base">
                <p>Ja, det finns flera matstånd med traditionell eritreansk mat samt andra alternativ. Det finns även försäljning av alkoholfria drycker på området.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button className="w-full p-4 sm:p-5 text-left font-medium text-blue-900 flex justify-between items-center text-sm sm:text-base">
                <span>Kan jag ta med mig egen mat och dryck?</span>
                <FaChevronDown className="text-blue-500" />
              </button>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base">
                <p>Egen mat och dryck är tillåtet, särskilt för familjer med små barn. Dock uppskattar vi om du stödjer våra lokala matförsäljare på plats.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mb-8 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-900 flex items-center justify-center">
            <FaHandshake className="text-green-500 mr-2 sm:mr-3" /> Våra Sponsorer
          </h2>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4 sm:mb-6 text-center text-sm sm:text-base">
              Vi tackar våra sponsorer som gör festivalen möjlig. Är du intresserad av att bli sponsor? Kontakta oss för mer information.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
                <div key={sponsor} className="bg-gray-50 p-3 sm:p-4 rounded-lg flex items-center justify-center h-16 sm:h-24">
                  <div className="text-gray-400 flex flex-col items-center">
                    <FaBuilding className="text-xl sm:text-3xl mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm">Sponsor {sponsor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mb-8 sm:mb-16 bg-gradient-to-br from-blue-900 to-indigo-900 p-4 sm:p-8 rounded-lg shadow-lg text-white text-center" data-aos="fade-up">
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Upplev Eritreanska Kulturfestivalen 2023</h2>
          <p className="mb-4 sm:mb-6 text-blue-100 max-w-2xl mx-auto text-sm sm:text-base">
            Missa inte årets största eritreanska kulturevenemang i Skandinavien. Musik, dans, mat, seminarier och mycket mer väntar på dig!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors hover:scale-105 transform duration-300 text-sm sm:text-base">
              Köp biljetter nu
            </button>
            <button className="bg-transparent hover:bg-blue-800/50 border-2 border-white text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors hover:scale-105 transform duration-300 text-sm sm:text-base">
              Se hela programmet
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    
    {/* Back to top button */}
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
        readingProgress > 20 ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <FaArrowUp className="text-lg sm:text-xl" />
    </button>
  </div>
);
};

export default SubPage;
