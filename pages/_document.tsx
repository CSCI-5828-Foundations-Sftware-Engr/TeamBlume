import React from 'react';
import newrelic from 'newrelic';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { logger } from '../components/Logger';

type NewRelicProps = {
  browserTimingHeader: string;
};

class MyDocument extends Document<NewRelicProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & NewRelicProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true
    });

    logger.info('NextJs New Relic redirecting to a page', {
      application: 'NextJs NewRelic app logging',
      test: 'Testing logging with Winston',
      pathname: ctx.pathname
    });

    return {
      ...initialProps,
      browserTimingHeader
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {CssBaseline.flush()}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
