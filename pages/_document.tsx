import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';

interface Props extends DocumentProps {
  facebookAppId: string;
}

class CustomDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

    return { ...initialProps, facebookAppId };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Affiliate Marketing Support" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.fbAsyncInit=function(){FB.init({appId:"${this.props.facebookAppId}",autoLogAppEvents:true,xfbml:true,version:"v11.0"})}`,
            }}
          ></script>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
