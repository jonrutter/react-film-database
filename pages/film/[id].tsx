import React from 'react';
import {
  movieUrl,
  creditsUrl,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from '@/api/config';
import { baseFetch } from '@/api/baseFetch';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Movie, Credits, Crew, Cast } from '@/api/types';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { FilmInfo } from '@/components/FilmInfo/FilmInfo';
import { Grid } from '@/components/Grid/Grid';
import { Card } from '@/components/Card/Card';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  movie?: Movie;
  directors?: Crew[];
  cast?: Cast[];
  error?: string;
};

const FilmPage: NextPage<Props> = ({ movie, directors, cast, error }) => (
  <main>
    <Head>
      <title>{`${
        movie?.title ? movie.title : 'Error'
      } | React Film Database`}</title>
    </Head>
    <Header />
    {movie && directors && cast ? (
      <>
        <Breadcrumb title={movie.title} />
        <FilmInfo
          thumbUrl={
            movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : '/no_image.jpg'
          }
          rating={movie.vote_average}
          year={movie.release_date.split('-')[0]}
          title={movie.title}
          backgroundImgUrl={
            movie.backdrop_path
              ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path
              : '/no_image.jpg'
          }
          summary={movie.overview}
          directors={directors}
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <Grid className="px-6 py-6 max-w-screen-xl mx-auto" title="Cast">
          {cast.map((actor) => (
            <Card
              key={actor.credit_id}
              imgUrl={
                actor.profile_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
                  : ''
              }
              title={actor.name}
              subtitle={actor.character}
            />
          ))}
        </Grid>
      </>
    ) : (
      <div className="px-6">
        <p className="mt-12 mb-4">
          Oops! Sorry, there was a problem getting the movie details.
        </p>
        <p>
          Please try going back{' '}
          <Link href="/" className="underline">
            home
          </Link>
          .
        </p>
      </div>
    )}
  </main>
);

export default FilmPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  const movieEndPoint: string = movieUrl(id);
  const creditsEndpoint: string = creditsUrl(id);

  try {
    const movie = await baseFetch<Movie>(movieEndPoint);
    const credits = await baseFetch<Credits>(creditsEndpoint);
    // get the directors only
    const directors = credits.crew.filter(
      (member) => member.job === 'Director'
    );
    return {
      props: {
        movie,
        directors,
        cast: credits.cast,
      },
      revalidate: 60 * 60 * 24, // only cache page for 24 hours
    };
  } catch (err) {
    return {
      props: {
        error: 'Error fetching from API',
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
