import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider, BaseStyles, Box, Heading, Text, Link } from '@primer/react'
import { Settings, SettingsData } from 'core'
import { UserSettingsPrefix } from '@src/common/settings'

export function Options() {
    const [settings, setSettings] = useState<SettingsData>({
        personalAccessToken: null,
    })

    useEffect(() => {
        const keys: Array<keyof SettingsData> = ['personalAccessToken']

        const fullKeys = keys.map((k) => UserSettingsPrefix + k)
        chrome.storage.local
            .get(fullKeys)
            .then((values) => {
                const settings: { [key: string]: unknown } = {}
                for (const [key, val] of Object.entries(values || {})) {
                    let k = key
                    if (key.startsWith(UserSettingsPrefix)) {
                        k = key.slice(UserSettingsPrefix.length)
                    }
                    settings[k] = val
                }
                setSettings(settings as unknown as SettingsData)
            })
            .catch((err) => {
                console.error('unable to read user settings: ', err)
            })
    }, [])

    const onSettingChange = useCallback((updated: Partial<SettingsData>) => {
        const values: { [key: string]: unknown } = {}
        for (const [key, value] of Object.entries(updated)) {
            values[UserSettingsPrefix + key] = value
        }
        chrome.storage.local.set(values)
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
                        <Settings settings={settings} onSettingChange={onSettingChange} />
                    </Box>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}
