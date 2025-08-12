// filepath: src/components/ui/card.tsx
import React from "react";

type CardProps = React.PropsWithChildren<{
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}>;

export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div className={`rounded-xl shadow bg-white ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({
  children,
  className = "",
  ...props
}: CardProps) => (
  <div className={className} {...props}>
    {children}
  </div>
);
