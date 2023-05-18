import React from 'react'
import { Header, Text, Box } from '@primer/react'
import { MarkGithubIcon } from '@primer/octicons-react'
import Link from 'next/link'

export interface LayoutProps {
    children: React.ReactNode
}

export function Layout(props: LayoutProps) {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header>
                <Header.Item full>
                    <Link href="/">
                        <Text sx={{ fontWeight: 'bold' }}>Repo.Event</Text>
                    </Link>
                </Header.Item>
                <Header.Item sx={{ mr: 0 }}>
                    <Link href="https://github.com/buzap/repo.event" target="_blank">
                        <MarkGithubIcon size={20} />
                    </Link>
                </Header.Item>
            </Header>
            <Box as="main" sx={{ flexGrow: 1, backgroundColor: 'canvas.default', position: 'relative' }}>
                {props.children}
            </Box>
        </Box>
    )
}
