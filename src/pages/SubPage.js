import React, { useEffect } from 'react';
import ImagePreview from './../components/image-preview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SubPage = ({ title = "Sample Page Title", subtitle = "Explore our content" }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      offset: 120,
      delay: 50,
      mirror: true
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
        <Header />
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
        <ImagePreview 
          src="/images/newImages/IMG_8845.JPG"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            {title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl" data-aos="fade-up" data-aos-delay="100">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Introduction</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
              Cras porttitor metus in nibh finibus, vel tempor velit placerat. Vestibulum eu libero vel nisl aliquam 
              cursus. Sed eget semper libero, non aliquam risus.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. 
              Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
            </p>
          </div>

          {/* Image Gallery Section */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-right">
                <ImagePreview 
                  src="/images/newImages/IMG_6851.JPG"
                  alt="Gallery image 1"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">Image Title 1</h3>
                  <p className="text-gray-600 text-sm">Brief description of this beautiful image and what it represents.</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-left">
                <ImagePreview 
                  src="/images/newImages/IMG_4818.JPG"
                  alt="Gallery image 2"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">Image Title 2</h3>
                  <p className="text-gray-600 text-sm">Another description highlighting the importance of this visual element.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md" data-aos="fade-up">
              <ImagePreview 
                src="/images/newImages/Highres-Independence_party_portrait_2015-05-30-0256.jpg"
                alt="Gallery image 3"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Featured Image</h3>
                <p className="text-gray-600 text-sm">This prominent image showcases a key aspect of our community and culture.</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Story</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Alenalki was founded with a clear vision: to create a digital platform that serves as a bridge between 
                Eritreans in the diaspora and their rich cultural heritage. What began as a small initiative has grown 
                into a vibrant community platform that reaches thousands of people worldwide.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our journey has been marked by continuous growth and adaptation. We've expanded our content offerings, 
                improved our technical infrastructure, and built partnerships with key community organizations. Through 
                it all, our commitment to authenticity and quality has remained unwavering.
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 my-6">
                "The strength of our community lies in our shared stories and experiences. Alenalki provides the platform 
                where these stories can be told, preserved, and celebrated."
              </blockquote>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue to evolve and expand our reach. Our team of dedicated contributors works tirelessly 
                to bring you the most relevant news, insightful articles, and engaging multimedia content. We remain 
                committed to our mission of fostering connection, understanding, and pride in our shared heritage.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-800 text-white p-8 rounded-lg shadow-lg text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Be part of our growing network and help build a stronger, more connected community. 
              Sign up today to receive updates and participate in upcoming events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 transform">
                Sign Up Now
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubPage;