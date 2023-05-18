import React from 'react'
import { SxProp, StyledOcticon, BranchName, Link } from '@primer/react'
import { CommitIcon } from '@primer/octicons-react'
import { AnyEvent, PushEvent as PushEventData } from '../../types/github'
import { Base } from './base'

export interface PushEventProps extends SxProp {
    event: PushEventData
}

const gitRefPattern = /^refs\/(\w+)\/(.+)$/

export function PushEvent(props: PushEventProps) {
    const event = props.event

    const icon = <StyledOcticon icon={CommitIcon} />
    const summary = <Summary event={event} />
    const content = <Content event={event} />
    return <Base event={props.event} summaryLeading={icon} summary={summary} content={content} sx={props.sx} />
}

function Summary(props: { event: PushEventData }) {
    const event = props.event
    const payload = event.payload

    let refTypeDesc: React.ReactNode = null
    let refName: React.ReactNode = null
    const refMatch = gitRefPattern.exec(payload.ref)
    if (!refMatch) {
        refTypeDesc = 'ref'
        refName = payload.ref
    } else {
        const tagOrBranch = refMatch[2]
        refName = <BranchName href={newGithubLink(event, `/tree/${tagOrBranch}`)}>{tagOrBranch}</BranchName>
        switch (refMatch[1]) {
            case 'heads':
                refTypeDesc = 'to branch'
                break
            case 'tags':
                refTypeDesc = 'tag'
                break
            default:
                refTypeDesc = 'ref'
        }
    }

    return (
        <>
            Pushed {refTypeDesc} {refName}
        </>
    )
}

function Content(props: { event: PushEventData }) {
    const event = props.event
    const payload = event.payload
    if (!payload.commits || payload.commits.length === 0) {
        return null
    }

    const firstCommit = payload.commits[0]
    let commitMessage = firstCommit.message.split('\n')[0]
    if (commitMessage.length > 100) {
        commitMessage = commitMessage.substring(0, 100) + '...'
    }
    const firstCommitNode: React.ReactNode = (
        <div>
            <Link href={newGithubLink(event, `/commit/${firstCommit.sha}`)}>{gitCommitShortSHA(firstCommit.sha)}</Link>{' '}
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
            {firstCommitNode}
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

function newGithubLink(event: AnyEvent, path: string): string {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    return `https://github.com/${event.repo.name}${path}`
}
