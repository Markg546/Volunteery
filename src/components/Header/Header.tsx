import Head from 'next/head'

const Header = () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>Volunteery</title>

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/manifestIcons/volunteeryIcon1.png"></link>
      <meta name="theme-color" content="#258AFF"/>
    </Head>
  </div>
)

export default Header
