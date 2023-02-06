// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SEARCH_BASE_URL, POPULAR_BASE_URL } from '@/config';
import { baseFetch } from '@/api/baseFetch';
import type { Movies, Movie } from '@/api/types';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movies>
) {
  const { page, search } = req.query; // get search params
  // TODO: refactor to handle empty page numbers
  const endpoint = search
    ? `${SEARCH_BASE_URL}/${search}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;

  const data = await baseFetch<Movies>(endpoint);
  res.status(200).json(data);
}
