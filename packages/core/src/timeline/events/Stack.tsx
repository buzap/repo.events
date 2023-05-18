import { Avatar, Box, Text, SxProp, RelativeTime, IconButton, sx } from '@primer/react'
import { UnfoldIcon, FoldIcon } from '@primer/octicons-react'
import { GithubEvent } from '../../types/github'
import { Actor, StateLabel, StateLabelProps } from '../../components'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

export interface StackProps extends SxProp {
    events: GithubEvent[]
    eventType: 'WatchEvent' | 'ForkEvent'
}

const COLLAPSE_LIMIT = 5

export function Stack(props: StackProps) {
    const { events } = props
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDetails = useCallback(() => {
        setIsOpen((v) => !v)
    }, [setIsOpen])

    let status: StateLabelProps['status'] = ''
    let statusText = ''
    let summary: React.ReactNode = null
    let action = ''
    switch (props.eventType) {
        case 'WatchEvent':
            status = 'starred'
            statusText = 'Star'
            summary = 'Starred the repository'
            action = 'starred'
            break
        case 'ForkEvent':
            status = 'forked'
            statusText = 'Fork'
            summary = 'Forked the repository'
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
        <StyledDetails open={isOpen} sx={{ ...props.sx }}>
            <Box as="summary">
                <Box
                    onClick={toggleDetails}
                    sx={{ display: 'flex', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                    <Box as="span" sx={{ flexGrow: 1 }}>
                        {shownEvents.map((event) => (
                            <Avatar key={event.id} src={event.actor.avatar_url} size={26} sx={{ mr: 1 }} />
                        ))}
                        {collapsedEvents > 0 && (
                            <Text sx={{ ml: 1, verticalAlign: 'middle', color: 'fg.muted' }}>
                                and {collapsedEvents} others
                            </Text>
                        )}
                    </Box>
                    <IconButton
                        aria-label="toggle details"
                        icon={isOpen ? FoldIcon : UnfoldIcon}
                        size="small"
                        variant="invisible"
                        onClick={() => toggleDetails}
                    />
                </Box>
                <Box sx={{ mt: 2, ml: '32px' }}>
                    <StateLabel status={status} variant="small" sx={{ verticalAlign: 'middle' }}>
                        {statusText}
                    </StateLabel>
                    <Text sx={{ verticalAlign: 'middle', ml: 1, color: 'fg.muted' }}>{summary}</Text>
                </Box>
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
        </StyledDetails>
    )
}

const StyledDetails = styled.details`
    & > summary {
        list-style: none;
    }
    & > summary::-webkit-details-marker {
        display: none;
    }
    ${sx};
`
