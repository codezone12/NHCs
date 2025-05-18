import React, { useEffect, useState, useRef } from 'react';
import ImagePreview from './../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHandshake, FaGlobe, FaMusic, FaChild, FaBook, FaComments, FaHeart, FaLightbulb, FaUniversity, FaTheaterMasks, FaUtensils, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

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
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden" ref={sliderRef}>
        <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
        
        {/* Slider Images */}
        <div className="relative h-full w-full">
          {festivalImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image}
                alt={`Festival Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {festivalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-medium mb-4" data-aos="fade-down">
            <FaGlobe className="inline mr-2" /> Cultural Event
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Eritreanska Kulturfestivalen
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
            En årlig kulturfestival som förenar generationer och stärker kulturell identitet
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center text-white bg-blue-800/50 px-4 py-2 rounded-lg">
              <FaCalendarAlt className="mr-2" />
              <span>28–31 juli</span>
            </div>
            <div className="flex items-center text-white bg-blue-800/50 px-4 py-2 rounded-lg">
              <FaMapMarkerAlt className="mr-2" />
              <span>Eggebygård, Järvafältet</span>
            </div>
            <div className="flex items-center text-white bg-blue-800/50 px-4 py-2 rounded-lg">
              <FaUsers className="mr-2" />
              <span>10,000+ besökare</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction - Unique design with side image */}
          <div className="mb-16" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-yellow-400 rounded-lg"></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl">
                    <ImagePreview 
                      src="/images/newImages/IMG_6640.JPG"
                      alt="Festival Celebration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
                  <FaHeart className="text-red-500 mr-3" /> Om Kulturfestivalen
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Den eritreanska festivalen i Stockholm är en årlig kulturfestival som i år kommer att hållas för
                    25:e gången, 28–31 juli vid Eggebygård vid Järvafältet. Festivalen är den största eritreanska
                    kulturfestival i Sverige med över 10 000 besökare årligen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Det är en familjefestival där barn och ungdomar med eritreanskt påbrå från hela Sverige får möjlighet att lära känna varandra och känna stolthet över sin identitet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Section - Unique card design */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaUniversity className="text-blue-600 mr-3" /> Föreningarna Bakom Festivalen
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Festivalen arrangeras av den eritreanska festivalkommittén, National
                    Holiday Coordinating Committee (NHCC), som består av ett råd och en styrelse. Rådet består av
                    45 personer, som representerar nio olika eritreanska föreningar i Stockholm.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I rådet ingår även representanter för flera
                    andra svenska städer, bl.a. Uppsala, Västerås, Eskilstuna, Örebro, Umeå och Göteborg. Eftersom
                    festivalen vuxit till att bli ett skandinaviskt evenemang är även eritreanska föreningar från Norge
                    och Danmark representerade.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="grid grid-cols-3 gap-2">
                    {['Husby-Kista', 'Rinkeby', 'Tensta-Hjulsta', 'Hässelby', 'Södra Stockholm', 'Sydvästra', 'Sundbyberg', 'Solna-Nacka', 'EKF'].map((org, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-3 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
                      >
                        <span className="text-blue-800 font-medium text-sm">{org}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Facts Section - Unique icon cards */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaLightbulb className="text-yellow-500 mr-3" /> Festivalens Höjdpunkter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-aos="fade-right">
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-3 rounded-full mr-4">
                    <FaGlobe className="text-blue-900 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-3 text-blue-900">25 År av Kulturarv</h3>
                    <p className="text-gray-600">
                      Eritrea Festival har sedan starten 1998 vuxit från en lokal Stockholm evenemang till en
                      nordisk och europeisk händelse. Den har satt Järva och Stockholm på kartan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-aos="fade-left">
                <div className="flex items-start">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-3 text-blue-900">10,000+ Besökare</h3>
                    <p className="text-gray-600">
                      Kulturfestivalen lockar flera tusen besökare årligen från hela Skandinavien, vilket gör den till den största eritreanska kulturfestivalen i Sverige.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-aos="fade-right">
                <div className="flex items-start">
                  <div className="bg-green-500 p-3 rounded-full mr-4">
                    <FaHandshake className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-3 text-blue-900">70+ Föreningar</h3>
                    <p className="text-gray-600">
                      Mer än 70 olika föreningar från olika delar av Sverige deltar i förberedelserna och genomförandet av festivalen.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-aos="fade-left">
                <div className="flex items-start">
                  <div className="bg-purple-500 p-3 rounded-full mr-4">
                    <FaHeart className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-3 text-blue-900">Helt Ideellt Arbete</h3>
                    <p className="text-gray-600">
                      Festivalen bedrivs ideellt utan vinstintresse och förlitar sig på frivillig arbetskraft och ekonomiska bidrag från medverkande föreningar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purpose and Economy Section - Unique quote design */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
              <FaLightbulb className="text-yellow-500 mr-3" /> Syfte och ekonomi
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <div className="absolute -bottom-10 -right-10 text-blue-100 opacity-20">
                <FaQuoteRight className="text-9xl" />
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                Syftet med festivalen är att förstärka sammanhållning bland svenska-eritreaner samt att
                upprätthålla länk med ursprungslandet Eritrea. I skrivande stund håller mer än 70 olika föreningar
                från olika delar av Sverige för fullt med förberedelser inför festivalen.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Att ordna en festival av den här storleken kostar pengar och festivalen bedrivs ideellt utan någon
                som helst vinstintresse. Arrangören NHCC förlitar sig på att medverkande föreningar bidrar med
                såväl frivillig arbetskraft samt ekonomiska medel.
              </p>
              
              <div className="my-8 flex">
                <div className="text-yellow-500 mr-4">
                  <FaQuoteLeft className="text-4xl" />
                </div>
                <blockquote className="italic text-gray-700 text-lg">
                  Det är tack vare de hundratals eldsjälar och kreativa föreningsmedlemmar som festivalen kan fortsätta arrangeras trots de stora ekonomiska och logistiska utmaningarna.
                </blockquote>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Det är en folkrörelse i ordets sanna bemärkelse som står bakom festivalen
                varför festivalen är en familjefestival där tre generationer av svenska-eritreaner möts och ta del av
                varandras erfarenhet av vad det innebär att vara invandrare i Sverige.
              </p>
            </div>
          </div>

          {/* Image Gallery Section - Unique overlapping design */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaTheaterMasks className="text-purple-500 mr-3" /> Festivalens Aktiviteter
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-center max-w-3xl mx-auto">
              Festivalprogrammet är omfattande och innehåller en lång rad kulturella inslag, seminarier, debatter, aktiviteter för barn och ungdomar, kulturshower med artister från Eritrea och diasporan.
            </p>
            
            <div className="relative h-[500px] mb-12">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 z-10" data-aos="fade-right" data-aos-delay="100">
                <div className="w-full h-full p-3 bg-white shadow-lg rounded-lg">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <ImagePreview 
                      src="/images/newImages/IMG_6851.JPG"
                      alt="Kulturella aktiviteter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 z-20" data-aos="fade-left" data-aos-delay="300">
                <div className="w-full h-full p-3 bg-white shadow-lg rounded-lg">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-blue-100 rounded-full">
                    <FaMusic className="text-blue-600 text-2xl" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Kulturella Uppträdanden</h3>
                <p className="text-gray-600 text-sm">
                  Sverige- och Europabaserade musikgrupper bjuder till musik och dans. Festivalen är särskilt känd för att ta hit populära artister från Eritrea.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-yellow-100 rounded-full">
                    <FaChild className="text-yellow-600 text-2xl" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Aktiviteter för Barn</h3>
                <p className="text-gray-600 text-sm">
                  Barnen uppskattar den årligen återkommande populära artisten Tekle Clown som underhåller dem i fyra dagar. Barnen har dessutom eget aktivitetstält samt karusell och lekpark.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="300">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-green-100 rounded-full">
                    <FaBook className="text-green-600 text-2xl" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Seminarier och Föreläsningar</h3>
                <p className="text-gray-600 text-sm">
                  Kulturfestivalen har i sitt program alltid inslag av samhällsinformation och samhällsengagerade ämnen genom att inbjuda föreläsare.
                </p>
              </div>
            </div>
          </div>

          {/* Participating Organizations - Unique hexagon grid */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaGlobe className="text-green-500 mr-3" /> Deltagande Organisationer
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Festivalen som i början arrangerades av eritreanska föreningar i Järva området, har de senaste åren blivit
                    mångsidig och har inkluderat fler föreningar från andra delar av Stockholmregion och i landet.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    I år deltog föreningar från Göteborg, Motala, Skellefteå, Västerås, Örebro. Även föreningar från Norge och Danmark
                    hade egna tält.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64">
                    <ImagePreview 
                      src="/images/newImages/IMG_7246.JPG"
                      alt="Participating Organizations"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg">Internationellt Samarbete</h3>
                      <p className="text-sm">Föreningar från Sverige, Norge och Danmark samarbetar för att skapa en unik kulturupplevelse</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Events Section - Unique timeline design */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
              <FaTheaterMasks className="text-purple-500 mr-3" /> Bred och engagerande kulturevenemang
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Kulturfestivalen lockar flera tusen besökare årligen. Sverige- och Europabaserade musikgrupper bjuder
                till musik och dans. Den är dock speciellt känd för att ta hit populära artister från Eritrea. I år fanns en
                kulturgrupp från Eritrea bestående av 9 personer som satte folk på dansande fötter i 4 dagar.
              </p>
              
              <div className="relative border-l-4 border-blue-500 pl-8 py-4 ml-4 space-y-8 before:content-[''] before:absolute before:top-0 before:left-0 before:w-4 before:h-4 before:bg-blue-500 before:rounded-full before:-ml-2">
                <div className="relative" data-aos="fade-left">
                  <div className="absolute -left-10 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Litteratur & Konst</h3>
                  <p className="text-gray-700">Presentation av nyutgivna böcker där 4 författare fick presentera sina verk</p>
                </div>
                <div className="relative" data-aos="fade-left" data-aos-delay="100">
                  <div className="absolute -left-10 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Teater & Drama</h3>
                  <p className="text-gray-700">En dramapjäs av en erkänd författare och skådespelare iscensattes</p>
                </div>
                <div className="relative" data-aos="fade-left" data-aos-delay="200">
                  <div className="absolute -left-10 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Utställningar</h3>
                  <p className="text-gray-700">Konstutställning samt fotoutställning av journalisten Donald Boström</p>
                </div>
                <div className="relative" data-aos="fade-left" data-aos-delay="300">
                  <div className="absolute -left-10 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Föreläsningar</h3>
                  <p className="text-gray-700">Föreläsningar om samhällsinformation och hälsa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Section - Unique wave design */}
          <div className="mb-16 relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 -ml-32 -mb-32"></div>
            
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-8 rounded-lg shadow-lg relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                    <FaHandshake className="text-9xl text-yellow-400 relative z-10" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">En fredlig festival som drivs av volontärer</h2>
                  <p className="mb-4">
                    Eritrea kulturfestival drivs av frivilligt engagerade funktionärer och ideella föreningar. Utan alla dessa
                    människor som oavlönat ställer upp skulle vi inte kunna genomföra festivalen i åratal. Det är glädjande
                    att se en ny generation av ungdomar engagerar sig och ta över rodret.
                  </p>
                  <p>
                    Vi är stolta över att vi under alla åren kunnat genomföra festivalen utan några incidenter. Vi har
                    professionella vakter som sköter sitt uppdrag utmärkt. Vi uppskattar Polismyndigheten och Dialogpolisen
                    för ett mycket gott samarbete.
                  </p>
                  <button className="mt-6 px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform flex items-center">
                    <FaHeart className="mr-2" /> Bli Volontär
                  </button>
                </div>
              </div>
            </div>
            </div>

{/* Testimonials Section - Carousel */}
<div className="mb-16" data-aos="fade-up">
  <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
    <FaComments className="text-indigo-500 mr-3" /> Röster från Besökare
  </h2>
  
  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg shadow-md">
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-4/5 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="md:w-1/4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-indigo-100">
                <ImagePreview 
                  src="/images/newImages/IMG_8845.JPG"
                  alt="Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <div className="text-indigo-400 mb-2">
                <FaQuoteLeft className="inline text-xl" />
              </div>
              <p className="text-gray-700 italic mb-4">
                Festivalen är en fantastisk möjlighet för mina barn att lära känna sin kulturella bakgrund. 
                Det är en plats där tre generationer möts och delar erfarenheter. Vi ser fram emot det varje år!
              </p>
              <div className="font-semibold text-blue-900">Maria Tesfay</div>
              <div className="text-sm text-gray-500">Besökare sedan 2010</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-blue-200'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

{/* Photo Gallery */}
<div className="mb-16" data-aos="fade-up">
  <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
    <FaTheaterMasks className="text-green-500 mr-3" /> Bildgalleri
  </h2>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      "/images/newImages/IMG_6640.JPG",
      "/images/newImages/IMG_6851.JPG",
      "/images/newImages/IMG_4818.JPG",
      "/images/newImages/IMG_7246.JPG",
      "/images/newImages/IMG_8845.JPG",
      "/images/newImages/Highres-Independence_party_portrait_2015-05-30-0256.jpg",
      "/images/newImages/IMG_6851.JPG",
      "/images/newImages/IMG_4818.JPG"
    ].map((image, index) => (
      <div 
        key={index} 
        className={`overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
          index === 0 ? 'col-span-2 row-span-2' : ''
        }`}
        data-aos="zoom-in"
        data-aos-delay={index * 50}
      >
        <div className="relative group h-full">
          <ImagePreview 
            src={image}
            alt={`Festival Gallery Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white text-blue-900 p-2 rounded-full">
              <FaChevronRight className="text-xl" />
            </button>
          </div> */}
        </div>
      </div>
    ))}
  </div>
