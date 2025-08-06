"use client";

import { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(({
  onVerify,
  onError,
  theme = 'light'
}, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset: () => {
      recaptchaRef.current?.reset();
    },
    execute: () => {
      recaptchaRef.current?.execute();
    }
  }));

  if (!siteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY not found');
    return (
      <div className="text-red-600 text-sm p-2 border border-red-300 rounded">
        ⚠️ CAPTCHA configuration error. Please contact support.
      </div>
    );
  }

  const handleCaptchaChange = (token: string | null) => {
    console.log('CAPTCHA token received:', token ? 'Valid token' : 'No token');
    onVerify(token);
  };

  const handleCaptchaError = () => {
    console.error('CAPTCHA error occurred');
    onError?.();
  };

  const handleCaptchaExpired = () => {
    console.log('CAPTCHA expired');
    onVerify(null);
  };

  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleCaptchaChange}
        onError={handleCaptchaError}
        onExpired={handleCaptchaExpired}
        theme={theme}
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;