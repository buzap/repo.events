import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@primer/react'
import { RepoInput, RepoInputChangeEvent } from '../components/RepoInput'

export default function Home() {
    const navigate = useNavigate()
    const onInputChange = useCallback(
        (event: RepoInputChangeEvent) => {
            navigate(`${event.owner}/${event.repo}`)
        },
        [navigate]
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
            <RepoInput onChange={onInputChange} sx={{ marginTop: '40vh', width: '750px', maxWidth: '90vw' }} />
        </Box>
    )
}
