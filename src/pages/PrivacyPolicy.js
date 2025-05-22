import React from 'react';
import { FaCopyright, FaExclamationTriangle } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="bg-blue-900/80 backdrop-blur-md rounded-lg p-6 md:p-10 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32">
              <img 
                src="/images/alenalki.Logo.png" 
                alt="Tiger Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=Tiger+Logo";
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Disclaimer Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaExclamationTriangle className="text-yellow-500 mr-3" />
                Disclaimer
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  Alenalki.se publishes articles in their original form, without edits or deletions. However, we reserve the right to decline submissions that we determine to be discriminatory, offensive, or otherwise unproductive. The opinions expressed in articles belong solely to the respective authors and do not reflect the views of Alenalki.se. We do not assume responsibility for the content of submitted articles. Any comments or questions regarding specific articles should be directed to the submitting author.
                </p>
              </div>
            </section>

            {/* Copyright Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaCopyright className="text-yellow-500 mr-3" />
                Copyright Notice
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  © 2025 Alenalki.se. All rights reserved. No materials published on this website may be reproduced, distributed, transmitted, or otherwise disseminated in any form without prior written permission from Alenalki.se.
                </p>
                <p className="mt-4">
                  We appreciate your cooperation. For any inquiries, please contact us at <a href="mailto:info@alenalki.se" className="text-blue-600 hover:underline">info@alenalki.se</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;