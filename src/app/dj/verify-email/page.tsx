'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function DJVerifyEmailPageContent() {
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendMessage('Verification email sent! Check your inbox.');
    } catch (error) {
      setResendMessage('Failed to send email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = () => {
    router.push('/dj/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">Verify your email address</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">📧</div>
          <h2 className="text-2xl font-light mb-4">Check your email</h2>
          <p className="text-gray-600 mb-4">We've sent a verification link to:</p>
          <p className="text-lg font-medium mb-6">{email}</p>
          <p className="text-gray-600">
            Click the link in the email to verify your account and access your DJ dashboard.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-medium mb-4">What to do next:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                1
              </span>
              Check your email inbox (and spam folder)
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                2
              </span>
              Click the verification link in the email
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                3
              </span>
              You'll be redirected to your DJ dashboard
            </li>
          </ol>
        </div>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Didn't receive the email?</p>

          {resendMessage && (
            <div
              className={`mb-4 p-3 rounded-xl ${
                resendMessage.includes('Failed')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {resendMessage}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </div>
              ) : (
                'Resend verification email'
              )}
            </button>

            <button
              onClick={handleChangeEmail}
              className="w-full bg-white text-black border-2 border-black py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Use different email address
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Still having trouble?</p>
          <p className="text-sm text-gray-500">
            Contact the venue manager who invited you for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DJVerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <DJVerifyEmailPageContent />
    </Suspense>
  );
}
