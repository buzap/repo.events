import { SxProp, StyledOcticon, Link } from '@primer/react'
import { CommentIcon } from '@primer/octicons-react'
import { GithubEvent } from '../../types/github'
import { Base } from './base'

export interface IssueCommentEventProps extends SxProp {
    event: GithubEvent
}

export function IssueCommentEvent(props: IssueCommentEventProps) {
    const event = props.event
    const payload = event.payload
    const issue = payload.issue

    let icon: React.ReactNode = null
    let summary: React.ReactNode = null
    let markdownContent = ''

    switch (payload.action) {
        case 'created':
            icon = <StyledOcticon icon={CommentIcon} color="scale.blue.1" />
            summary = (
                <>
                    Commented on issue
                    <Link href={payload.comment?.html_url} sx={{ mx: 1 }}>
                        #{issue?.number}
                    </Link>
                    {issue?.title}
                </>
            )
            markdownContent = payload.comment?.body || ''
            break
        default:
            console.info(`hidden IssueCommentEvent of action ${payload.action}`, event)
            return null
    }

    return (
        <Base event={event} summaryLeading={icon} summary={summary} markdownContent={markdownContent} sx={props.sx} />
    )
}
