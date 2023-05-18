import { useRouter } from 'next/router'
import { Box, IconButton, Link } from '@primer/react'
import { GearIcon } from '@primer/octicons-react'
import { Octokit } from 'octokit'
import { Dashboard, Settings, Timeline } from 'core'
import { useCallback, useEffect, useRef, useState } from 'react'

interface OctokitInfo {
    octokit: Octokit
    authenticated: boolean
}

const UserSettingKeyPrefix = 'us.'

export default function Page(props: { params: { owner: string; repo: string } }) {
    const router = useRouter()
    const { owner, repo } = router.query

    const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false)
    const [settings, setSettings] = useState<Settings>({
        personalAccessToken: null,
    })
    const [octokit, setOctokit] = useState<OctokitInfo>()

    useEffect(() => {
        const settings: Settings = {
            personalAccessToken: localStorage.getItem(UserSettingKeyPrefix + 'personalAccessToken'),
        }
        setSettings(settings)
        const octo: OctokitInfo = {
            octokit: new Octokit({
                auth: settings.personalAccessToken,
            }),
            authenticated: !!settings.personalAccessToken,
        }
        setOctokit(octo)
    }, [])

    const transientSettings = useRef<Partial<Settings>>({})
    const onSettingChange = useCallback((updated: Partial<Settings>) => {
        transientSettings.current = { ...transientSettings.current, ...updated }
    }, [])
    const openDashboard = useCallback(() => {
        setIsDashboardOpen(true)
        transientSettings.current = {}
    }, [])
    const closeDashboard = useCallback(() => {
        setIsDashboardOpen(false)

        for (const [key, value] of Object.entries(transientSettings.current)) {
            if (value === null || value === undefined) {
                localStorage.removeItem(UserSettingKeyPrefix + key)
                return
            }
            let v: string
            if (typeof value === 'string') {
                v = value
            } else if (typeof (value as any).toString === 'function') {
                v = (value as any).toString()
            } else {
                v = JSON.stringify(value)
            }
            localStorage.setItem(UserSettingKeyPrefix + key, v)
        }
        setSettings((original) => {
            return { ...original, ...transientSettings.current }
        })

        const token = transientSettings.current.personalAccessToken
        if (token !== settings.personalAccessToken) {
            const octo = new Octokit({ auth: token })
            setOctokit({
                octokit: octo,
                authenticated: !!token,
            })
        }
    }, [settings])

    if (!owner || !repo) {
        return null
    }

    return (
        <>
            <Box sx={{ maxWidth: '960px', mx: 'auto', px: 3, py: 3 }}>
                <Box sx={{ display: 'flex', marginBottom: 3 }}>
                    <Link
                        href={`https://github.com/${owner}/${repo}`}
                        hoverColor="accent.fg"
                        sx={{ flexGrow: 1, color: 'fg.default', fontWeight: 'bold' }}
                    >
                        {owner}/{repo}
                    </Link>
                    <IconButton icon={GearIcon} aria-label="Settings" size="small" onClick={openDashboard} />
                </Box>
                <Timeline
                    owner={owner as string}
                    repo={repo as string}
                    octokit={octokit?.octokit}
                    octokitAuthenticated={octokit?.authenticated}
                    requestAuthentication={openDashboard}
                />
            </Box>
            <Dashboard
                isOpen={isDashboardOpen}
                onDismiss={closeDashboard}
                settings={settings}
                onSettingChange={onSettingChange}
            />
        </>
    )
}
