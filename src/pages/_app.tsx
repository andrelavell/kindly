import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { Banner } from '../components/Banner'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { trackPageView } from '../utils/analytics'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="apple-mobile-web-app-title" content="Kindly" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="min-h-screen">
        <Banner />
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}
