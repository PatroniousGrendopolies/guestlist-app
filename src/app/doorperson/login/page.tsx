'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoorpersonLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setPin(pin.slice(0, -1));
      setError('');
    } else if (pin.length < 4) {
      setPin(pin + key);
      setError('');
    }
  };

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual authentication
      // For now, accept any 4-digit PIN
      if (pin === '1234' || pin === '0000' || pin.length === 4) {
        // Store doorperson session
        localStorage.setItem('doorperson_authenticated', 'true');
        router.push('/doorperson/scanner');
      } else {
        setError('Invalid PIN code');
        setPin('');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-600 text-base">Log in to scanner</p>
        </div>

        {/* PIN Display */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 mb-4">
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
                {pin[index] && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
            ))}
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        </div>

        {/* PIN Keypad */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
              disabled={isLoading}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleKeyPress('0')}
            className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
            disabled={isLoading}
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress('delete')}
            className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
            disabled={isLoading}
          >
            ⌫
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={pin.length !== 4 || isLoading}
          className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Emergency Contact */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Locked out? Contact manager</p>
        </div>
      </div>
    </div>
  );
}
