import { SxProp, StateLabelProps } from '@primer/react'
import { GithubEvent } from '../../../types/github'
import { PrimaryHeadline, Base } from './common'

export interface IssuesEventProps extends SxProp {
    event: GithubEvent
}

export function IssuesEvent(props: IssuesEventProps) {
    const event = props.event
    const payload = event.payload
    const issue = payload.issue

    let status: StateLabelProps['status']
    let description: React.ReactNode = null
    let details = ''

    switch (event.payload.action) {
        case 'opened':
            status = 'issueOpened'
            description = 'opened an issue'
            details = issue?.body || ''
            break
        case 'closed':
            status = 'issueClosed'
            description = 'closed an issue'
            if (issue?.state_reason === 'not_planned') {
                status = 'issueClosedNotPlanned'
            }
            break
        case 'reopened':
            status = 'issueOpened'
            description = 'reopened an issue'
            break
        default:
            console.info(`hidden IssuesEvent of action ${event.payload.action}`, event)
            return null
    }

    return (
        <Base
            event={event}
            description={description}
            headline={
                <PrimaryHeadline
                    title={issue?.title || ''}
                    status={status}
                    url={issue?.html_url || ''}
                    trailingText={`#${issue?.number || 0}`}
                />
            }
            markdownDetails={details}
        />
    )
}
