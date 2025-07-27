import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import illustration from '../../../assets/forgot.png'; // make sure this path is correct

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (val, idx) => {
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const sendOtp = async () => {
    if (!email) return toast.error('📧 Please enter your email.');
    setLoading(true);
    try {
      await axios.post('https://retailshieldcybersecurity-1.onrender.com/api/auth/request-otp', { email });
      toast.success('OTP sent successfully!');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    const otpValue = otp.join('').trim();
    if (otpValue.length !== 6) return toast.error('Enter all 6 digits of OTP');

    setLoading(true);
    try {
      await axios.post('https://retailshieldcybersecurity-1.onrender.com/api/auth/verify-otp', {
        email: email.trim(),
        otp: otpValue
      });

      toast.success('OTP verified! Redirecting...');
      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      <Toaster position="top-right" />

      {/* Left Illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-200">
        <img src={illustration} alt="Reset Illustration" className="w-3/4 max-w-lg" />
      </div>

      {/* Right Side Content */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
        <img
          src={logo}
          alt="Retail Shield Logo"
          className="absolute top-2 left-2 w-20 h-auto z-50 md:top-4 md:left-4 md:w-32"
        />

        <h1 className="text-xl md:text-3xl font-bold mb-1">Forgot Password?</h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Enter your registered email to receive a secure OTP and reset your password.
        </p>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="mb-6">
            <label className="block mb-1 font-medium text-sm md:text-base">Email Address</label>
            <div className="flex">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <button
                onClick={sendOtp}
                disabled={loading}
                className={`px-5 py-2 rounded-r font-semibold text-white text-sm md:text-base ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm md:text-base">Enter OTP</label>
            <div className="flex space-x-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              disabled={loading}
              className={`mt-5 w-full py-2 rounded font-semibold text-white text-sm md:text-base ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
