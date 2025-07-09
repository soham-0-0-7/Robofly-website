import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'lg' | 'default';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}) => {
  const baseStyles =
    'rounded-full font-medium focus:outline-none transition-all duration-300';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// // filepath: src/components/ui/button.tsx
// import React from 'react';

// export const Button = ({ children, className = '', ...props }) => (
//   <button className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`} {...props}>
//     {children}
//   </button>
// );
