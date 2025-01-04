import type { AppProps } from 'next/app'
import { Banner } from '../components/Banner'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Banner />
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
