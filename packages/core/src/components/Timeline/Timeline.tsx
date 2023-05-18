import { useState, useEffect, useMemo } from 'react'
import { SxProp, Box, TabNav } from '@primer/react'
import { Octokit } from 'octokit'
import { LoadDrive } from './LoadDrive'
import { EventLoader, TimelineItem } from './eventLoader'
import { Row } from './Row'

export interface TimelineProps extends SxProp {
    owner: string
    repo: string
}

export function Timeline(props: TimelineProps) {
    const [items, setItems] = useState<TimelineItem[]>([])

    const loader = useMemo(() => {
        const octo = new Octokit({})
        const loader = new EventLoader(octo, props.owner, props.repo)
        const next = async () => {
            const items = await loader.nextEvents()
            setItems((original) => [...original, ...items])
        }
        return { next }
    }, [props.owner, props.repo])

    useEffect(() => {
        setItems([])
    }, [props.owner, props.repo])

    return (
        <Box sx={props.sx}>
            <TabNav>
                <TabNav.Link href="#" selected>
                    All
                </TabNav.Link>
                <TabNav.Link href="#">Push</TabNav.Link>
                <TabNav.Link href="#">Issues</TabNav.Link>
            </TabNav>
            <Box>
                {items.map((item) => (
                    <Row key={item.id} item={item} />
                ))}
                <LoadDrive requestLoad={loader.next} maxAutomaticLoad={5} sx={{ marginTop: 3 }} />
            </Box>
        </Box>
    )
}
