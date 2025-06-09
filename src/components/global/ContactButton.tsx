import Link from 'next/link';
import { colorPalette } from '@/utils/variables';

interface ContactButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function ContactButton({ 
  children = "Contact Us",
  href = "/contact",
  onClick,
  className = "",
  variant = 'primary',
  size = 'md',
  disabled = false
}: ContactButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none rounded-lg";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

//   const variantStyles = {
//     primary: {
//       backgroundColor: colorPalette.green5,
//       '&:hover': {
//         backgroundColor: colorPalette.green2
//       }
//     },
//     secondary: {
//       backgroundColor: colorPalette.green2,
//       '&:hover': {
//         backgroundColor: colorPalette.green5
//       }
//     }
//   };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? colorPalette.green5 : colorPalette.green2,
  };

  const defaultIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = variant === 'primary' ? colorPalette.green2 : colorPalette.green5;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = variant === 'primary' ? colorPalette.green5 : colorPalette.green2;
    }
  };

  // If href is provided, render as Link
  if (href && !onClick) {
    return (
      <Link href={href}>
        <button
          className={buttonClasses}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
        >
          {children || (
            <>
              {defaultIcon}
              Contact Us
            </>
          )}
        </button>
      </Link>
    );
  }

  // If onClick is provided, render as button
  return (
    <button
      className={buttonClasses}
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children || (
        <>
          {defaultIcon}
          Contact Us
        </>
      )}
    </button>
  );
}