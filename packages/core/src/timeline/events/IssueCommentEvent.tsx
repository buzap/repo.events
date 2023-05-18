import { SxProp } from '@primer/react'
import { GithubEvent } from '../../types/github'
import { Base } from './Base'
import { SecondaryHeadline } from './common'
import { CommentIcon } from '@primer/octicons-react'

export interface IssueCommentEventProps extends SxProp {
    event: GithubEvent
}

export function IssueCommentEvent(props: IssueCommentEventProps) {
    const event = props.event
    const payload = event.payload
    const issue = payload.issue

    let description: React.ReactNode = null
    let headline: React.ReactNode = null
    switch (payload.action) {
        case 'created':
            description = 'commented on issue'
            headline = (
                <SecondaryHeadline
                    icon={CommentIcon}
                    title={issue?.title || ''}
                    trailingText={`#${issue?.number || ''} (comment)`}
                    url={issue?.html_url || ''}
                />
            )
            break
        default:
            console.info(`hidden IssueCommentEvent of action ${payload.action}`, event)
            return null
    }

    return (
        <Base
            event={event}
            description={description}
            headline={headline}
            markdownDetails={payload.comment?.body || ''}
        />
    )
}
