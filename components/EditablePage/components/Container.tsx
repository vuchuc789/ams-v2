import { useNode, UserComponent } from '@craftjs/core';
import Head from 'next/head';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: UserComponent<Partial<ContainerProps>> = ({
  children,
  className,
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Praise&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .ant-typography {
            color: red;
          }

          a.ant-typography {
            color: auto;
          }
        `}</style>
      </Head>
      <div
        ref={(ref: HTMLDivElement) => {
          connect(ref);
        }}
        className={className}
        style={{
          backgroundColor: 'blue',
          fontFamily: 'Praise',
        }}
      >
        {children}
      </div>
    </>
  );
};
