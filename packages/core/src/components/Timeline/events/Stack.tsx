import { useCallback } from 'react'
import { Avatar, Box, Text, SxProp, RelativeTime, IconButton, Details, useDetails } from '@primer/react'
import { UnfoldIcon, FoldIcon } from '@primer/octicons-react'
import { GithubEvent } from '../../../utils/github'
import { Actor } from '../../../components/Actor'
import { Row } from './common/Row'

export interface StackProps extends SxProp {
    events: GithubEvent[]
    eventType: 'WatchEvent' | 'ForkEvent'
}

const COLLAPSE_LIMIT = 5

export function Stack(props: StackProps) {
    const { events } = props
    const { getDetailsProps, open, setOpen } = useDetails({ defaultOpen: false, closeOnOutsideClick: false })
    const toggleDetails = useCallback(() => {
        setOpen((v) => !v)
    }, [setOpen])

    let summary: React.ReactNode = null
    let action = ''
    switch (props.eventType) {
        case 'WatchEvent':
            summary = 'starred the repository'
            action = 'starred'
            break
        case 'ForkEvent':
            summary = 'forked the repository'
            action = 'forked'
            break
    }

    let shownEvents = events
    let collapsedEvents = 0
    if (events.length > COLLAPSE_LIMIT) {
        shownEvents = events.slice(0, COLLAPSE_LIMIT)
        collapsedEvents = events.length - COLLAPSE_LIMIT
    }

    return (
        <Row sx={{ ...props.sx }}>
            <Details {...getDetailsProps()}>
                <Box
                    as="summary"
                    sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        paddingY: 1,
                        '&:hover': {
                            backgroundColor: 'canvas.subtle',
                        },
                    }}
                >
                    <Box as="span" sx={{ flexGrow: 1 }}>
                        {shownEvents.map((event) => (
                            <Avatar key={event.id} src={event.actor.avatar_url} size={20} sx={{ mr: 1 }} />
                        ))}

                        <Text sx={{ ml: 1, verticalAlign: 'middle', color: 'fg.muted' }}>
                            {collapsedEvents > 0 && <>and {collapsedEvents} others </>}
                            {summary}
                        </Text>
                    </Box>
                    <IconButton
                        aria-label="toggle details"
                        icon={open ? FoldIcon : UnfoldIcon}
                        size="small"
                        variant="invisible"
                        onClick={toggleDetails}
                    />
                </Box>
                <Box sx={{ ml: '32px', mt: 2 }}>
                    {events.map((event) => (
                        <Box key={event.id} sx={{ mt: 1, fontSize: 1 }}>
                            <Actor avatarSize={20} actor={event.actor} />
                            <Text sx={{ ml: 1 }}>{action} </Text>
                            <RelativeTime datetime={event.created_at || ''} title={event.created_at || ''} />
                        </Box>
                    ))}
                </Box>
            </Details>
        </Row>
    )
}
