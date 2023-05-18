import { Octokit } from 'octokit'
import { GithubEvent } from '../types/github'
import { StackProps } from './events/Stack'

export interface SingleEvent {
    id: string
    type: 'single'
    value: GithubEvent
}

export interface EventStack {
    id: string
    type: 'stack'
    eventType: StackProps['eventType']
    value: GithubEvent[]
}

export type TimelineItem = SingleEvent | EventStack

export class EventLoader {
    // private iterator: AsyncIterator<ReturnType<InstanceType<typeof Octokit>['rest']['activity']['listRepoEvents']>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private iterator: AsyncIterableIterator<any>

    constructor(octo: Octokit, owner: string, repo: string) {
        const req = octo.paginate.iterator(octo.rest.activity.listRepoEvents, {
            owner: owner,
            repo: repo,
        })
        const iterator = req[Symbol.asyncIterator]()
        this.iterator = iterator
    }

    async nextEvents(): Promise<TimelineItem[]> {
        const resp = await this.iterator.next()

        const items: TimelineItem[] = []
        let watchEventStack: EventStack | null = null
        let forkEventStack: EventStack | null = null
        for (const event of resp.value.data as GithubEvent[]) {
            if (event.type === 'WatchEvent') {
                if (watchEventStack === null) {
                    watchEventStack = { id: event.id, type: 'stack', eventType: 'WatchEvent', value: [] }
                    items.push(watchEventStack)
                }
                watchEventStack.value.push(event)
                continue
            }
            if (event.type === 'ForkEvent') {
                if (forkEventStack === null) {
                    forkEventStack = { id: event.id, type: 'stack', eventType: 'ForkEvent', value: [] }
                    items.push(forkEventStack)
                }
                forkEventStack?.value.push(event)
                continue
            }
            items.push({ id: event.id, type: 'single', value: event })
        }

        return items
    }
}
