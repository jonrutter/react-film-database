import React from 'react';
import Image from 'next/image';
import NoImage from '@/public/no-avatar.svg';

type Props = {
  imgUrl?: string;
};

export const Thumbnail: React.FC<Props> = ({ imgUrl }) => (
  <Image
    src={imgUrl || NoImage}
    alt=""
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMLe3eBAAExQIZHGZNfQAAAABJRU5ErkJggg=="
    fill
    className="object-cover rounded-lg"
    sizes={
      imgUrl
        ? '(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw'
        : '400px'
    }
  />
);
