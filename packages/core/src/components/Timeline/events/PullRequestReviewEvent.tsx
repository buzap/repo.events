import { SxProp } from '@primer/react'
import { CheckIcon } from '@primer/octicons-react'
import { GithubEvent, PullRequestReviewEventPayload } from '../../../utils/github'
import { Base, SecondaryHeadline } from './common'

export interface PullRequestReviewEventProps extends SxProp {
    event: GithubEvent
}

export function PullRequestReviewEvent(props: PullRequestReviewEventProps) {
    const { event } = props
    const payload = event.payload as PullRequestReviewEventPayload

    if (payload.action !== 'created' || payload.review.state !== 'approved') {
        return null
    }
    const headline = (
        <SecondaryHeadline
            icon={CheckIcon}
            iconStyles={{ color: 'success.fg' }}
            title={payload.pull_request.title}
            trailingText={`#${payload.pull_request.number}`}
            url={payload.pull_request.html_url}
        />
    )
    return (
        <Base
            event={event}
            description="approved pull request"
            authorAssociation={payload.review.author_association}
            headline={headline}
            sx={props.sx}
        />
    )
}
