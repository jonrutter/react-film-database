import type { Movies } from './types';
import { baseFetch } from './baseFetch';

// fetch for react query
export const fetchMovies = async (search = '', page = 1): Promise<Movies> => {
  return await baseFetch<Movies>(`/api/movies?search=${search}&page=${page}`);
};
