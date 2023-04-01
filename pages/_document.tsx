import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Generate Bad Bunny lyrics." />
          <meta property="og:site_name" content="El Bot Bunny" />
          <meta
            property="og:description"
            content="Generate Bad Bunny lyrics."
          />
          <meta property="og:title" content="AI Bad Bunny Lyrics Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Bad Bunny Lyrics Generator" />
          <meta
            name="twitter:description"
            content="Generate Bad Bunny lyrics."
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
