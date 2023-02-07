import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
};

export const Breadcrumb: React.FC<Props> = ({ title }) => (
  <div className="bg-zinc-800">
    <div className="flex items-center max-w-screen-xl mx-auto p-4 text-white text-lg">
      <Link href="/">
        <span className="hover:opacity-80 cursor-pointer duration-300 transition-opacity">
          Home
        </span>
      </Link>
      <span className="block px-2">|</span>
      <span>{title}</span>
    </div>
  </div>
);
