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
          key="custom-font"
        />
        <style key="custom-style">{`
          .root-container .ant-typography:not(a):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([class*="ant-typography-"]) {
            color: red !important;
          }

          .root-container a.ant-typography {
            color: green !important;
          }

          .root-container h1.ant-typography,
          .root-container h2.ant-typography,
          .root-container h3.ant-typography,
          .root-container h4.ant-typography,
          .root-container h5.ant-typography,
          .root-container h6.ant-typography {
            color: brown !important;
          }

        `}</style>
      </Head>
      <div
        ref={(ref: HTMLDivElement) => {
          connect(ref);
        }}
        className={`${className} root-container`}
        style={{
          backgroundColor: 'blue',
          fontFamily: 'Praise',
          fontSize: '3rem',
        }}
      >
        {children}
      </div>
    </>
  );
};
