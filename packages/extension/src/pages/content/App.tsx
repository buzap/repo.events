import { useCallback, useMemo } from 'react'
import { ThemeProvider, BaseStyles } from '@primer/react'
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

    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Timeline owner={repo.owner} repo={repo.repo} requestAuthentication={noop} />
            </BaseStyles>
        </ThemeProvider>
    )
}
