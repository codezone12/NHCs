import React, { useEffect, useState } from 'react';
import ImagePreview from './../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHandshake } from 'react-icons/fa';

const SubPage = () => {
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
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);

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
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
        <ImagePreview 
          src="/images/newImages/Highres-Independence_party_portrait_2015-05-30-0256.jpg"
          alt="Eritrean Festival"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-medium mb-4" data-aos="fade-down">
            Cultural Event
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Eritreanska Kulturfestivalen
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
            En årlig kulturfestival som förenar generationer och stärker kulturell identitet
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center text-white">
              <FaCalendarAlt className="mr-2" />
              <span>28–31 juli</span>
            </div>
            <div className="flex items-center text-white">
              <FaMapMarkerAlt className="mr-2" />
              <span>Eggebygård, Järvafältet</span>
            </div>
            <div className="flex items-center text-white">
              <FaUsers className="mr-2" />
              <span>10,000+ besökare</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Om Kulturfestivalen och föreningarna bakom festivalen</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Den eritreanska festivalen i Stockholm är en årlig kulturfestival som i år kommer att hållas för
                25:e gången, 28–31 juli vid Eggebygård vid Järvafältet. Festivalen är den största eritreanska
                kulturfestival i Sverige med över 10 000 besökare årligen. Det är en familjefestival där barn och
                ungdomar med eritreanskt påbrå från hela Sverige får möjlighet att lära känna varandra och känna
                stolthet över sin identitet.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Festivalen arrangeras av den eritreanska festivalkommittén, National
                Holiday Coordinating Committee (NHCC), som består av ett råd och en styrelse. Rådet består av
                45 personer, som representerar nio olika eritreanska föreningar i Stockholm, bestående av
                föreningarna i Husby-Kista, Rinkeby, Tensta-Hjulsta, Hässelby-Vällingby, Södra Stockholm,
                Sydvästra Stockholm, Sundbyberg, Solna-Nacka, Eritreanska Kultur Forum (EKF) samt
                eritreanska ungdomsföreningen och kvinnoföreningen.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I rådet ingår även representanter för flera
                andra svenska städer, bl.a. Uppsala, Västerås, Eskilstuna, Örebro, Umeå och Göteborg. Eftersom
                festivalen vuxit till att bli ett skandinaviskt evenemang är även eritreanska föreningar från Norge
                och Danmark representerade. Styrelsen består av nio personer, vilka ansvarar för arbetet inom de
                olika festivalkommittéer och tillhörande utskott.
              </p>
            </div>
          </div>

          {/* Key Facts Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Festivalens Höjdpunkter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400" data-aos="fade-right">
                <h3 className="font-semibold text-xl mb-3">25 År av Kulturarv</h3>
                <p className="text-gray-600">
                  Eritrea Festival har sedan starten 1998 vuxit från en lokal Stockholm evenemang till en
                  nordisk och europeisk händelse. Den har satt Järva och Stockholm på kartan.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500" data-aos="fade-left">
                <h3 className="font-semibold text-xl mb-3">10,000+ Besökare</h3>
                <p className="text-gray-600">
                  Kulturfestivalen lockar flera tusen besökare årligen från hela Skandinavien, vilket gör den till den största eritreanska kulturfestivalen i Sverige.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500" data-aos="fade-right">
                <h3 className="font-semibold text-xl mb-3">70+ Föreningar</h3>
                <p className="text-gray-600">
                  Mer än 70 olika föreningar från olika delar av Sverige deltar i förberedelserna och genomförandet av festivalen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500" data-aos="fade-left">
                <h3 className="font-semibold text-xl mb-3">Helt Ideellt Arbete</h3>
                <p className="text-gray-600">
                  Festivalen bedrivs ideellt utan vinstintresse och förlitar sig på frivillig arbetskraft och ekonomiska bidrag från medverkande föreningar.
                </p>
              </div>
            </div>
          </div>

          {/* Purpose and Economy Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Syfte och ekonomi</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Syftet med festivalen är att förstärka sammanhållning bland svenska-eritreaner samt att
                upprätthålla länk med ursprungslandet Eritrea. I skrivande stund håller mer än 70 olika föreningar
                från olika delar av Sverige för fullt med förberedelser inför festivalen.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Att ordna en festival av den här storleken kostar pengar och festivalen bedrivs ideellt utan någon
                som helst vinstintresse. Arrangören NHCC förlitar sig på att medverkande föreningar bidrar med
                såväl frivillig arbetskraft samt ekonomiska medel. De åren som festivalen går med förlust hjälps
                man åt för att täcka underskottet.
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 my-6">
                "Det är tack vare de hundratals eldsjälar och kreativa föreningsmedlemmar som festivalen kan fortsätta arrangeras trots de stora ekonomiska och logistiska utmaningarna."
              </blockquote>
              <p className="text-gray-700 leading-relaxed">
                Det är en folkrörelse i ordets sanna bemärkelse som står bakom festivalen
                varför festivalen är en familjefestival där tre generationer av svenska-eritreaner möts och ta del av
                varandras erfarenhet av vad det innebär att vara invandrare i Sverige. En festival där man som
                Eritrean inte behöver krympa och skämmas över sin identitet och station i samhället utan kan växa
                som människa och känna stolthet över vem man är.
              </p>
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Festivalens Aktiviteter</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Festivalprogrammet är omfattande och innehåller en lång rad kulturella inslag, seminarier, debatter, aktiviteter för barn och ungdomar, kulturshower med artister från Eritrea och diasporan, sångtävling, idrottstävlingar, tivoli, basar, konst, dans och mat i olika former.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-right">
                <ImagePreview 
                  src="/images/newImages/IMG_6851.JPG"
                  alt="Kulturella aktiviteter"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">Kulturella Uppträdanden</h3>
                  <p className="text-gray-600 text-sm">
                    Sverige- och Europabaserade musikgrupper bjuder till musik och dans. Festivalen är särskilt känd för att ta hit populära artister från Eritrea.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-left">
                <ImagePreview 
                  src="/images/newImages/IMG_4818.JPG"
                  alt="Barn aktiviteter"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">Aktiviteter för Barn</h3>
                  <p className="text-gray-600 text-sm">
                    Barnen uppskattar den årligen återkommande populära artisten Tekle Clown som underhåller dem i fyra dagar. Barnen har dessutom eget aktivitetstält samt karusell och lekpark.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-up">
              <ImagePreview 
                src="/images/newImages/IMG_8845.JPG"
                alt="Seminarier och föreläsningar"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Seminarier och Föreläsningar</h3>
                <p className="text-gray-600 text-sm">
                  Kulturfestivalen har i sitt program alltid inslag av samhällsinformation och samhällsengagerade ämnen genom att inbjuda föreläsare. Det är ett mycket betydelsefullt tillfälle för festivalbesökarna att ha dialog och ställa frågor om sitt ursprungsland Eritrea.
                </p>
              </div>
            </div>
          </div>

          {/* Participating Organizations */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Deltagande Organisationer</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Festivalen som i början arrangerades av eritreanska föreningar i Järva området, har de senaste åren blivit
                mångsidig och har inkluderat fler föreningar från andra delar av Stockholmregion och i landet. I år deltog
                föreningar från Göteborg, Motala, Skellefteå, Västerås, Örebro. Även föreningar från Norge och Danmark
                hade egna tält.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Specialistbutiker från Stockholm erbjöd produkter som normal inte finns i vanliga butiker.
                Alltid uppskattad av kunder, inte minst av de som bor utanför storstäder och har svårigheter att få tag på
                eritreanska produkter.
              </p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Husby-Kista', 'Rinkeby', 'Tensta-Hjulsta', 'Hässelby-Vällingby', 'Södra Stockholm', 'Sydvästra Stockholm', 'Sundbyberg', 'Solna-Nacka', 'EKF'].map((org, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded text-center border border-gray-200">
                    <span className="text-blue-800 font-medium">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cultural Events Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Bred och engagerande kulturevenemang</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Kulturfestivalen lockar flera tusen besökare årligen. Sverige- och Europabaserade musikgrupper bjuder
                till musik och dans. Den är dock speciellt känd för att ta hit populära artister från Eritrea. I år fanns en
                kulturgrupp från Eritrea bestående av 9 personer som satte folk på dansande fötter i 4 dagar.
              </p>
              
              <div className="my-6 p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Kulturella Höjdpunkter</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Presentation av nyutgivna böcker där 4 författare fick presentera sina verk</li>
                  <li>En dramapjäs av en erkänd författare och skådespelare iscensattes</li>
                  <li>Konstutställning samt fotoutställning av journalisten Donald Boström</li>
                  <li>Föreläsningar om samhällsinformation och hälsa</li>
                  <li>Dialog med representanter från Eritrea om landets utvecklingsplaner</li>
                </ul>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                I år hade vi dessutom en mycket uppskattad föreläsning om hjärtinfarkt, symtom och behandling samt
                hur vi förebygger och leva ett hälsosamt liv. En grupp informerande om vikten att aktivt följa
                samhällsutvecklingen som medborgare i Sverige. De berättade speciellt om betydelsen av att få sin röst
                hörd och om hur viktigt det är att gå och rösta.
              </p>
            </div>
          </div>

          {/* Volunteer Section */}
          <div className="mb-12 bg-blue-800 text-white p-8 rounded-lg shadow-lg" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 flex justify-center">
                <FaHandshake className="text-9xl text-yellow-400" />
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
                <button className="mt-6 px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform">
                  Bli Volontär
                </button>
              </div>
            </div>
          </div>

          {/* Community Impact */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Staden bör uppmuntra kulturfestivalen</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Eritreanska kulturfestivalen har i över 20 år varit ett positivt inslag i Järva-området. Många Järva bo som
                exempelvis inte har råd med en semesterresa och inte ens rör sig långt utanför sitt närområde, har i
                åratal sett fram emot Kulturfestivalen som ett evenemang att ta del av utan en större ansträngning.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Följaktligen har innehållet och bredden på festivalprogrammet anpassats under åren, i dialog med de
                samarrangerande föreningar från området.
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 my-6">
                "Eritreanska kulturfestivalen är inte bara musik, dans och mat. Det är också en plats där det förmedlas
                samhällsinformation, skapar samtal och uppmuntrar till positiv engagemang i samhällslivet."
              </blockquote>
              <p className="text-gray-700 leading-relaxed">
                Vi tror starkt att kulturfestivalen bidrar till bättre informerade och välmående medborgare.
                Det är fler liknande aktiviteter Järva området behöver och inte färre!
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Festivalens Framgång</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105" data-aos="zoom-in" data-aos-delay="0">
                <span className="block text-4xl font-bold text-blue-800 mb-2">25</span>
                <span className="text-gray-600">År av tradition</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105" data-aos="zoom-in" data-aos-delay="100">
                <span className="block text-4xl font-bold text-blue-800 mb-2">10k+</span>
                <span className="text-gray-600">Årliga besökare</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105" data-aos="zoom-in" data-aos-delay="200">
                <span className="block text-4xl font-bold text-blue-800 mb-2">70+</span>
                <span className="text-gray-600">Deltagande föreningar</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105" data-aos="zoom-in" data-aos-delay="300">
                <span className="block text-4xl font-bold text-blue-800 mb-2">3</span>
                <span className="text-gray-600">Generationer</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Kontaktuppgifter</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Samordningsgruppen svarar gärna på frågor om hur kulturfestivalen är organiserad och drivs, inklusive
                ekonomi. Vi uppmuntrar allmänheten att ta reda på fakta till skillnad från uppdiktade politiskfärgade
                rykten. Vi inbjuder till samtal och dialog med organisationer, föreningar och personer som vill samarbeta
                och önskar bidra till ett positivt Järva och Stockholm för alla.
              </p>
              
              <div className="flex items-center justify-center my-6">
                <a href="mailto:nhccsweden@gmail.com" className="text-blue-600 text-xl font-medium hover:underline">
                  nhccsweden@gmail.com
                </a>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  <li>
                    Eritreanska kulturfestival i Stockholm anordnas av Samordningsgruppen NHCC. Den startade
                    i Järvaområdet 1998 av några eritreanska föreningar aktiva i stockholmsregionen. De senaste
                    åren har fler föreningar från andra delar av landet men även Danmark och Norge anslutit sig.
                  </li>
                  <li>
                    NHCC är medlem i Eritreanska Riksförbund och har därmed en bred förankring i det
                    eritreanska föreningslivet.
                  </li>
                  <li>
                    Samordningsgruppen NHCC har inte något finansiellbidrag från kommunen för att ordna
                    festivalen eller de övriga två eritreanska högtider som den ansvarar för – Eritreanska
                    Nationaldagen den 24:e maj samt Martyrernas dag 20:e Juni.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Success Story */}
          <div className="mb-12 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Eritrea Festival i Stockholm lockade över 10 000 besökare</h2>
            <p className="text-gray-700 mb-4">
              Eritrea Festival 2022 i Stockholm avlutades som planerat söndagen den 31 juli, 2022.
              Samordningsgruppen (NHCC) berättar den 24:e omgången av kulturfestivalen lockade fler besökare än
              något år tidigare. Eritrea Festival har sedan starten 1998 vuxit från en lokal Stockholm evenemang till en
              nordisk och europeisk händelse.
            </p>
            <blockquote className="italic text-blue-800 my-4">
              "Den har satt Järva och Stockholm på kartan. Vi är mycket glada att vi
              lockat så många besökare och kunnat bidra till ett positivt Järva."
            </blockquote>
            <p className="text-right text-gray-600">— Alem Teklegiorgis, ordförande för samordningsgruppen</p>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-800 text-white p-8 rounded-lg shadow-lg text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Delta i årets festival</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Bli en del av den största eritreanska kulturfestivalen i Sverige. Upplev musik, dans, mat, konst och mycket mer i en familjär atmosfär.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform">
                Registrera dig nu
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                Mer information
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
      
      <Footer />
    </div>
  );
};

export default SubPage;