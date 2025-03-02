import '../styles/globals.css';
import '../styles/brand.css';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Banner } from '../components/Banner'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { trackPageView } from '../utils/analytics'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Banner />
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
