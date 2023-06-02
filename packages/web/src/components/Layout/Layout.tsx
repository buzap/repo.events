import { Link, Outlet } from 'react-router-dom'
import { Header, Text, Box, sx } from '@primer/react'
import logo from '../../assets/logo.png'
import styled from 'styled-components'

export function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header>
                <Header.Item>
                    <StyledLink to="/" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Box as="img" src={logo} sx={{ width: '32px', height: '32px' }} />
                        <Text sx={{ fontWeight: 'bold' }}>Repo.Events</Text>
                    </StyledLink>
                </Header.Item>
                <Header.Item>
                    <StyledLink to="/about">What's this</StyledLink>
                </Header.Item>
                <Header.Item>
                    <StyledLink
                        to="https://chrome.google.com/webstore/detail/repoevents/feffmdfhanmdkmeepnmcdpjagojedlol"
                        target="_blank"
                    >
                        Browser extension
                    </StyledLink>
                </Header.Item>
                <Header.Item sx={{ mr: 0 }}>
                    <Link to="https://github.com/buzap/repo.event" target="_blank">
                        Source code
                    </Link>
                </Header.Item>
            </Header>
            <Box as="main" sx={{ flexGrow: 1, backgroundColor: 'canvas.default', position: 'relative' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

const StyledLink = styled(Link)`
    ${sx}
`
