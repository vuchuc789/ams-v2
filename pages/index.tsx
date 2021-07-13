import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <>
      <Head>
        <title>AMS</title>
        <meta name="description" content="Affiliate Marketing Support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>Hello</div>
    </>
  );
};

export default Home;
