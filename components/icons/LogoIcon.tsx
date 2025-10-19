
import React from 'react';

export const LogoIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={`h-8 w-8 text-indigo-600 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.6"/>
    <path d="M2 17l10 5 10-5" fill="currentColor" opacity="0.6"/>
    <path d="M2 12l10 5 10-5" fill="currentColor"/>
  </svg>
);