</div>

{/* Contact & Registration Section */}
<div className="mb-16 bg-white p-8 rounded-lg shadow-md" data-aos="fade-up">
  <div className="flex flex-col md:flex-row gap-8">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
        <FaHeart className="text-red-500 mr-3" /> Bli en del av festivalen
      </h2>
      <p className="text-gray-700 mb-4">
        Vill du vara med och bidra till årets festival? Det finns många sätt att engagera sig - som volontär, 
        utställare eller sponsor. Kontakta oss för mer information.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-blue-900 mb-2">Kontaktuppgifter:</h3>
        <p className="text-gray-700">Email: info@eritreafestival.se</p>
        <p className="text-gray-700">Telefon: 08-123 45 67</p>
      </div>
      <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
        Kontakta oss
      </button>
    </div>
    <div className="md:w-1/2">
      <div className="bg-blue-50 p-6 rounded-lg h-full">
        <h3 className="font-semibold text-xl mb-4 text-blue-900">Kommande evenemang</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-yellow-400 text-blue-900 p-2 rounded-lg mr-4 text-center min-w-[60px]">
              <div className="text-sm font-bold">JUL</div>
              <div className="text-xl font-bold">28</div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Öppningsceremoni</h4>
              <p className="text-sm text-gray-600">Eggebygård, Järvafältet - 14:00</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-400 text-blue-900 p-2 rounded-lg mr-4 text-center min-w-[60px]">
              <div className="text-sm font-bold">JUL</div>
              <div className="text-xl font-bold">29</div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Kulturshow med artister från Eritrea</h4>
              <p className="text-sm text-gray-600">Huvudscenen - 18:00</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-400 text-blue-900 p-2 rounded-lg mr-4 text-center min-w-[60px]">
              <div className="text-sm font-bold">JUL</div>
              <div className="text-xl font-bold">30</div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Seminarier & Workshops</h4>
              <p className="text-sm text-gray-600">Seminarietältet - 13:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Map Section */}
