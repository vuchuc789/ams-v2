import { FACEBOOK_API_VERSION } from '@constants';
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
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.fbAsyncInit=function(){FB.init({appId:"${this.props.facebookAppId}",autoLogAppEvents:true,xfbml:true,version:"${FACEBOOK_API_VERSION}"})}`,
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
