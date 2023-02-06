import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from './SearchInput/SearchInput';

type Props = {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

/** Renders the site header. */
export const Header: React.FC<Props> = ({ setQuery }) => (
  <div className="sticky flex top-0 z-40 w-full h-24 bg-zinc-900">
    <div className="flex flex-wrap justify-between items-center w-full h-full max-w-screen-xl mx-auto px-4">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <div className="hidden md:block">
            <Image
              width="150"
              height="41"
              src="/rmdb-logo.svg"
              alt="React Movie Database"
            />
          </div>
          <div className="md:hidden">
            <Image
              width="42"
              height="42"
              src="/rmdb-logo-small.svg"
              alt="React Movie Database"
            />
          </div>
        </div>
      </Link>
      {setQuery ? (
        <div className="relative flex items-center">
          <SearchInput setQuery={setQuery} />
        </div>
      ) : null}
    </div>
  </div>
);
