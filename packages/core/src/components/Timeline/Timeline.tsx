import { useState, useEffect, useRef } from 'react'
import { SxProp, Box } from '@primer/react'
import { Octokit } from 'octokit'
import { LoadDrive } from './LoadDrive'
import { EventLoader, TimelineItem } from './eventLoader'
import { Row } from './Row'
import { LoadingError } from './LoadingError'

export interface TimelineProps extends SxProp {
    owner: string
    repo: string
    requestAuthentication: () => void
    octokit?: Octokit
    octokitAuthenticated?: boolean
}

export function Timeline(props: TimelineProps) {
    const [items, setItems] = useState<TimelineItem[]>([])
    const loaderRef = useRef<(() => Promise<void>) | null>(null)
    const [loadingErr, setLoadingErr] = useState<unknown | null>(null)
    const [allLoaded, setAllLoaded] = useState<boolean>(false)

    useEffect(() => {
        let octo = props.octokit
        if (!octo) {
            octo = new Octokit({})
        }
        const loader = new EventLoader(octo, props.owner, props.repo)
        const next = async () => {
            try {
                const result = await loader.nextEvents()
                setItems((original) => [...original, ...result.items])
                setAllLoaded(result.done)
            } catch (err) {
                console.warn('request error', err)
                setLoadingErr(err)
            }
        }
        loaderRef.current = next

        setItems([])
        // next()
    }, [props.owner, props.repo, props.octokit])

    let footer: React.ReactNode = (
        <LoadDrive requestLoad={loaderRef.current || noopLoader} maxAutomaticLoad={16} sx={{ marginTop: 3 }} />
    )
    if (allLoaded) {
        footer = null
    }
    if (loadingErr !== null) {
        footer = (
            <LoadingError
                error={loadingErr}
                authenticated={!!props.octokitAuthenticated}
                requestAuthentication={props.requestAuthentication}
            />
        )
    }

    return (
        <Box sx={props.sx}>
            <Box>
                {items.map((item) => (
                    <Row key={item.id} item={item} />
                ))}
                {footer}
            </Box>
        </Box>
    )
}

async function noopLoader(): Promise<void> {
    // noop
}
