import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@primer/react'
import { Layout } from '@/components/layout'
import './_app.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="viewport-fit=cover" />
                <meta name="description" content="See what's happening in a github repository at a glance" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}
