import { Box } from '@primer/react'
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
        <Box
            sx={{
                backgroundColor: 'canvas.default',
                position: 'absolute',
                width: '100%',
                minHeight: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <RepoInput onChange={onInputChange} sx={{ marginTop: '30vh', width: '750px', maxWidth: '90vw' }} />
        </Box>
    )
}
