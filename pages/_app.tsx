import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import Modal from "react-modal";
// _app.tsx

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
  return (
    <Layout data-theme="light">
      <Component {...pageProps} />
    </Layout>
  )
}
