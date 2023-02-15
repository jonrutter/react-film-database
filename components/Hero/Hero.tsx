import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  imgUrl: string;
  title: string;
  text: string;
  id: number;
};

export const Hero: React.FC<Props> = ({ imgUrl, title, text, id }) => (
  <div className="relative w-full h-128 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900">
    <div className="relative flex flex-col-reverse h-full max-w-screen-xl mx-auto z-10 pb-12 text-left">
      <section className="text-white max-w-2xl px-6">
        <h2 className="font-bold mb-3 md:mb-6 flex flex-col">
          <span className="text-xl md:text-3xl mb-1 md:mb-2">Top film:</span>
          <span className="text-3xl md:text-5xl ">{title}</span>
        </h2>
        <p className="text-lg mb-4 md:hidden">
          {text.length > 200 ? text.slice(0, 196) + '...' : text}
        </p>
        <p className="text-lg mb-4 hidden md:block">{text}</p>
        <Link
          href={`/film/${id}`}
          className="bg-cyan-900 rounded-full py-2 px-6 text-lg text-white inline-block hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-white font-semibold"
        >
          Full details
        </Link>
      </section>
    </div>
    <Image
      priority
      fill
      className="object-cover object-center -z-10"
      src={imgUrl}
      alt="hero"
      quality={100}
    />
  </div>
);
