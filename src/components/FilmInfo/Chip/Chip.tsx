import React from 'react';

type Props = {
  text: string;
  className?: string;
};

export const Chip: React.FC<Props> = ({ text, className }) => (
  <div
    className={`bg-cyan-800 text-white text-sm font-bold px-2 py-1 rounded-full inline-block ${className}`}
  >
    {text}
  </div>
);
