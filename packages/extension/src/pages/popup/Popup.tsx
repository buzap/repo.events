import { useCallback } from 'react'
import { ThemeProvider, BaseStyles, Box, ActionList } from '@primer/react'
import { MarkGithubIcon } from '@primer/octicons-react'

function Popup() {
    const onViewSourceOnGithub = useCallback(() => {
        chrome.tabs.create({ url: 'https://github.com/buzap/repo.events' })
    }, [])

    return (
        <ThemeProvider colorMode="dark">
            <BaseStyles>
                <Box sx={{ width: '20rem', backgroundColor: 'canvas.default' }}>
                    <ActionList>
                        <ActionList.Item onClick={onViewSourceOnGithub}>
                            <ActionList.LeadingVisual>
                                <MarkGithubIcon />
                            </ActionList.LeadingVisual>
                            View source on github
                        </ActionList.Item>
                    </ActionList>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}

export default Popup
