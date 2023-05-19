import { Link, Outlet } from 'react-router-dom'
import { Header, Text, Box } from '@primer/react'
import { MarkGithubIcon } from '@primer/octicons-react'

export function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header>
                <Header.Item full>
                    <Link to="/">
                        <Text sx={{ fontWeight: 'bold' }}>Repo.Events</Text>
                    </Link>
                </Header.Item>
                <Header.Item sx={{ mr: 0 }}>
                    <Link to="https://github.com/buzap/repo.event" target="_blank">
                        <MarkGithubIcon size={20} />
                    </Link>
                </Header.Item>
            </Header>
            <Box as="main" sx={{ flexGrow: 1, backgroundColor: 'canvas.default', position: 'relative' }}>
                <Outlet />
            </Box>
        </Box>
    )
}
