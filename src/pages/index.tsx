import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { Grid } from '@/components/Grid/Grid';
import { Card } from '@/components/Card/Card';
import { Spinner } from '@/components/Spinner/Spinner';
import { useFetchMovies } from '@/api/useFetchMovies';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '@/api/config';
import Link from 'next/link';
import Head from 'next/head';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');

  const { data, fetchNextPage, isLoading, isFetching, error } =
    useFetchMovies(query);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    console.log('Scrolling');
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) fetchNextPage();
  };

  if (error)
    return (
      <div>
        <Head>
          <title>Error | React Film Database</title>
        </Head>
        Oops! Sorry, something went wrong.
      </div>
    );

  return (
    <main
      className="relative h-screen overflow-y-scroll font-raleway pb-24"
      onScroll={handleScroll}
    >
      <Head>
        <title>Home | React Film Database</title>
      </Head>
      <Header setQuery={setQuery} />
      {!query && data && data.pages ? (
        <Hero
          imgUrl={
            data?.pages[0].results[0].backdrop_path
              ? IMAGE_BASE_URL +
                BACKDROP_SIZE +
                data.pages[0].results[0].backdrop_path
              : ''
          }
          title={data.pages[0].results[0].title}
          text={data.pages[0].results[0].overview}
          id={data.pages[0].results[0].id}
        />
      ) : null}
      {data && data.pages ? (
        <Grid
          className="p-6 max-w-screen-xl mx-auto"
          title={
            query
              ? `Search Results: ${data?.pages[0].total_results || 0}`
              : 'Popular Films'
          }
        >
          {data && data.pages
            ? data.pages.map((page) =>
                page.results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/film/${movie.id}`}
                    aria-label={movie.title}
                  >
                    <div className="cursor-pointer hover:opacity-80 duration-300 transition-opacity">
                      <Card
                        imgUrl={
                          movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : '/no_image.jpg'
                        }
                        title={movie.title}
                      />
                    </div>
                  </Link>
                ))
              )
            : null}
        </Grid>
      ) : null}
      {isLoading || isFetching ? <Spinner /> : null}
    </main>
  );
};

export default Home;
