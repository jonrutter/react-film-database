import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from './SearchInput/SearchInput';
import LogoFull from '@/assets/images/logo-full.svg';
import LogoSmall from '@/assets/images/logo-small.svg';

type Props = {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

/** Renders the site header. */
export const Header: React.FC<Props> = ({ setQuery }) => (
  <div className="sticky flex top-0 z-40 w-full bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
    <div className="flex flex-wrap justify-between items-center w-full h-full max-w-screen-xl mx-auto px-6 py-2 md:py-4">
      <h1>
        <Link href="/">
          <div className="flex items-center cursor-pointer py-2">
            <div className="hidden sm:block">
              <Image
                src={LogoFull}
                alt="React Film Database"
                className="h-6 w-full"
              />
            </div>
            <div className="sm:hidden">
              <Image
                src={LogoSmall}
                alt="React Film Database"
                className="h-6 w-full"
              />
            </div>
          </div>
        </Link>
      </h1>
      {setQuery ? <SearchInput setQuery={setQuery} /> : null}
    </div>
  </div>
);
