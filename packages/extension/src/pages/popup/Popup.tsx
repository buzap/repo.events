import { useCallback } from 'react'
import { ThemeProvider, BaseStyles, Box, ActionList } from '@primer/react'
import { MarkGithubIcon, GearIcon } from '@primer/octicons-react'

function Popup() {
    const onViewSourceOnGithub = useCallback(() => {
        chrome.tabs.create({ url: 'https://github.com/buzap/repo.events' })
    }, [])

    const openOptions = useCallback(() => {
        chrome.runtime.openOptionsPage()
    }, [])

    return (
        <ThemeProvider colorMode="dark">
            <BaseStyles>
                <Box sx={{ width: '15rem', backgroundColor: 'canvas.default' }}>
                    <ActionList>
                        <ActionList.Item onClick={openOptions}>
                            <ActionList.LeadingVisual>
                                <GearIcon />
                            </ActionList.LeadingVisual>
                            Options
                        </ActionList.Item>
                        <ActionList.Divider />
                        <ActionList.Item onClick={onViewSourceOnGithub}>
                            <ActionList.LeadingVisual>
                                <MarkGithubIcon />
                            </ActionList.LeadingVisual>
                            Star on github
                        </ActionList.Item>
                    </ActionList>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}

export default Popup
