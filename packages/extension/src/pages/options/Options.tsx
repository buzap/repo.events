import { useState, useEffect, useCallback, useRef } from 'react'
import { ThemeProvider, BaseStyles, Box, Heading, Text, Link } from '@primer/react'
import { Settings as SettingsComponent, SettingsData } from 'core'
import { Settings } from '@src/common/settings'

export function Options() {
    const [settingsData, setSettingsData] = useState<SettingsData>({
        personalAccessToken: null,
    })
    const settings = useRef(new Settings())

    useEffect(() => {
        settings.current
            .getAllUserSettings()
            .then((settings) => {
                setSettingsData(settings)
            })
            .catch((err) => {
                console.error('unable to read user settings: ', err)
            })
    }, [])

    const onSettingChange = useCallback((updated: Partial<SettingsData>) => {
        settings.current.setUserSettings(updated)
    }, [])

    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Box sx={{ backgroundColor: 'canvas.default', minHeight: '100vh' }}>
                    <Box sx={{ maxWidth: '760px', paddingX: 4, paddingY: 4 }}>
                        <Box
                            as="header"
                            sx={{
                                marginBottom: 5,
                                borderBottomColor: 'border.default',
                                borderBottomWidth: '1px',
                                borderBottomStyle: 'solid',
                            }}
                        >
                            <Heading as="h1">
                                <Text>Repo.Events</Text>
                                <Text sx={{ color: 'fg.muted' }}> options</Text>
                            </Heading>
                            <Box as="section" sx={{ color: 'fg.muted', fontSize: '14px' }}>
                                <Box as="p">
                                    Repo.Events inject an &quot;Activity&quot; tab into a github repository page that
                                    shows recent activities of the repository.
                                </Box>
                                <Box as="p">
                                    The source code of this browser is at{' '}
                                    <Link href="https://github.com/buzap/repo.events">
                                        https://github.com/buzap/repo.events
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        <SettingsComponent settings={settingsData} onSettingChange={onSettingChange} />
                    </Box>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}
