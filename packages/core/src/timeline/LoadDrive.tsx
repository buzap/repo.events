import { useCallback, useEffect, useRef, useState } from 'react'
import { SxProp, Box, Button, Spinner } from '@primer/react'
import { SyncIcon } from '@primer/octicons-react'

export interface LoadDriveProps extends SxProp {
    maxAutomaticLoad: number
    requestLoad: () => Promise<void>
}

export function LoadDrive(props: LoadDriveProps) {
    const { requestLoad } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) {
            return
        }

        let loadCount = 0
        const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (!entries || entries.length == 0) {
                return
            }
            const entry = entries[0]
            if (!entry.isIntersecting) {
                return
            }
            loadCount++
            if (loadCount > props.maxAutomaticLoad) {
                observer.disconnect()
                return
            }
            setLoading(true)
            requestLoad().finally(() => {
                setLoading(false)
            })
        }

        const observer = new IntersectionObserver(onIntersect, {
            root: null, // to use the viewport as the root
            threshold: 0,
        })
        observer.observe(container)
        return () => {
            observer.disconnect()
        }
    }, [props.maxAutomaticLoad, requestLoad])

    const onManualRequest = useCallback(() => {
        setLoading(true)
        requestLoad().finally(() => {
            setLoading(false)
        })
    }, [requestLoad])

    let content: React.ReactNode = null
    if (loading) {
        content = <Spinner />
    } else {
        content = (
            <Button leadingIcon={SyncIcon} aria-label="load more" onClick={onManualRequest}>
                Load More
            </Button>
        )
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                ...props.sx,
            }}
        >
            {content}
        </Box>
    )
}
