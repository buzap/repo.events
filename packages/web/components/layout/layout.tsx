import React from 'react'
import { Header } from '@primer/react'
import Link from 'next/link'

export interface LayoutProps {
    children: React.ReactNode
}

export function Layout(props: LayoutProps) {
    return (
        <>
            <Header>
                <Header.Item>
                    <Link href="/">Repo.Event</Link>
                </Header.Item>
            </Header>
            <main>{props.children}</main>
        </>
    )
}
