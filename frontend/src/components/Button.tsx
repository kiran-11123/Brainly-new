import React from 'react';

// Define strict string literal types for safety
type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  // Allows users to pass arbitrary Tailwind classes for extra customization
  className?: string; 
}

// Map the strict string literal types to Tailwind classes
const VariantClass: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-blue-200 text-gray-800 hover:bg-gray-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  // Use relative sizing to scale better (e.g., text-sm + small padding)
  sm: "px-3 py-1 text-sm", 
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};


export const Button = (props: ButtonProps) => {
  const { variant, size, text, startIcon, endIcon, onClick, className } = props;

  // Combine all class strings safely
  const finalClasses = [
    'inline-flex items-center justify-center gap-2 rounded-md shadow-xl font-medium transition-colors duration-200',
    VariantClass[variant],
    sizeClasses[size],
    className // Add any custom class passed via prop
  ].join(' ');


  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={finalClasses}
    >
      {/* Wrap icons in span for better vertical alignment and spacing consistency */}
      {startIcon && <span>{startIcon}</span>}
      {text}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};