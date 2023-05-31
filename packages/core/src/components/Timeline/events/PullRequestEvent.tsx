import { SxProp, StateLabelProps } from '@primer/react'
import { GithubEvent, PullRequestEventPayload } from '../../../utils/github'
import { PrimaryHeadline, Base } from './common'

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
            description = 'opened a pull request'
            details = pr.body || ''
            break
        case 'closed':
            status = 'pullClosed'
            description = 'closed a pull request'
            if (pr.merged) {
                status = 'pullMerged'
            }
            break
        case 'reopened':
            status = 'pullOpened'
            description = 'reopened a pull request'
            break
        default:
            return null
    }

    return (
        <Base
            event={event}
            description={description}
            headline={
                <PrimaryHeadline status={status} title={pr.title} trailingText={`#${pr.number}`} url={pr.html_url} />
            }
            markdownDetails={details}
        />
    )
}
