import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
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
          {/* Phone Image */}
          <div className="w-full md:w-1/3">
            <div className="bg-yellow-600 rounded-lg inline-block">
              <img 
                src="/images/contact-us.png" 
                alt="Smartphone with apps" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
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
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-2 rounded-md transition duration-300"
                >
                  Submit
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