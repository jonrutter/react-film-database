import React from 'react';
import {
  movieUrl,
  creditsUrl,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from '@/config';
import { baseFetch } from '@/api/baseFetch';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Movie, Credits, Crew, Cast } from '@/api/types';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { FilmInfo } from '@/components/FilmInfo/FilmInfo';
import { Grid } from '@/components/Grid/Grid';
import { Card } from '@/components/Card/Card';
import Head from 'next/head';

type Props = {
  movie: Movie;
  directors: Crew[];
  cast: Cast[];
};

const FilmPage: NextPage<Props> = ({ movie, directors, cast }) => (
  <main>
    <Head>
      <title>{movie.title} | React Film Database</title>
    </Head>
    <Header />
    <Breadcrumb title={movie.title} />
    <FilmInfo
      thumbUrl={
        movie.poster_path
          ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
          : '/no-image.jpg'
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
    <Grid className="p-4 max-w-screen-xl mx-auto" title="Actors">
      {cast.map((actor) => (
        <Card
          key={actor.credit_id}
          imgUrl={
            actor.profile_path
              ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
              : '/no_image.jpg'
          }
          title={actor.name}
          subtitle={actor.character}
        />
      ))}
    </Grid>
  </main>
);

export default FilmPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  const movieEndPoint: string = movieUrl(id);
  const creditsEndpoint: string = creditsUrl(id);

  const movie = await baseFetch<Movie>(movieEndPoint);
  const credits = await baseFetch<Credits>(creditsEndpoint);

  // get the directors only
  const directors = credits.crew.filter((member) => member.job === 'Director');
  return {
    props: {
      movie,
      directors,
      cast: credits.cast,
    },
    revalidate: 60 * 60 * 24, // only cache page for 24 hours
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
