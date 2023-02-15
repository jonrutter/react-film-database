import React from 'react';
import Image from 'next/image';
import { formatMoney } from '@/utils/formatMoney';
import { formatTime } from '@/utils/formatTime';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { Chip } from './Chip/Chip';
import type { Crew } from '@/api/types';

type Props = {
  thumbUrl: string;
  backgroundImgUrl: string;
  title: string;
  year: string;
  summary: string;
  rating: number;
  directors: Crew[];
  time: number;
  budget: number;
  revenue: number;
};

export const FilmInfo: React.FC<Props> = ({
  thumbUrl,
  backgroundImgUrl,
  title,
  year,
  summary,
  rating,
  directors,
  time,
  budget,
  revenue,
}) => (
  <div className="relative w-full h-auto p-4">
    <div className="relative h-full min-h-128 max-w-screen-xl mx-auto flex flex-col md:flex-row p-4 z-10 rounded-xl bg-zinc-800 bg-opacity-90">
      <div className="relative w-full h-96 md:h-auto md:w-1/3">
        <Thumbnail imgUrl={thumbUrl} label={title} />
        <div className="absolute top-4 left-4 rounded-full bg-white w-10 h-10 flex justify-center items-center text-cyan-900 text-sm font-bold shadow-sm">
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="text-white px-0 py-4 md:py-0 text-center md:text-left md:px-8 w-full md:w-2/3">
        <h2 className="text-2xl md:text-4xl font-bold pb-4">
          {title} ({year})
        </h2>
        <h3 className="text-lg font-bold">Summary</h3>
        <p className="mb-8 text-sm md:text-lg">{summary}</p>
        <div>
          <div>
            <h3 className="text-lg font-bold">
              Director{directors.length > 1 ? 's' : ''}
            </h3>
            <div>
              {directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold">Movie data</h3>
            <Chip className="ml-0" text={`Running time: ${calcTime(time)}`} />
            <Chip text={`Budget: ${convertMoney(budget)}`} />
            <Chip text={`Revenue: ${convertMoney(revenue)}`} />
          </div>
        </div>
      </div>
    </div>
    <Image
      priority
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMLe3eBAAExQIZHGZNfQAAAABJRU5ErkJggg=="
      className="object-cover object-center"
      fill
      src={backgroundImgUrl}
      alt=""
    />
  </div>
);
