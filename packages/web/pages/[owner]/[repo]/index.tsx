import { useRouter } from 'next/router'
import { Box } from '@primer/react'
import { Timeline } from 'core'

export default function Page() {
    const router = useRouter()
    const { owner, repo } = router.query

    return (
        <Box>
            <Timeline owner={owner as string} repo={repo as string} />
        </Box>
    )
}
