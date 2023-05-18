import { SxProp, StateLabelProps } from '@primer/react'
import { GithubEvent } from '../../types/github'
import { Base } from './Base'
import { IssueHeading } from './IssueHeading'

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
            description = 'opened issue'
            details = issue?.body || ''
            break
        case 'closed':
            status = 'issueClosed'
            description = 'closed issue'
            break
        case 'reopened':
            status = 'issueOpened'
            description = 'reopened issue'
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
                <IssueHeading
                    title={issue?.title || ''}
                    status={status}
                    url={issue?.url || ''}
                    number={issue?.number || 0}
                />
            }
            markdownDetails={details}
        />
    )
}
