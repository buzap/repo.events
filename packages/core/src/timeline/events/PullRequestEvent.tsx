import { SxProp, StateLabelProps } from '@primer/react'
import { GithubEvent, PullRequestEventPayload } from '../../types/github'
import { Base } from './Base'
import { IssueHeading } from './IssueHeading'

export interface PullRequestEventProps extends SxProp {
    event: GithubEvent
}

export function PullRequestEvent(props: PullRequestEventProps) {
    const event = props.event
    const payload = event.payload as PullRequestEventPayload
    const pr = payload.pull_request

    let status: StateLabelProps['status']
    let description: React.ReactNode = null
    let details = ''

    switch (payload.action) {
        case 'opened':
            status = 'pullOpened'
            description = 'opened pull request'
            details = pr.body || ''
            break
        case 'closed':
            status = 'pullClosed'
            description = 'closed pull request'
            break
        case 'reopened':
            status = 'pullOpened'
            description = 'reopened pull request'
            break
        default:
            console.warn(`hidden PullRequestEvent of action ${payload.action}`, event)
            return null
    }

    return (
        <Base
            event={event}
            description={description}
            headline={<IssueHeading status={status} title={pr.title} number={pr.number} url={pr.html_url} />}
            details={details}
        />
    )
}
