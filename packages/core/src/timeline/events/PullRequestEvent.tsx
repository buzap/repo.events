import { SxProp, StyledOcticon, Link } from '@primer/react'
import { GitPullRequestIcon, GitPullRequestClosedIcon } from '@primer/octicons-react'
import { GithubEvent, PullRequestEventPayload } from '../../types/github'
import { Base } from './Base'

export interface PullRequestEventProps extends SxProp {
    event: GithubEvent
}

export function PullRequestEvent(props: PullRequestEventProps) {
    const event = props.event
    const payload = event.payload as PullRequestEventPayload
    const pr = payload.pull_request

    let icon: React.ReactNode = null
    let summary: React.ReactNode = null
    let markdownContent = ''

    switch (payload.action) {
        case 'opened':
            icon = <StyledOcticon icon={GitPullRequestIcon} color="open.fg" />
            summary = (
                <>
                    Opened pull request
                    <Link muted href={pr.html_url}>
                        #{pr.number}
                    </Link>
                    {pr.title}
                </>
            )
            markdownContent = pr.body || ''
            break
        case 'closed':
            icon = <StyledOcticon icon={GitPullRequestClosedIcon} />
            summary = (
                <>
                    Closed pull request
                    <Link muted href={pr.html_url}>
                        #{pr.number}
                    </Link>
                </>
            )
            break
        case 'reopened':
            icon = <StyledOcticon icon={GitPullRequestIcon} />
            summary = (
                <>
                    Reopened pull request
                    <Link muted href={pr.html_url}>
                        #{pr.number}
                    </Link>
                </>
            )
            break
        default:
            console.warn(`hidden PullRequestEvent of action ${payload.action}`, event)
    }

    return (
        <Base event={event} summaryLeading={icon} summary={summary} markdownContent={markdownContent} sx={props.sx} />
    )
}
