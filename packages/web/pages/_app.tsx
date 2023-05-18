import type { AppProps } from 'next/app'
import { ThemeProvider } from '@primer/react'
import { Layout } from '@/components/layout'
import './_app.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}
