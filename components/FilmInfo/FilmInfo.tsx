import React from 'react';
import Image from 'next/image';
import { formatMoney } from '@/utils/formatMoney';
import { formatTime } from '@/utils/formatTime';
import { Chip } from './Chip/Chip';
import type { Crew } from '@/api/types';
import NoImage from '@/public/no-avatar.svg';

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
  <div className="relative w-full h-auto">
    <div className="relative h-full max-w-screen-xl mx-auto px-6 py-4">
      <div className="relative min-h-128 w-full h-full flex flex-col md:flex-row p-4 z-10 rounded-xl bg-slate-900/80">
        <div className="relative w-full h-96 md:h-auto md:w-1/3">
          <Image
            src={thumbUrl || NoImage}
            alt=""
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMLe3eBAAExQIZHGZNfQAAAABJRU5ErkJggg=="
            fill
            className="object-cover rounded-lg pointer-events-none select-none"
            sizes={
              thumbUrl
                ? '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
                : undefined
            }
          />
          <div className="absolute top-4 left-4 rounded-full bg-white w-10 h-10 flex justify-center items-center text-cyan-900 text-sm font-bold shadow-sm">
            <span className="sr-only">film rating: </span>
            {rating.toFixed(1)}
          </div>
        </div>
        <section className="text-white px-0 py-4 md:py-0 md:px-8 w-full md:w-2/3">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {title} ({year})
          </h2>
          <h3 className="text-lg md:text-xl font-bold mb-2">Summary</h3>
          <p className="mb-8 text-base md:text-lg">{summary}</p>
          <div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Director{directors.length > 1 ? 's' : ''}
              </h3>
              <div>
                {directors.map((director) => (
                  <p
                    key={director.credit_id}
                    className="text-base md:text-lg mb-2"
                  >
                    {director.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold mb-2">Stats</h3>
              <Chip
                className="ml-0"
                text={`Running time: ${formatTime(time)}`}
              />
              <Chip text={`Budget: ${formatMoney(budget)}`} />
              <Chip text={`Revenue: ${formatMoney(revenue)}`} />
            </div>
          </div>
        </section>
      </div>
    </div>

    <Image
      priority
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMLe3eBAAExQIZHGZNfQAAAABJRU5ErkJggg=="
      className="object-cover object-center pointer-events-none select-none"
      fill
      src={backgroundImgUrl}
      alt=""
    />
  </div>
);
