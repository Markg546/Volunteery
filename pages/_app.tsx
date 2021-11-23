import '../public/styles/globals.css'

import { AppProps } from 'next/app'

import Layout from '../src/components/Layout/Layout'
import Error from '../src/components/Error/Error'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div>
    <div className="md:hidden">
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </div>
    <div className="hidden md:block">
      <Error/>
    </div>
  </div>
)

export default MyApp
