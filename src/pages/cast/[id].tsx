import React from 'react';
import {
  actorCreditsUrl,
  actorDetailsUrl,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from '@/api/config';
import { baseFetch } from '@/api/baseFetch';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ActorDetails, ActorCredits } from '@/api/types';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { Grid } from '@/components/Grid/Grid';
import { Card } from '@/components/Card/Card';
import Head from 'next/head';
import Link from 'next/link';
import { CastInfo } from '@/components/CastInfo/CastInfo';

type Props = {
  details?: ActorDetails;
  credits?: ActorCredits;
  error?: string;
};

const CastPage: NextPage<Props> = ({ details, credits, error }) => {
  console.log(details);
  return (
    <main>
      <Head>
        <title>{`${
          details?.name ? details.name : 'Error'
        } | React Film Database`}</title>
      </Head>
      <Header />
      {details && credits ? (
        <>
          <Breadcrumb title={details.name} />
          <CastInfo
            thumbUrl={
              details.profile_path
                ? IMAGE_BASE_URL + POSTER_SIZE + details.profile_path
                : undefined
            }
            backgroundImgUrl={
              credits.cast[0].backdrop_path
                ? IMAGE_BASE_URL + BACKDROP_SIZE + credits.cast[0].backdrop_path
                : undefined
            }
            biography={details.biography}
            birthday={details.birthday}
            deathday={details.deathday}
            role={details.known_for_department}
            name={details.name}
            gender={details.gender}
            place_of_birth={details.place_of_birth}
          />
          <Grid
            className="px-6 py-6 max-w-screen-xl mx-auto"
            title="Film credits"
          >
            {credits.cast.map((movie) => (
              <Card
                key={movie.id}
                imgUrl={
                  movie.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : ''
                }
                title={movie.title}
                subtitle={movie.character}
                href={`/film/${movie.id}`}
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
};

export default CastPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = (context.params?.id as string) || '0';

  const detailsEndpoint = actorDetailsUrl(id);
  const creditsEndpoint = actorCreditsUrl(id);

  try {
    const details = await baseFetch<ActorDetails>(detailsEndpoint);
    const credits = await baseFetch<ActorCredits>(creditsEndpoint);
    return {
      props: {
        details,
        credits,
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
