// src/app/layout.jsx
"use client"; // Mark this component as a client component
import { ChakraProvider, Box } from "@chakra-ui/react";
import Head from "next/head";
import NProgress from 'nprogress'; // Import NProgress for loading indicators
import { useEffect } from 'react';
import NavBar from './components/NavBar'; // Make sure the casing is correct
import Footer from './components/Fotter'

// Configure NProgress
NProgress.configure({ showSpinner: false });

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();

    window.addEventListener('popstate', () => NProgress.done());

    return () => {
      window.removeEventListener('popstate', () => NProgress.done());
    };
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Real Estate</title>
        <meta name="description" content="A brief description of the real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ChakraProvider>
          <Box maxWidth='1280px' m='auto' p={4}>
            <NavBar /> {/* Ensure NavBar is correctly included */}
            <main>{children}</main>
          </Box>
          <Footer/>
        </ChakraProvider>
      </body>
    </html>
  );
}
