import github100 from '../assets/github100.json'

export interface RepoIdentifier {
    owner: string
    repo: string
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export function getRandomRepo(): RepoIdentifier {
    const name = github100[getRandomInt(0, github100.length)]
    const parts = name.split('/', 2)
    return { owner: parts[0] || '', repo: parts[1] || '' }
}

export function getRandomRepos(n: number): RepoIdentifier[] {
    const repos: RepoIdentifier[] = []
    for (let i = 0; i < n; i++) {
        repos.push(getRandomRepo())
    }
    return repos
}
