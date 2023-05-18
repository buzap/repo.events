import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, BaseStyles } from '@primer/react'
import { Layout } from '@/components/Layout'
import './_app.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="See what's happening in a github repository at a glance" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider colorMode="dark">
                <BaseStyles>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </BaseStyles>
            </ThemeProvider>
        </>
    )
}
