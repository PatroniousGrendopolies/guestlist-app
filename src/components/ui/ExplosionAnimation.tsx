'use client';

import { useState, useEffect } from 'react';

interface ExplosionAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
  approvedNames: string[];
  buttonPosition?: { x: number; y: number };
}

export default function ExplosionAnimation({ 
  isVisible, 
  onAnimationComplete, 
  approvedNames,
  buttonPosition = { x: 50, y: 50 } // Default to center
}: ExplosionAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'explosion' | 'text' | 'fadeOut' | 'complete'>('explosion');

  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase('explosion');
      return;
    }

    // Phase 1: Explosion animation (0.8s)
    const explosionTimer = setTimeout(() => {
      setAnimationPhase('text');
    }, 800);

    // Phase 2: Text display (2.5s)
    const textTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, 3300);

    // Phase 3: Fade out (0.5s)
    const fadeOutTimer = setTimeout(() => {
      setAnimationPhase('complete');
      onAnimationComplete();
    }, 3800);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  const formatNames = (names: string[]) => {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    if (names.length <= 4) {
      return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
    }
    return `${names.slice(0, 3).join(', ')}, and ${names.length - 3} others`;
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Explosion Phase */}
      {animationPhase === 'explosion' && (
        <div className="absolute inset-0">
          {/* Multiple explosion circles radiating from button position */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-black"
              style={{
                left: `${buttonPosition.x}%`,
                top: `${buttonPosition.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `explode-${i} 0.8s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
          
          {/* Screen wipe overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              clipPath: `circle(0% at ${buttonPosition.x}% ${buttonPosition.y}%)`,
              animation: 'screenWipe 0.8s ease-out forwards',
              animationDelay: '0.2s',
            }}
          />
        </div>
      )}

      {/* Text Display Phase */}
      {(animationPhase === 'text' || animationPhase === 'fadeOut') && (
        <div 
          className="absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-500"
          style={{ 
            opacity: animationPhase === 'fadeOut' ? 0 : 1 
          }}
        >
          <div className="text-center text-white max-w-lg px-6">
            <h1
              className="text-3xl font-light mb-4 opacity-0"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: '0.2s',
              }}
            >
              Approved
            </h1>
            <p
              className="text-lg text-gray-300 opacity-0"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: '0.4s',
              }}
            >
              {formatNames(approvedNames)}
            </p>
            
            {/* Decorative particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-0"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `particle-float 2s ease-out forwards`,
                  animationDelay: `${0.6 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* CSS-in-JS Style injection */}
      <style jsx>{`
        @keyframes explode-0 {
          0% { width: 20px; height: 20px; opacity: 1; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }
        @keyframes explode-1 {
          0% { width: 15px; height: 15px; opacity: 0.8; }
          100% { width: 250px; height: 250px; opacity: 0; }
        }
        @keyframes explode-2 {
          0% { width: 25px; height: 25px; opacity: 0.9; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
        @keyframes explode-3 {
          0% { width: 18px; height: 18px; opacity: 0.7; }
          100% { width: 350px; height: 350px; opacity: 0; }
        }
        @keyframes explode-4 {
          0% { width: 22px; height: 22px; opacity: 0.8; }
          100% { width: 450px; height: 450px; opacity: 0; }
        }
        @keyframes explode-5 {
          0% { width: 16px; height: 16px; opacity: 0.6; }
          100% { width: 320px; height: 320px; opacity: 0; }
        }
        @keyframes explode-6 {
          0% { width: 28px; height: 28px; opacity: 0.9; }
          100% { width: 500px; height: 500px; opacity: 0; }
        }
        @keyframes explode-7 {
          0% { width: 12px; height: 12px; opacity: 0.5; }
          100% { width: 280px; height: 280px; opacity: 0; }
        }

        @keyframes screenWipe {
          0% { clip-path: circle(0% at ${buttonPosition.x}% ${buttonPosition.y}%); }
          100% { clip-path: circle(150% at ${buttonPosition.x}% ${buttonPosition.y}%); }
        }

        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes particle-float {
          0% { 
            opacity: 0; 
            transform: translateY(0px) scale(0);
          }
          50% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translateY(-40px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}