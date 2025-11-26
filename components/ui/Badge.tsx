import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'cyan' | 'green';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'cyan' }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};