import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { trackPageView } from '../utils/analytics';
import { Banner } from '../components/Banner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';

// Dynamically import heavy components
const Navigation = dynamic(() => import('../components/Navigation'), {
  ssr: true,
});

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

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
