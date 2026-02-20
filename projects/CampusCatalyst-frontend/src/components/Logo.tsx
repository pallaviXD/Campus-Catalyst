import React from 'react';

const Logo: React.FC<{ size?: number }> = ({ size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 4px 20px rgba(19, 184, 184, 0.3))' }}
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a4d4d" />
          <stop offset="50%" stopColor="#13b8b8" />
          <stop offset="100%" stopColor="#1dd1d1" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1dd1d1" />
          <stop offset="100%" stopColor="#0a4d4d" />
        </linearGradient>
      </defs>

      {/* Outer Circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#logoGradient)"
        opacity="0.1"
      />

      {/* Main Hexagon Shape */}
      <path
        d="M100 30 L150 60 L150 120 L100 150 L50 120 L50 60 Z"
        fill="url(#logoGradient)"
        stroke="url(#accentGradient)"
        strokeWidth="3"
      />

      {/* Inner Design - Stylized "C" */}
      <path
        d="M100 60 Q130 60 130 90 Q130 120 100 120"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blockchain Connection Dots */}
      <circle cx="70" cy="90" r="6" fill="white" opacity="0.9" />
      <circle cx="100" cy="75" r="6" fill="white" opacity="0.9" />
      <circle cx="100" cy="105" r="6" fill="white" opacity="0.9" />
      
      {/* Connection Lines */}
      <line x1="70" y1="90" x2="94" y2="75" stroke="white" strokeWidth="2" opacity="0.6" />
      <line x1="70" y1="90" x2="94" y2="105" stroke="white" strokeWidth="2" opacity="0.6" />

      {/* Accent Spark */}
      <circle cx="130" cy="70" r="4" fill="#1dd1d1">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Logo;
