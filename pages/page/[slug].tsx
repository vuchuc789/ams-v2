import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Page as PageModel } from 'server/models';
import { EditablePage } from 'components';
import lz from 'lzutf8';
import Head from 'next/head';
import styles from 'styles/Page.module.scss';

interface PageProps {
  name: string;
  content?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context,
) => {
  try {
    const slug = context.params?.slug as string;

    if (!slug || typeof slug !== 'string') {
      return { notFound: true };
    }

    const page = await PageModel.findOne({ slug });

    if (!page || !page.isPublic) {
      return { notFound: true };
    }

    const content = page.hashedContent
      ? lz.decompress(lz.decodeBase64(page.hashedContent))
      : undefined;

    return { props: { name: page.name, content } };
  } catch (e) {
    return { notFound: true };
  }
};

const Page: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ content, name }) => {
    return (
      <>
        <Head>
          <title>{name}</title>
        </Head>
        <EditablePage className={styles.page} initData={content} />
      </>
    );
  };

export default Page;
