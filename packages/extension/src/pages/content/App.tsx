import { useCallback, useMemo } from 'react'
import { ThemeProvider, BaseStyles, Box } from '@primer/react'
import { Octokit } from 'octokit'
import { Timeline } from 'core'
import { getRepoFromLocation } from './util'

export function App() {
    const noop = useCallback(() => {
        // noop
    }, [])

    const repo = useMemo(() => {
        return getRepoFromLocation()
    }, [])
    if (!repo) {
        return null
    }

    const octo = useMemo(() => {
        return new Octokit({})
    }, [])

    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Box sx={{ maxWidth: '1280px', marginX: 'auto', marginTop: 4, paddingX: [3, 4, 4] }}>
                    <Timeline owner={repo.owner} repo={repo.repo} requestAuthentication={noop} octokit={octo} />
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}
