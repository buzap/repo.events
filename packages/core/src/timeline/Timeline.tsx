import { useState, useEffect, useMemo } from 'react'
import { SxProp, Box, TabNav } from '@primer/react'
import { Octokit } from 'octokit'
import { GithubEvent } from '../types/github'
import { EventRow } from './EventRow'
import { LoadDrive } from './LoadDrive'

export interface TimelineProps extends SxProp {
    owner: string
    repo: string
}

export function Timeline(props: TimelineProps) {
    const [events, setEvents] = useState<GithubEvent[]>([])

    const iterator = useMemo(() => {
        const octo = new Octokit({})
        const req = octo.paginate.iterator(octo.rest.activity.listRepoEvents, {
            owner: props.owner,
            repo: props.repo,
        })
        const iterator = req[Symbol.asyncIterator]()
        const next = async () => {
            const resp = await iterator.next()
            if (resp.done) {
                return
            }
            setEvents((original) => {
                return [...original, ...resp.value.data]
            })
        }
        return {
            next,
        }
    }, [props.owner, props.repo])

    useEffect(() => {
        setEvents([])
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
                {events.map((event) => (
                    <EventRow key={event.id} event={event} />
                ))}
                <LoadDrive requestLoad={iterator.next} maxAutomaticLoad={5} sx={{ marginTop: 3 }} />
            </Box>
        </Box>
    )
}
