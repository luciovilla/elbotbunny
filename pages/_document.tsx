import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="AI Bad Bunny lyrics generator" />
          <meta property="og:site_name" content="El Bot Bunny" />
          <meta
            property="og:description"
            content="AI Bad Bunny lyrics generator"
          />
          <meta property="og:title" content="El Bot Bunny" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="El Bot Bunny" />
          <meta
            name="twitter:description"
            content="AI Bad Bunny lyrics generator"
          />
          <meta property="og:image" content="https://elbotbunny.com/og.png" />
          <meta name="twitter:image" content="https://elbotbunny.com/og.png" />
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
