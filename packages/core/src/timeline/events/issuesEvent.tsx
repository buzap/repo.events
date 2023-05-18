import { IssueOpenedIcon, IssueClosedIcon } from '@primer/octicons-react'
import { SxProp, StyledOcticon, Link } from '@primer/react'
import { GithubEvent } from '../../types/github'
import { Base } from './base'

export interface IssuesEventProps extends SxProp {
    event: GithubEvent
}

export function IssuesEvent(props: IssuesEventProps) {
    const event = props.event
    const payload = event.payload
    const issue = payload.issue

    let icon: React.ReactNode = null
    let summary: React.ReactNode = null
    let markdownContent = ''

    switch (event.payload.action) {
        case 'opened':
            icon = <StyledOcticon icon={IssueOpenedIcon} color="open.fg" />
            summary = (
                <>
                    Opened issue
                    <Link href={issue?.url} sx={{ mx: 1 }}>
                        #{issue?.number}
                    </Link>
                    {issue?.title}
                </>
            )
            markdownContent = issue?.body || ''
            break
        case 'closed':
            icon = <StyledOcticon icon={IssueClosedIcon} color="close.fg" />
            summary = (
                <>
                    Closed issue
                    <Link href={issue?.url} sx={{ mx: 1 }}>
                        #{issue?.number}
                    </Link>
                    {issue?.title}
                </>
            )
            break
        case 'reopened':
            icon = <StyledOcticon icon={IssueOpenedIcon} color="open.fg" />
            summary = (
                <>
                    Reopened issue
                    <Link href={issue?.url} sx={{ mx: 1 }}>
                        #{issue?.number}
                    </Link>
                    {issue?.title}
                </>
            )
            break
        default:
            console.info(`hidden IssuesEvent of action ${event.payload.action}`, event)
            return null
    }

    return (
        <Base event={event} summaryLeading={icon} summary={summary} markdownContent={markdownContent} sx={props.sx} />
    )
}
