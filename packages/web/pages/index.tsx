import { Box } from '@primer/react'
import { Intro } from '@/components/Intro'
import { RepoInput, RepoInputChangeEvent } from '@/components/RepoInput'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const onInputChange = useCallback(
        (event: RepoInputChangeEvent) => {
            router.push(`${event.owner}/${event.repo}`)
        },
        [router]
    )

    return (
        <Box sx={{ minHeight: '100%', backgroundColor: 'canvas.default' }}>
            <Intro />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <RepoInput onChange={onInputChange} sx={{ width: '750px', maxWidth: '90vw' }} />
            </Box>
        </Box>
    )
}
