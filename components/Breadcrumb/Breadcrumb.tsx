import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
};

export const Breadcrumb: React.FC<Props> = ({ title }) => (
  <div className="bg-slate-700">
    <div className="max-w-screen-xl mx-auto px-6 py-4 text-slate-50 text-lg space-x-4">
      <Link
        href="/"
        className="hover:opacity-80 cursor-pointer duration-300 transition-opacity"
      >
        Home
      </Link>
      <span>|</span>
      <span>{title}</span>
    </div>
  </div>
);
