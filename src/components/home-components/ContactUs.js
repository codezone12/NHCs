import { useState, useEffect } from 'react';
import { submitContactForm } from '../../apis/authService';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    countryCode: 'SE' // Sweden as default
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });
  
  // Country codes with their phone formatting rules and SVG flags
  const countries = {
    SE: {
      name: 'Sweden',
      code: '+46',
      flag: 'https://flagcdn.com/w20/se.png',
      format: 'XX XXX XX XX',
      regex: /^[1-9]\d{8}$/,
      maxLength: 9,
      placeholder: '70 123 45 67'
    },
    ER: {
      name: 'Eritrea',
      code: '+291',
      flag: 'https://flagcdn.com/w20/er.png',
      format: 'X XXX XXX',
      regex: /^[1-9]\d{6}$/,
      maxLength: 7,
      placeholder: '1 234 567'
    },
    US: {
      name: 'United States',
      code: '+1',
      flag: 'https://flagcdn.com/w20/us.png',
      format: '(XXX) XXX-XXXX',
      regex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
      maxLength: 10,
      placeholder: '(555) 123-4567'
    },
    GB: {
      name: 'United Kingdom',
      code: '+44',
      flag: 'https://flagcdn.com/w20/gb.png',
      format: 'XXXX XXX XXXX',
      regex: /^[1-9]\d{9}$/,
      maxLength: 10,
      placeholder: '7700 900123'
    },
    DE: {
      name: 'Germany',
      code: '+49',
      flag: 'https://flagcdn.com/w20/de.png',
      format: 'XXX XXXXXXX',
      regex: /^[1-9]\d{9,10}$/,
      maxLength: 11,
      placeholder: '170 1234567'
    },
    FR: {
      name: 'France',
      code: '+33',
      flag: 'https://flagcdn.com/w20/fr.png',
      format: 'X XX XX XX XX',
      regex: /^[1-9]\d{8}$/,
      maxLength: 9,
      placeholder: '6 12 34 56 78'
    },
    IT: {
      name: 'Italy',
      code: '+39',
      flag: 'https://flagcdn.com/w20/it.png',
      format: 'XXX XXX XXXX',
      regex: /^3\d{9}$/,
      maxLength: 10,
      placeholder: '320 123 4567'
    },
    ES: {
      name: 'Spain',
      code: '+34',
      flag: 'https://flagcdn.com/w20/es.png',
      format: 'XXX XX XX XX',
      regex: /^[6-9]\d{8}$/,
      maxLength: 9,
      placeholder: '612 34 56 78'
    },
    NL: {
      name: 'Netherlands',
      code: '+31',
      flag: 'https://flagcdn.com/w20/nl.png',
      format: 'X XXXX XXXX',
      regex: /^6\d{8}$/,
      maxLength: 9,
      placeholder: '6 1234 5678'
    }
  };
  
  // Slider state and images
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    'https://nchs-fe.vercel.app/images/main-page/20150530-IMG_7415.JPG',
    'https://nchs-fe.vercel.app/images/main-page/DSC_0538.JPG',
    'https://nchs-fe.vercel.app/images/main-page/FB_IMG_1691510382300.jpg'
  ];

  // Auto slide change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Format phone number based on country
  const formatPhoneNumber = (value, countryCode) => {
    const country = countries[countryCode];
    if (!country) return value;
    
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to max length
    const limitedDigits = digits.slice(0, country.maxLength);
    
    // Apply formatting based on country
    switch (countryCode) {
      case 'SE': // Sweden: XX XXX XX XX
        return limitedDigits.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim();
      case 'ER': // Eritrea: X XXX XXX
        return limitedDigits.replace(/(\d{1})(\d{3})(\d{3})/, '$1 $2 $3').trim();
      case 'US': // US: (XXX) XXX-XXXX
        return limitedDigits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3').trim();
      case 'GB': // UK: XXXX XXX XXXX
        return limitedDigits.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3').trim();
      case 'DE': // Germany: XXX XXXXXXX
        return limitedDigits.replace(/(\d{3})(\d{7,8})/, '$1 $2').trim();
      case 'FR': // France: X XX XX XX XX
        return limitedDigits.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5').trim();
      case 'IT': // Italy: XXX XXX XXXX
        return limitedDigits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim();
      case 'ES': // Spain: XXX XX XX XX
        return limitedDigits.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim();
      case 'NL': // Netherlands: X XXXX XXXX
        return limitedDigits.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2 $3').trim();
      default:
        return limitedDigits;
    }
  };

  // Validate phone number based on country
  const validatePhoneNumber = (value, countryCode) => {
    const country = countries[countryCode];
    if (!country) return false;
    
    const digits = value.replace(/\D/g, '');
    return country.regex.test(digits);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value, formData.countryCode);
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedPhone
      }));
    } else if (name === 'countryCode') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        phone: '' // Reset phone when country changes
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone, formData.countryCode)) {
      setSubmitStatus({
        success: false,
        message: `Please enter a valid phone number for ${countries[formData.countryCode].name}`
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    try {
      // Prepare form data with full phone number
      const submitData = {
        ...formData,
        phone: `${countries[formData.countryCode].code} ${formData.phone}`
      };
      
      const response = await submitContactForm(submitData);
      
      setSubmitStatus({
        success: true,
        message: response.message || 'Your message has been sent successfully!'
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        countryCode: 'SE'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCountry = countries[formData.countryCode];
  const isPhoneValid = formData.phone ? validatePhoneNumber(formData.phone, formData.countryCode) : true;

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Stay Connected—Share, Inform, Inspire!</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm">
            Alenalki amplifies diverse voices across the diaspora, publishing impactful news and events that unite communities. Have a story to share? Join us in building a stronger, more informed network.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Slider */}
          <div className="w-full h-full md:w-1/3">
            <div className="bg-yellow-600 rounded-lg overflow-hidden relative">
              {/* Slides */}
              <div className="relative h-[400px]">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentSlide === index ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
            
            {/* Status message */}
            {submitStatus.message && (
              <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <div onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <div className="flex items-center space-x-2">
                    {/* Country Code Selector with SVG flags */}
                    <div className="relative">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="pl-8 pr-2 py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent text-sm appearance-none min-w-[120px]"
                      >
                        {Object.entries(countries).map(([code, country]) => (
                          <option key={code} value={code}>
                            {country.code}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img 
                          src={countries[formData.countryCode].flag} 
                          alt={`${countries[formData.countryCode].name} flag`}
                          className="w-5 h-auto rounded-sm"
                        />
                      </div>
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Phone Input */}
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder={currentCountry.placeholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className={`flex-1 p-2 border-b focus:outline-none bg-transparent ${
                        isPhoneValid ? 'border-gray-300 focus:border-yellow-500' : 'border-red-500 focus:border-red-500'
                      }`}
                    />
                  </div>
                  {!isPhoneValid && formData.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid {currentCountry.name} phone number (Format: {currentCountry.format})
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isPhoneValid}
                  className={`px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10 ${
                    isSubmitting || !isPhoneValid ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;