<div className="mb-16" data-aos="fade-up">
  <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
    <FaMapMarkerAlt className="text-red-500 mr-3" /> Hitta till festivalen
  </h2>
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <div className="bg-blue-100 h-[300px] w-full flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-red-500 text-5xl mx-auto mb-4" />
          <p className="text-blue-900 font-medium">Eggebygård, Järvafältet</p>
          <p className="text-gray-600">Karta laddas här</p>
        </div>
      </div>
    </div>
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-2">Vägbeskrivning:</h3>
      <p className="text-gray-700 mb-2">
        <strong>Med kollektivtrafik:</strong> Ta tunnelbana blå linje till Akalla eller Hjulsta. Därifrån går det bussar till Järvafältet.
      </p>
      <p className="text-gray-700">
        <strong>Med bil:</strong> Parkering finns tillgänglig vid Eggebygård. Följ skyltarna från E4/E18.
      </p>
    </div>
  </div>
</div>

{/* Newsletter Signup */}
<div className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-lg shadow-lg text-white" data-aos="fade-up">
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="md:w-2/3">
      <h2 className="text-3xl font-bold mb-4">Håll dig uppdaterad</h2>
      <p className="mb-4">
        Prenumerera på vårt nyhetsbrev för att få de senaste uppdateringarna om festivalen och andra kulturella evenemang.
      </p>
    </div>
    <div className="md:w-1/3 w-full">
      <div className="flex">
        <input 
          type="email" 
          placeholder="Din e-postadress" 
          className="px-4 py-3 rounded-l-lg w-full text-gray-800 focus:outline-none"
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-3 rounded-r-lg transition-colors">
          Prenumerera
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</div>

<Footer />
</div>
);
};

export default SubPage;