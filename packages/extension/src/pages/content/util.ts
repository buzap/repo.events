export function getRepoFromLocation(l: Location = window.location): { owner: string; repo: string } | null {
    const path = l.pathname || ''
    const parts = path.split('/')
    if (parts.length < 3) {
        return null
    }
    return { owner: parts[1], repo: parts[2] }
}
