import { SxProp } from '@primer/react'
import { GithubEvent, PushEvent as PushEventData } from '../types/github'
import { IssuesEvent } from './events/IssuesEvent'
import { IssueCommentEvent } from './events/IssueCommentEvent'
import { PushEvent } from './events/PushEvent'
import { PullRequestEvent } from './events/PullRequestEvent'

export interface EventRowProps extends SxProp {
    event: GithubEvent
}

export function EventRow(props: EventRowProps) {
    switch (props.event.type) {
        // case 'WatchEvent':
        // return WatchEventRow(props)
        case 'IssuesEvent':
            return <IssuesEvent {...props} />
        case 'IssueCommentEvent':
            return <IssueCommentEvent {...props} />
        case 'PushEvent':
            return <PushEvent {...props} event={props.event as PushEventData} />
        case 'PullRequestEvent':
            return <PullRequestEvent {...props} />
        default:
            console.warn(`unkown event type ${props.event.type}`, props.event)
            return null
    }
}
