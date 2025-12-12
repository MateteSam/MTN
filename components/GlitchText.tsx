import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-tech-cyan opacity-0 group-hover:opacity-70 group-hover:animate-glitch translate-x-[2px] clip-path-inset-top">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-tech-purple opacity-0 group-hover:opacity-70 group-hover:animate-glitch animation-delay-100 -translate-x-[2px] clip-path-inset-bottom">
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;