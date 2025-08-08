"use client";

import { useState, useRef, useEffect } from "react";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<boolean>;
  email: string;
  onResendOTP: () => Promise<boolean>;
  isVerifying: boolean;
}

export default function OTPModal({
  isOpen,
  onClose,
  onVerify,
  email,
  onResendOTP,
  isVerifying,
}: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setError("");

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    const success = await onVerify(otpString);
    if (!success) {
      setError("Invalid or expired OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    const success = await onResendOTP();
    if (success) {
      setCountdown(60); // 60 second cooldown
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } else {
      setError("Failed to resend OTP. Please try again.");
    }

    setIsResending(false);
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setCountdown(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Email Verification
              </h3>
              <p className="text-green-100 text-xs sm:text-sm mt-1">
                Verify your email to continue
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-green-200 transition-colors"
              disabled={isVerifying}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              We&apos;ve sent a 6-digit verification code to
            </p>
            <p className="font-semibold text-gray-800 break-all text-xs sm:text-sm">
              {email}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-1 sm:space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-8 h-10 sm:w-10 sm:h-12 text-center text-base sm:text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    disabled={isVerifying}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-xs sm:text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying || otp.join("").length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4 text-sm sm:text-base"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend Button */}
            <div className="text-center">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || countdown > 0 || isVerifying}
                className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend Code"}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs text-center">
              <span className="font-medium">Note:</span> The verification code
              expires in 10 minutes. Check your spam folder if you don&apos;t
              see the email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
