import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHandshake, FaGlobe, FaMusic, FaChild, FaBook, FaComments, FaHeart, FaLightbulb, FaUniversity, FaTheaterMasks, FaUtensils, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight, FaUser, FaPhotoVideo, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock components for demonstration
const ImagePreview = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

const Header = () => <div className="h-16 bg-blue-800"></div>;
const Footer = () => <div className="h-32 bg-blue-900"></div>;
const GoToTop = () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full"></div>;
const FeaturesSlider = () => <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">Festival Slider</div>;

// Animated Dropdown Component
const AnimatedDropdown = ({ title, children, icon: Icon, defaultOpen = false, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return 'bg-white shadow-md hover:shadow-lg border-l-4 border-blue-500';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 to-blue-100';
      case 'colored':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-white shadow-md';
    }
  };
  
  return (
    <div className={`rounded-lg transition-all duration-300 ${getVariantStyles()}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-opacity-90 transition-colors rounded-lg"
      >
        <div className="flex items-center">
          {Icon && <Icon className={`mr-3 text-xl ${variant === 'colored' ? 'text-yellow-400' : 'text-blue-600'}`} />}
          <h3 className={`text-lg font-semibold text-left ${variant === 'colored' ? 'text-white' : 'text-blue-900'}`}>
            {title}
          </h3>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <FaChevronDown className={`text-lg ${variant === 'colored' ? 'text-yellow-400' : 'text-blue-600'}`} />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

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
      
      <FeaturesSlider />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction with Animated Dropdown */}
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
                <AnimatedDropdown
                  title="Om Kulturfestivalen"
                  icon={FaHeart}
                  defaultOpen={true}
                  variant="card"
                >
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Den eritreanska festivalen i Stockholm är en årlig kulturfestival som i år kommer att hållas för
                    25:e gången, 28–31 juli vid Eggebygård vid Järvafältet. Festivalen är den största eritreanska
                    kulturfestival i Sverige med över 10 000 besökare årligen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Det är en familjefestival där barn och ungdomar med eritreanskt påbrå från hela Sverige får möjlighet att lära känna varandra och känna stolthet över sin identitet.
                  </p>
                </AnimatedDropdown>
              </div>
            </div>
          </div>

          {/* Organization Section with Animated Dropdown */}
          <div className="mb-16" data-aos="fade-up">
            <AnimatedDropdown
              title="Föreningarna Bakom Festivalen"
              icon={FaUniversity}
              variant="gradient"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Festivalen arrangeras av den eritreanska festivalkommittén, National
                    Holiday Coordinating Committee (NHCC), som består av ett råd och en styrelse. Rådet består av
                    45 personer, som representerar nio olika eritreanska föreningar i Stockholm.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I rådet ingår även representanter för flera
                    andra svenska städer, bl.a. Uppsala, Västerås, Eskilstuna, Örebro, Umeå och Göteborg.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="grid grid-cols-3 gap-2">
                    {['Husby-Kista', 'Rinkeby', 'Tensta-Hjulsta', 'Hässelby', 'Södra Stockholm', 'Sydvästra', 'Sundbyberg', 'Solna-Nacka', 'EKF'].map((org, index) => (
                      <div 
                        key={index} 
                        className="flex justify-center items-center bg-white p-3 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
                      >
                        <span className="text-blue-800 font-medium text-sm">{org}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedDropdown>
          </div>

          {/* Key Facts Section with Multiple Dropdowns */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaLightbulb className="text-yellow-500 mr-3" /> Festivalens Höjdpunkter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedDropdown
                title="25 År av Kulturarv"
                icon={FaGlobe}
                variant="card"
              >
                <p className="text-gray-600">
                  Eritrea Festival har sedan starten 1998 vuxit från en lokal Stockholm evenemang till en
                  nordisk och europeisk händelse. Den har satt Järva och Stockholm på kartan.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="10,000+ Besökare"
                icon={FaUsers}
                variant="card"
              >
                <p className="text-gray-600">
                  Kulturfestivalen lockar flera tusen besökare årligen från hela Skandinavien, vilket gör den till den största eritreanska kulturfestivalen i Sverige.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="70+ Föreningar"
                icon={FaHandshake}
                variant="card"
              >
                <p className="text-gray-600">
                  Mer än 70 olika föreningar från olika delar av Sverige deltar i förberedelserna och genomförandet av festivalen.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Helt Ideellt Arbete"
                icon={FaHeart}
                variant="card"
              >
                <p className="text-gray-600">
                  Festivalen bedrivs ideellt utan vinstintresse och förlitar sig på frivillig arbetskraft och ekonomiska bidrag från medverkande föreningar.
                </p>
              </AnimatedDropdown>
            </div>
          </div>

          {/* Purpose and Economy Section */}
          <div className="mb-16" data-aos="fade-up">
            <AnimatedDropdown
              title="Syfte och ekonomi"
              icon={FaLightbulb}
              variant="card"
              defaultOpen={true}
            >
              <div className="relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 text-blue-100 opacity-20">
                  <FaQuoteRight className="text-9xl" />
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Syftet med festivalen är att förstärka sammanhållning bland svenska-eritreaner samt att
                  upprätthålla länk med ursprungslandet Eritrea. I skrivande stund håller mer än 70 olika föreningar
                  från olika delar av Sverige för fullt med förberedelser inför festivalen.
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
                  varför festivalen är en familjefestival där tre generationer av svenska-eritreaner möts.
                </p>
              </div>
            </AnimatedDropdown>
          </div>

          {/* Activities Section with Dropdowns */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center justify-center">
              <FaTheaterMasks className="text-purple-500 mr-3" /> Festivalens Aktiviteter
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <AnimatedDropdown
                title="Kulturella Uppträdanden"
                icon={FaMusic}
                variant="card"
              >
                <p className="text-gray-600 text-sm">
                  Sverige- och Europabaserade musikgrupper bjuder till musik och dans. Festivalen är särskilt känd för att ta hit populära artister från Eritrea.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Aktiviteter för Barn"
                icon={FaChild}
                variant="card"
              >
                <p className="text-gray-600 text-sm">
                  Barnen uppskattar den årligen återkommande populära artisten Tekle Clown som underhåller dem i fyra dagar. Barnen har dessutom eget aktivitetstält samt karusell och lekpark.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Seminarier och Föreläsningar"
                icon={FaBook}
                variant="card"
              >
                <p className="text-gray-600 text-sm">
                  Kulturfestivalen har i sitt program alltid inslag av samhällsinformation och samhällsengagerade ämnen genom att inbjuda föreläsare.
                </p>
              </AnimatedDropdown>
            </div>
          </div>

          {/* Cultural Events with Timeline Dropdowns */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center">
              <FaTheaterMasks className="text-purple-500 mr-3" /> Bred och engagerande kulturevenemang
            </h2>
            
            <div className="space-y-4">
              <AnimatedDropdown
                title="Litteratur & Konst"
                icon={FaBook}
                variant="card"
              >
                <p className="text-gray-700">
                  Presentation av nyutgivna böcker där 4 författare fick presentera sina verk. Festivalen erbjuder en plattform för nya röster inom eritreansk litteratur.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Teater & Drama"
                icon={FaTheaterMasks}
                variant="card"
              >
                <p className="text-gray-700">
                  En dramapjäs av en erkänd författare och skådespelare iscensattes med deltagande av lokala talanger.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Utställningar"
                icon={FaPhotoVideo}
                variant="card"
              >
                <p className="text-gray-700">
                  Konstutställning samt fotoutställning av journalisten Donald Boström som dokumenterar eritreansk kultur och historia.
                </p>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Föreläsningar"
                icon={FaUsers}
                variant="card"
              >
                <p className="text-gray-700">
                  Föreläsningar om samhällsinformation och hälsa med fokus på integration och kulturell identitet.
                </p>
              </AnimatedDropdown>
            </div>
          </div>

          {/* Volunteer Section */}
          <div className="mb-16 relative overflow-hidden" data-aos="fade-up">
            <AnimatedDropdown
              title="En fredlig festival som drivs av volontärer"
              icon={FaHandshake}
              variant="colored"
              defaultOpen={true}
            >
              <p className="mb-4 text-blue-100">
                Eritrea kulturfestival drivs av frivilligt engagerade funktionärer och ideella föreningar. Utan alla dessa
                människor som oavlönat ställer upp skulle vi inte kunna genomföra festivalen i åratal.
              </p>
              <p className="mb-4 text-blue-100">
                Vi är stolta över att vi under alla åren kunnat genomföra festivalen utan några incidenter. Vi har
                professionella vakter som sköter sitt uppdrag utmärkt.
              </p>
              <button className="mt-4 px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform flex items-center">
                <FaHeart className="mr-2" /> Bli Volontär
              </button>
            </AnimatedDropdown>
          </div>

          {/* Contact Section */}
          <div className="mb-16" data-aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedDropdown
                title="Kontakta oss"
                icon={FaHeart}
                variant="card"
                defaultOpen={true}
              >
                <p className="text-gray-700 mb-4">
                  Vill du vara med och bidra till årets festival? Det finns många sätt att engagera sig.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Kontaktuppgifter:</h3>
                  <p className="text-gray-700">Email: info@eritreafestival.se</p>
                  <p className="text-gray-700">Telefon: 08-123 45 67</p>
                </div>
              </AnimatedDropdown>

              <AnimatedDropdown
                title="Kommande evenemang"
                icon={FaCalendarAlt}
                variant="card"
              >
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
                      <h4 className="font-semibold text-blue-900">Kulturshow</h4>
                      <p className="text-sm text-gray-600">Huvudscenen - 18:00</p>
                    </div>
                  </div>
                </div>
              </AnimatedDropdown>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-16" data-aos="fade-up">
            <AnimatedDropdown
              title="Hitta till festivalen"
              icon={FaMapMarkerAlt}
              variant="card"
            >
              <div className="bg-blue-100 h-[200px] w-full flex items-center justify-center mb-4 rounded-lg">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto mb-2" />
                  <p className="text-blue-900 font-medium">Eggebygård, Järvafältet</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Vägbeskrivning:</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Med kollektivtrafik:</strong> Ta tunnelbana blå linje till Akalla eller Hjulsta.
                </p>
                <p className="text-gray-700">
                  <strong>Med bil:</strong> Parkering finns tillgänglig vid Eggebygård.
                </p>
              </div>
            </AnimatedDropdown>
          </div>
        </div>
      </div>
      
      <GoToTop />
      <Footer />
    </div>
  );
};

export default SubPage;