import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`} role="alert">
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<AlertProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-sm ${className}`}>
      {children}
    </p>
  );
};