import '../styles/globals.css';
import '../styles/webapp.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import { Analytics } from '@vercel/analytics/react';

import { createTheme, NextUIProvider } from '@nextui-org/react';

// Check that PostHog is client-side
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

function MyApp({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const theme = createTheme({
    type: 'dark', // it could be "light" or "dark"
    theme: {
      colors: {
        // brand colors
        // primaryLight: '$green200',
        // primaryLightHover: '$green300',
        // primaryLightActive: '$green400',
        // primaryLightContrast: '$green600',
        primary: '#4ADE7B',
        primaryBorder: '$green500',
        primaryBorderHover: '$green600',
        primarySolidHover: '$green700',
        primarySolidContrast: '$white',
        primaryShadow: '$green500'

        // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        // link: '#5E1DAD',

        // // you can also create your own color
        // myColor: '#ff4ecd'

        // ...  more colors
      },
      space: {},
      fonts: {}
    }
  });

  return (
    <NextUIProvider theme={theme}>
      <PostHogProvider client={posthog}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
          <Analytics />
        </SessionContextProvider>
      </PostHogProvider>
    </NextUIProvider>
  );
}

export default MyApp;
