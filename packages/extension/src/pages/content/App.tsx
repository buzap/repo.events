import { useEffect, useCallback, useState } from 'react'
import { ThemeProvider, BaseStyles, Box } from '@primer/react'
import { Octokit } from 'octokit'
import { Timeline, defaultOctokitOptions } from 'core'
import { Settings } from '@src/common/settings'

export function App(props: { owner: string; repo: string }) {
    const [octoClient, setOctoClient] = useState<Octokit | null>(null)

    useEffect(() => {
        const settings = new Settings()
        settings
            .getUserSettings({ personalAccessToken: null })
            .then((values) => {
                const client = new Octokit({ auth: values.personalAccessToken, ...defaultOctokitOptions() })
                setOctoClient(client)
            })
            .catch((err) => {
                console.error('unable to retrieve settings', err)
            })

        const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }) => {
            const expectedKey = Settings.genUserSettingKey('personalAccessToken')
            let change: chrome.storage.StorageChange | null = null
            for (const [key, c] of Object.entries(changes)) {
                if (key === expectedKey) {
                    change = c
                    break
                }
            }
            if (!change) {
                return
            }
            const client = new Octokit({ auth: change.newValue })
            setOctoClient(client)
        }
        settings.onChanged.addListener(onChanged)
        return () => {
            settings.onChanged.removeListener(onChanged)
        }
    }, [])

    const onRequestAuthentication = useCallback(() => {
        chrome.runtime.sendMessage('openOptionsPage')
    }, [])

    let content: React.ReactNode = null
    if (octoClient) {
        content = (
            <Timeline
                owner={props.owner}
                repo={props.repo}
                octokit={octoClient}
                requestAuthentication={onRequestAuthentication}
            />
        )
    }

    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Box sx={{ maxWidth: '1280px', marginX: 'auto', marginTop: 4, paddingX: [3, 4, 4] }}>{content}</Box>
            </BaseStyles>
        </ThemeProvider>
    )
}
