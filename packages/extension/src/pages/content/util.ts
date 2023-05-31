export interface RepoIdentifier {
    owner: string
    repo: string
}

export function getRepoFromLocation(l: Location = window.location): RepoIdentifier | null {
    const path = l.pathname || ''
    const parts = path.split('/')
    if (parts.length < 3) {
        return null
    }
    return { owner: parts[1], repo: parts[2] }
}
