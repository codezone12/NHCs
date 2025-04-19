import { useState } from 'react';

const ShareNewsSection = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle form submission logic here
    setEmail('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Share Your News and Feedback</h2>
          <p className="text-gray-600 mb-6">
            We want to hear your story and ideas/suggestions to improve our community.
          </p>
          
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button 
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
          
          <p className="text-xs text-gray-500">
            By clicking Sign Up, you confirm that you agree with our <a href="#" className="underline">Terms and Conditions</a>
          </p>
        </div>
        
        <div className="w-full md:w-1/2">
          <img 
            src="/images/join-section-image.png" 
            alt="Community members in yellow jackets" 
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ShareNewsSection;