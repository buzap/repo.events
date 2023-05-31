import { SxProp } from '@primer/react'
import { GithubEvent, IssueCommentEventPayload } from '../../../utils/github'
import { Base } from './common/Base'
import { SecondaryHeadline } from './common'
import { IssueOpenedIcon, GitPullRequestIcon } from '@primer/octicons-react'

export interface IssueCommentEventProps extends SxProp {
    event: GithubEvent
}

export function IssueCommentEvent(props: IssueCommentEventProps) {
    const event = props.event
    const payload = event.payload as IssueCommentEventPayload
    const issue = payload.issue
    const isPullRequest = !!issue?.pull_request

    let description: React.ReactNode = null
    let headline: React.ReactNode = null
    switch (payload.action) {
        case 'created':
            description = `commented on ${isPullRequest ? 'pull request' : 'issue'}`
            headline = (
                <SecondaryHeadline
                    icon={isPullRequest ? GitPullRequestIcon : IssueOpenedIcon}
                    title={issue?.title || ''}
                    trailingText={`#${issue?.number || ''} (comment)`}
                    url={payload.comment?.html_url || ''}
                />
            )
            break
        default:
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
