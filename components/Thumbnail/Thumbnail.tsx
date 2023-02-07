import React from 'react';
import Image from 'next/image';

type Props = {
  label: string;
  imgUrl: string;
};

export const Thumbnail: React.FC<Props> = ({ label, imgUrl }) => (
  <Image
    src={imgUrl}
    alt={label}
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMLe3eBAAExQIZHGZNfQAAAABJRU5ErkJggg=="
    fill
    className="object-cover rounded-lg"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw"
  />
);
