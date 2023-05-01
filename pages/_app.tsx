import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import Modal from "react-modal";

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
