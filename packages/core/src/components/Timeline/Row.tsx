import { SxProp } from '@primer/react'
import { PushEvent as PushEventData } from '../../types/github'
import { IssuesEvent } from './events/IssuesEvent'
import { IssueCommentEvent } from './events/IssueCommentEvent'
import { PushEvent } from './events/PushEvent'
import { PullRequestEvent } from './events/PullRequestEvent'
import { TimelineItem } from './eventLoader'
import { Stack } from './events/Stack'
import { PullRequestReviewEvent } from './events/PullRequestReviewEvent'
import { PullRequestReviewCommentEvent } from './events/PullRequestReviewCommentEvent'

export interface RowProps extends SxProp {
    item: TimelineItem
}

export function Row(props: RowProps) {
    const { item } = props

    if (item.type === 'stack') {
        return <Stack eventType={item.eventType} events={item.value} />
    }
    if (item.type === 'event') {
        switch (item.value.type) {
            case 'IssuesEvent':
                return <IssuesEvent event={item.value} />
            case 'IssueCommentEvent':
                return <IssueCommentEvent event={item.value} />
            case 'PushEvent':
                return <PushEvent event={item.value as PushEventData} />
            case 'PullRequestEvent':
                return <PullRequestEvent event={item.value} />
            case 'PullRequestReviewEvent':
                return <PullRequestReviewEvent event={item.value} />
            case 'PullRequestReviewCommentEvent':
                return <PullRequestReviewCommentEvent event={item.value} />
            default:
                return null
        }
    }
    console.error(`unknown timeline item type`, item)
    return null
}
