import { type Octokit } from 'octokit'

// the OctokitOptions was not exported from the octokit package
export type OctokitOptions = Exclude<ConstructorParameters<typeof Octokit>['0'], undefined>

export function defaultOctokitOptions(): OctokitOptions {
    return {
        // when throttle is enabled, rate limited request just hangs
        throttle: { enabled: false },
    }
}
