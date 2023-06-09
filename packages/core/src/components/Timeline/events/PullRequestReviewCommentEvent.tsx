import { SxProp } from '@primer/react'
import { GitPullRequestIcon } from '@primer/octicons-react'
import { GithubEvent } from '../../../utils/github'
import { Base, SecondaryHeadline } from './common'
import { PullRequestReviewCommentEventPayload } from '../../../utils/github'

export interface PullRequestReviewCommentEventProps extends SxProp {
    event: GithubEvent
}

export function PullRequestReviewCommentEvent(props: PullRequestReviewCommentEventProps) {
    const { event } = props
    const payload = event.payload as unknown as PullRequestReviewCommentEventPayload

    if (payload.action !== 'created') {
        return null
    }
    const headline = (
        <SecondaryHeadline
            icon={GitPullRequestIcon}
            title={payload.pull_request.title}
            trailingText={`#${payload.pull_request.number}`}
            url={payload.comment.html_url}
        />
    )
    return (
        <Base
            event={event}
            description="reviewed pull request"
            authorAssociation={payload.comment.author_association}
            headline={headline}
            markdownDetails={payload.comment.body || ''}
        />
    )
}
