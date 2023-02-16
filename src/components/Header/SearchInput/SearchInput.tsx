import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TMDBLogo from '@/assets/images/tmdb-logo.svg';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const time = 300;

/** Renders an input that updates the search query. */
export const SearchInput: React.FC<Props> = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const timer = useRef<NodeJS.Timeout>(); // ref for the timeout id

  /** updates the input's state and calls debounced function to update the query setter */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    clearTimeout(timer.current); // always reset timer when text is updated
    setInputValue(value); // always update input's state, to keep input controlled
    // create new timeout to call the query setter
    timer.current = setTimeout(() => {
      setQuery(value);
    }, time);
  };

  return (
    <div className="relative flex items-center bg-slate-900 text-slate-50 rounded-full">
      <label className="relative z-10">
        <input
          type="text"
          placeholder="search movies"
          value={inputValue}
          aria-label="search movies"
          onChange={handleInput}
          className="h-10 w-52 pr-14 md:w-96 rounded-full p-4 text-md bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-200"
        />
        <span className="sr-only">search movies</span>
      </label>
      <div className="absolute right-4 top-2">
        <Image
          src={TMDBLogo}
          alt="The Movie Database"
          className="pointer-events-none select-none"
        />
      </div>
    </div>
  );
};
