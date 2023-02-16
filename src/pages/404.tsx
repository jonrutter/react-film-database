import React from 'react';
import type { NextPage } from 'next';
import { Header } from '@/components/Header/Header';
import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage: NextPage = () => (
  <main className="relative h-screen overflow-y-scroll">
    <Head>
      <title>404: Not Found | React Film Database</title>
    </Head>
    <Header />
    <div className="px-4 mt-12 max-w-screen-xl mx-auto">
      Oops! This page does not exist. Please go back{' '}
      <Link href="/" className="underline">
        home
      </Link>
    </div>
  </main>
);

export default NotFoundPage;
