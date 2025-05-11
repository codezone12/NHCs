import { useState, useEffect } from 'react';
import { submitContactForm } from '../../apis/authService';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });
  
  // Slider state and images
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    '/images/contact-us.png',
    '/images/slider-images-2.jpg',
    '/images/slider-images-3.jpg'
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    try {
      const response = await submitContactForm(formData);
      
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
        message: ''
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

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm">
            NKCS is designed to facilitate seamless content management for admins and editors. With
            intuitive tools, users can easily create, edit, and publish news articles.
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
            
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
                  />
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
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
                    {isSubmitting ? 'Sending...' : 'Contact Now'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

// import { useState, useEffect } from 'react';
// import { submitContactForm } from '../../apis/authService';
// import ImagePreview from '../image-preview';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({
//     success: false,
//     message: ''
//   });
  
//   // Slider state and images
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderImages = [
//     '/images/contact-us.png',
//     '/images/slider-images-2.jpg',
//     '/images/slider-images-3.jpg'
//   ];

//   // Auto slide change effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => 
//         prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1
//       );
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus({ success: false, message: '' });
    
//     try {
//       const response = await submitContactForm(formData);
      
//       setSubmitStatus({
//         success: true,
//         message: response.message || 'Your message has been sent successfully!'
//       });
      
//       // Reset form after successful submission
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         message: ''
//       });
//     } catch (error) {
//       setSubmitStatus({
//         success: false,
//         message: error.message || 'Failed to send your message. Please try again later.'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full bg-gradient-to-r from-gray-50 to-yellow-50">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
//           <p className="max-w-2xl mx-auto text-gray-600 text-sm">
//             NKCS is designed to facilitate seamless content management for admins and editors. With
//             intuitive tools, users can easily create, edit, and publish news articles.
//           </p>
//         </div>

//         {/* Contact Form Section */}
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Image Slider */}
//           <div className="w-full h-full md:w-1/3">
//             <div className="bg-yellow-600 rounded-lg overflow-hidden relative">
//               {/* Slides */}
//               <div className="relative h-[400px]">
//                 {sliderImages.map((image, index) => (
//                   <div
//                     key={index}
//                     className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
//                       currentSlide === index ? 'opacity-100' : 'opacity-0'
//                     }`}
//                   >
//                     <ImagePreview 
//                       src={image}
//                       alt={`Slide ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
              
//               {/* Navigation Dots */}
//               <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
//                 {sliderImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                       currentSlide === index ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
//                     }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="w-full md:w-2/3">
//             <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
            
//             {/* Status message */}
//             {submitStatus.message && (
//               <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {submitStatus.message}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     placeholder="Enter First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     placeholder="Enter Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="Enter Phone Number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
//                   />
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   placeholder="Enter Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="3"
//                   className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500 bg-transparent"
//                 ></textarea>
//               </div>
              
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`px-5 py-3 border-yellow-500 border-2 text-lg font-semibold rounded-lg overflow-hidden relative group cursor-pointer bg-yellow-500 hover:scale-105 duration-[700ms] z-10 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   <span className="absolute w-64 h-0 transition-all duration-[700ms] origin-center rotate-45 -translate-x-16 bg-yellow-300 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
//                   <span className="relative text-white transition duration-[700ms] group-hover:text-yellow-600 ease">
//                     {isSubmitting ? 'Sending...' : 'Contact Now'}
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;