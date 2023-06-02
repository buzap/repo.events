import { components } from '@octokit/openapi-types'

export type GithubEvent = Omit<components['schemas']['event'], 'payload'> & { payload: unknown }

export type PullRequest = components['schemas']['webhook-pull-request-opened']['pull_request']

export interface Issue {
    title: string
    number: number
    author_association?: string
    html_url: string
    pull_request?: PullRequest
    body?: string
    state_reason?: string
}

export interface IssuesEventPayload {
    action: string
    issue: Issue
}

export interface IssueCommentEventPayload {
    action: string
    issue: Issue
    comment: {
        author_association: string
        html_url: string
        body?: string
    }
}

export type PushEvent = Omit<GithubEvent, 'type' | 'payload'> & {
    type: 'PushEvent'
    payload: PushEventPayload
}

export interface PushEventPayload {
    repository_id: number
    push_id: number
    size: number
    distinct_size: number
    ref: string
    head: string
    before: string
    commits: PushEventPayload_Commit[]
}

export interface PushEventPayload_Commit {
    sha: string
    message: string
    distinct: boolean
    url: string
    author: {
        name: string
        email: string
    }
}

export type PullRequestEventAction =
    | 'opened'
    | 'edited'
    | 'closed'
    | 'reopened'
    | 'assigned'
    | 'unassigned'
    | 'review_request'
    | 'review_request_removed'
    | 'labeled'
    | 'unlabeled'
    | 'synchronize'

export interface PullRequestEventPayload {
    action: PullRequestEventAction
    number: number
    changes?: {
        title: {
            from: string
        }
        body: {
            from: string
        }
    }
    pull_request: PullRequest
    reason: string
}

export interface PullRequestReviewEventPayload {
    action: string
    pull_request: PullRequest
    review: {
        state: 'approved' | 'commented'
        author_association: string
    }
}

export interface PullRequestReviewCommentEventPayload {
    action: string
    pull_request: PullRequest
    comment: {
        author_association: string
        html_url: string
        body?: string
    }
}
