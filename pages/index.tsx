import React from 'react';
import Head from 'next/head';
import styles from 'styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>AMS</title>
      </Head>
      <div className={styles.container}>Hello</div>
    </>
  );
};

export default Home;
