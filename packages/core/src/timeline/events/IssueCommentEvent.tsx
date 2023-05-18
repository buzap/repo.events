import { SxProp, Link, Text } from '@primer/react'
import { GithubEvent } from '../../types/github'
import { Base } from './Base'

export interface IssueCommentEventProps extends SxProp {
    event: GithubEvent
}

export function IssueCommentEvent(props: IssueCommentEventProps) {
    const event = props.event
    const payload = event.payload
    const issue = payload.issue

    let description: React.ReactNode = null
    switch (payload.action) {
        case 'created':
            description = (
                <Text>
                    commented on issue&nbsp;
                    <Link href={payload.comment?.html_url} muted sx={{ fontWeight: 'bold' }}>
                        {issue?.title} #{issue?.number}
                    </Link>
                </Text>
            )
            break
        default:
            console.info(`hidden IssueCommentEvent of action ${payload.action}`, event)
            return null
    }

    return <Base event={event} description={description} markdownDetails={payload.comment?.body || ''} />
}
