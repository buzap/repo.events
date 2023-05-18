import { components } from '@octokit/openapi-types'

export type GithubEvent = components['schemas']['event']

export type AnyEvent = Omit<GithubEvent, 'payload'> & { payload: unknown }

export type PushEvent = Omit<GithubEvent, 'type' | 'payload'> & {
    type: 'PushEvent'
    payload: PushEventPayload
}

export type PullRequest = components['schemas']['webhook-pull-request-opened']['pull_request']

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
