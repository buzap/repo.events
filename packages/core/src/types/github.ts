import { components } from '@octokit/openapi-types'

export type GithubEvent = components['schemas']['event']

export type AnyEvent = Omit<GithubEvent, 'payload'> & { payload: any }

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
