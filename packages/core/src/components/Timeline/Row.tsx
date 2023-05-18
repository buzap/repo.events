import { Box, SxProp } from '@primer/react'
import { PushEvent as PushEventData } from '../../types/github'
import { IssuesEvent } from './events/IssuesEvent'
import { IssueCommentEvent } from './events/IssueCommentEvent'
import { PushEvent } from './events/PushEvent'
import { PullRequestEvent } from './events/PullRequestEvent'
import { TimelineItem } from './eventLoader'
import { Stack } from './events/Stack'

export interface RowProps extends SxProp {
    item: TimelineItem
}

export function Row(props: RowProps) {
    const content = renderRowContent(props.item)
    if (content === null) {
        return null
    }

    return (
        <Box
            sx={{
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: 'border.subtle',
                paddingY: 2,
                ...props.sx,
            }}
        >
            {content}
        </Box>
    )
}

function renderRowContent(item: TimelineItem): React.ReactNode {
    if (item.type === 'stack') {
        return <Stack eventType={item.eventType} events={item.value} />
    }
    if (item.type === 'single') {
        switch (item.value.type) {
            case 'IssuesEvent':
                return <IssuesEvent event={item.value} />
            case 'IssueCommentEvent':
                return <IssueCommentEvent event={item.value} />
            case 'PushEvent':
                return <PushEvent event={item.value as PushEventData} />
            case 'PullRequestEvent':
                return <PullRequestEvent event={item.value} />
            default:
                console.warn(`unkown event type ${item.value.type}`, item)
                return null
        }
    }
    console.error(`unknown timeline item type`, item)
    return null
}
