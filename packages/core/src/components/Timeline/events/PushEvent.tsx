import { SxProp, BranchName, Link } from '@primer/react'
import { CommitIcon, Icon, TagIcon } from '@primer/octicons-react'
import { GithubEvent, PushEvent as PushEventData } from '../../../types/github'
import { SecondaryHeadline, Base } from './common'

export interface PushEventProps extends SxProp {
    event: PushEventData
}

const gitRefPattern = /^refs\/(\w+)\/(.+)$/

export function PushEvent(props: PushEventProps) {
    const { event } = props
    const payload = event.payload

    let refTypeDesc: React.ReactNode = 'ref'
    let refName: React.ReactNode = payload.ref
    let icon: Icon = CommitIcon
    const refMatch = gitRefPattern.exec(payload.ref)
    if (refMatch) {
        const tagOrBranch = refMatch[2]
        refName = <BranchName href={newGithubLink(event, `/tree/${tagOrBranch}`)}>{tagOrBranch}</BranchName>
        switch (refMatch[1]) {
            case 'heads':
                refTypeDesc = 'to branch'
                break
            case 'tags':
                refTypeDesc = 'tag'
                icon = TagIcon
                break
        }
    }
    const headline = (
        <SecondaryHeadline
            icon={icon}
            title={
                <>
                    Pushed {refTypeDesc} {refName}
                </>
            }
            url=""
        />
    )

    return (
        <Base
            event={props.event as GithubEvent}
            description="pushed to the repository"
            headline={headline}
            details={<Details event={event} />}
            sx={props.sx}
        />
    )
}

function Details(props: { event: PushEventData }) {
    const event = props.event
    const payload = event.payload
    if (!payload.commits || payload.commits.length === 0) {
        return null
    }

    const lastCommit = payload.commits[payload.commits.length - 1]
    let commitMessage = lastCommit.message.split('\n')[0]
    if (commitMessage.length > 100) {
        commitMessage = commitMessage.substring(0, 100) + '...'
    }
    const lastCommitNode: React.ReactNode = (
        <div>
            <Link href={newGithubLink(event, `/commit/${lastCommit.sha}`)}>{gitCommitShortSHA(lastCommit.sha)}</Link>{' '}
            {commitMessage}
        </div>
    )

    let remainCommitNode: React.ReactNode = null
    if (payload.size > 1) {
        const remainCommits = payload.size - 1
        const desc = remainCommits > 1 ? 'commits' : 'commit'
        remainCommitNode = (
            <div>
                <span>
                    ... and {remainCommits} more {desc}.
                </span>{' '}
                <Link href={newGithubLink(event, `/compare/${payload.before}...${payload.head}`)}>
                    Compare {gitCommitShortSHA(payload.before)}...{gitCommitShortSHA(payload.head)}
                </Link>
            </div>
        )
    }

    return (
        <>
            {lastCommitNode}
            {remainCommitNode}
        </>
    )
}

function gitCommitShortSHA(sha: string): string {
    if (sha.length <= 7) {
        return sha
    }
    return sha.substring(0, 7)
}

function newGithubLink(event: GithubEvent, path: string): string {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    return `https://github.com/${event.repo.name}${path}`
}
