import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="bg-blue-900/80 backdrop-blur-md rounded-lg p-6 md:p-10 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            We value your privacy and are committed to protecting your personal information. 
            This policy outlines how we collect, use, and safeguard your data.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                Information We Collect
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  We collect information that you provide directly to us when you register for an account, 
                  create or modify your profile, and use features of our platform. This information may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Username and password</li>
                  <li>Profile information, such as your photo and professional details</li>
                  <li>Content you post, upload, or otherwise submit to our platform</li>
                  <li>Communications you send to us or through our platform</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                How We Use Your Information
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Develop new products and services</li>
                  <li>Personalize your experience on our platform</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                Cookies and Tracking Technologies
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  We use cookies and similar tracking technologies to collect information about your interactions 
                  with our platform. This helps us improve your experience, analyze usage patterns, and customize content.
                </p>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may limit your 
                  ability to use certain features of our platform.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                Data Security
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                Changes To This Policy
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the effective date.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-yellow-400 w-2 h-8 mr-3 rounded"></span>
                Contact Us
              </h2>
              <div className="text-gray-600">
                <p>
                  If you have questions about this privacy policy or our practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-700">NHCS Support Team</p>
                  <p>Email: privacy@nhcs.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Last Updated Footer */}
          <div className="text-center mt-12 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">Last Updated: April 20, 2025</p>
            <a href="/" className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded font-medium transition">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;