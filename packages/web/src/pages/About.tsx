import { useCallback, useState } from 'react'
import { Box, Text, IconButton, Heading, Link, sx } from '@primer/react'
import styled from 'styled-components'
import { Timeline } from 'core'
import { SyncIcon } from '@primer/octicons-react'
import { RepoIdentifier, getRandomRepo } from '../utils/randomRepo'
import extensionScreenshot from '../assets/extension_screenshot.png'

export default function About() {
    const noop = useCallback(() => {
        // noop
    }, [])

    const [demoRepo, setDemoRepo] = useState<RepoIdentifier>({ owner: 'facebook', repo: 'react' })
    const setRandomDemoRepo = useCallback(() => {
        setDemoRepo(getRandomRepo())
    }, [])

    return (
        <Box sx={{ maxWidth: '960px', mx: 'auto', px: 3, py: 3, mb: 6 }}>
            <Box as="header" sx={{ marginBottom: 4 }}>
                <Heading as="h1">Repo.Events</Heading>
            </Box>
            <Box sx={{ my: 3 }}>
                Repo.Events shows you recent activities of a github repository, giving you a quick overview of what's
                happening in the github repository.
            </Box>
            <Box>
                <Box sx={{ margin: 3, height: '400px' }}>
                    <Box
                        sx={{
                            height: '570px',
                            transform: 'scale(0.7)',
                            transformOrigin: 'top center',
                            backgroundColor: 'canvas.overlay',
                            boxShadow: 'shadow.extraLarge',
                        }}
                    >
                        <Timeline
                            owner={demoRepo.owner}
                            repo={demoRepo.repo}
                            requestAuthentication={noop}
                            sx={{
                                height: '100%',
                                overflow: 'auto',
                                padding: 4,
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', color: 'fg.muted' }}>
                    <Text>Recent activities of </Text>
                    <Text sx={{ ml: 1 }}>
                        {demoRepo.owner}/{demoRepo.repo}
                    </Text>
                    <IconButton
                        icon={SyncIcon}
                        size="small"
                        variant="invisible"
                        onClick={setRandomDemoRepo}
                        aria-label="change suggestions"
                        sx={{ mr: 1, verticalAlign: 'middle' }}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 3 }}>
                Use the search box in the <Link href="/">Home</Link> to see activities from a github repository. As a
                shortcut, enter <Text as="code">repo.events/&#123;owner&#125;/&#123;repo&#125;</Text> to your browser
                address bar to see activities from the repository immediately. For example{' '}
                <Link href="https://repo.events/golang/go">repo.events/golang/go </Link>
                or <Link href="https://repo.events/apple/swift">repo.events/apple/swift</Link>.
            </Box>
            <Box as="section" sx={{ marginTop: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4 }}>
                    Browser extension
                </Heading>
                <Box sx={{ my: 3 }}>
                    There is a browser extension too. The browser extension add a "Activities" tab to the github
                    repository page, so you can see activities of the repository without open a new browser tab.
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box as="img" src={extensionScreenshot} sx={{ height: '400px' }} />
                        <Box sx={{ color: 'fg.muted' }}>Screenshot of the browser extension</Box>
                    </Box>
                </Box>
                <Box sx={{ my: 3 }}>
                    Download the browser extension from{' '}
                    <Link href="https://chrome.google.com/webstore/detail/repoevents/feffmdfhanmdkmeepnmcdpjagojedlol">
                        Chrome webstore
                    </Link>
                </Box>
            </Box>
            <Box as="section" sx={{ marginTop: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4 }}>
                    Open source
                </Heading>
                <Box sx={{ my: 3 }}>
                    Repo.Events is open source! If you find it useful, consider give it a star at{' '}
                    <Link href="https://github.com/buzap/repo.events">github.com/buzap/repo.events</Link>
                </Box>
            </Box>
        </Box>
    )
}

const Paragraph = styled.div`
    margin: 1rem 0;
    ${sx}
`
