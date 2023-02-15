import React from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';

type Props = {
  imgUrl: string;
  title: string;
  subtitle?: string;
};

export const Card: React.FC<Props> = ({ imgUrl, title, subtitle }) => (
  <div className="h-80 rounded-xl shadow-md overflow-hidden">
    <div className="relative h-full">
      <Thumbnail imgUrl={imgUrl} />
      <div className="absolute w-full bottom-0 px-4 py-2 bg-slate-800">
        <h3 className="text-white text-center text-lg truncate">{title}</h3>
        {subtitle ? (
          <p className="text-cyan-300 text-center text-sm truncate">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  </div>
);
