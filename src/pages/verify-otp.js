import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyOtp } from '../apis/authService';

const VerifyOTPPage = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  
  // Create refs for each input
  const inputRefs = useRef([]);
  if (inputRefs.current.length !== 6) {
    inputRefs.current = Array(6).fill().map((_, i) => inputRefs.current[i] || React.createRef());
  }

  useEffect(() => {
    // Get the email from session storage
    const storedEmail = sessionStorage.getItem('verificationEmail');
    if (!storedEmail) {
      toast.error('Email not found. Please sign up again.');
      navigate('/signup');
      return;
    }
    setEmail(storedEmail);

    // Countdown timer for OTP expiration
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP value at the specific index
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    
    if (!pastedData) return;
    
    // Distribute pasted data across input fields
    const newOtpValues = [...otpValues];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtpValues[index] = char;
    });
    
    setOtpValues(newOtpValues);
    
    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtpValues.findIndex(value => !value);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (pastedData.length < 6) {
      inputRefs.current[pastedData.length].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otpValues.join('');
    if (otpString.length !== 6) {
      return toast.error('Please enter a valid 6-digit OTP');
    }

    try {
      setLoading(true);
      await verifyOtp(email, otpString);
      toast.success('Email verified successfully!');
      
      // Clear the email from session storage
      sessionStorage.removeItem('verificationEmail');
      
      // Redirect to login page after successful verification
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      // await resendOTP(email);
      setTimer(60);
      toast.info('A new OTP has been sent to your email');
      
      // Clear the current OTP values
      setOtpValues(['', '', '', '', '', '']);
      
      // Focus the first input field
      inputRefs.current[0].focus();
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* App Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/images/alenalki.Logo.png" 
          alt="Company Logo" 
          className="h-12 w-auto"
          // onError={(e) => {
          //   e.target.onerror = null;
          //   e.target.src = "https://via.placeholder.com/120x48/0B5394/FFFFFF?text=LOGO";
          // }}
        />
      </div>
      
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to{' '}
            <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter Verification Code
            </label>
            <div className="mt-2 flex justify-between items-center">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  style={{ backgroundColor: loading ? '#f9fafb' : 'white' }}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otpValues.join('').length !== 6}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || otpValues.join('').length !== 6 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              style={{ backgroundColor: loading || otpValues.join('').length !== 6 ? '#7AA1D2' : '#0052A5' }}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            {timer > 0 ? (
              <span className="text-gray-500">
                Resend in {timer}s
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Return to{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default VerifyOTPPage;