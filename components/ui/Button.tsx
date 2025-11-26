import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon = false, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] border border-transparent hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)]",
    secondary: "bg-zinc-100 text-black hover:bg-white border border-transparent",
    outline: "bg-transparent border border-zinc-800 text-zinc-300 hover:border-cyan-500 hover:text-white hover:bg-cyan-500/10",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight size={18} />}
    </button>
  );
};