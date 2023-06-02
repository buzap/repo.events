import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, IconButton, Link, StyledOcticon, SxProp, Text, sx } from '@primer/react'
import { GearIcon, LinkExternalIcon } from '@primer/octicons-react'
import { Octokit } from 'octokit'
import { SettingsData as Settings, Timeline, defaultOctokitOptions } from 'core'
import { Dashboard } from '../components/Dashboard'
import logo from '../assets/logo-34.png'
import styled from 'styled-components'

interface OctokitInfo {
    octokit: Octokit
    authenticated: boolean
}

const UserSettingKeyPrefix = 'us.'

export default function Page() {
    const { owner, repo } = useParams()

    useEffect(() => {
        document.title = `${owner}/${repo}: recent activities`

        const descElement = document.querySelector('head meta[name=description]')
        if (descElement) {
            descElement.setAttribute('content', `Recent activities from github repository ${owner}/${repo}`)
        }
    }, [owner, repo])

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
                ...defaultOctokitOptions(),
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

    const [scrollSensor, setScrollSensor] = useState<HTMLElement | null>()
    const [headerStuck, setHeaderStuck] = useState<boolean>(false)
    useEffect(() => {
        if (!scrollSensor) {
            return
        }
        const observer = new IntersectionObserver((entries) => {
            if (!entries) {
                return
            }
            const entry = entries[0]
            setHeaderStuck(!entry.isIntersecting)
        })
        observer.observe(scrollSensor)
        return () => {
            observer.disconnect()
        }
    }, [scrollSensor])

    if (!owner || !repo) {
        return null
    }

    let headerStuckStyles: SxProp['sx'] = {}
    if (headerStuck) {
        headerStuckStyles = {
            backgroundColor: 'canvas.overlay',
            boxShadow: 'shadow.medium',
        }
    }

    return (
        <>
            <Box ref={setScrollSensor} />
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    padding: 3,
                    ...headerStuckStyles,
                }}
            >
                <Box sx={{ display: 'flex', maxWidth: '960px', mx: 'auto' }}>
                    <Box as="span" sx={{ flexGrow: 1 }}>
                        {headerStuck && (
                            <StyledRouterLink to="/" sx={{ mr: 1 }}>
                                <Box as="img" src={logo} sx={{ width: '18px', mr: 1, verticalAlign: 'text-bottom' }} />
                                Repo.Events |
                            </StyledRouterLink>
                        )}
                        <Link
                            href={`https://github.com/${owner}/${repo}`}
                            target="_blank"
                            hoverColor="accent.fg"
                            sx={{ flexGrow: 1, color: 'fg.default', fontWeight: 'bold' }}
                        >
                            <Text>
                                {owner}/{repo}
                            </Text>
                            <StyledOcticon icon={LinkExternalIcon} sx={{ ml: 1 }} />
                        </Link>
                    </Box>
                    <IconButton icon={GearIcon} aria-label="Settings" size="small" onClick={openDashboard} />
                </Box>
            </Box>
            <Box sx={{ maxWidth: '960px', mx: 'auto' }}>
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

const StyledRouterLink = styled(RouterLink)`
    ${sx}
`
