import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { captchaToken } = await request.json();
    
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA token is required' },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      return NextResponse.json(
        { error: 'CAPTCHA verification unavailable' },
        { status: 500 }
      );
    }

    // Verify with Google reCAPTCHA
    const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        }),
      }
    );

    const verificationData = await verificationResponse.json();
    
    console.log('CAPTCHA verification result:', verificationData);

    if (verificationData.success) {
      return NextResponse.json({
        success: true,
        message: 'CAPTCHA verified successfully'
      });
    } else {
      return NextResponse.json(
        { 
          error: 'CAPTCHA verification failed',
          details: verificationData['error-codes'] || []
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return NextResponse.json(
      { error: 'CAPTCHA verification failed' },
      { status: 500 }
    );
  }
}