import { Box } from '@primer/react'
import { Intro } from '@/components/Intro'
import { RepoInput } from '@/components/RepoInput'

export default function Home() {
    const onChange = (e: any) => {
        console.log(e)
    }

    return (
        <Box sx={{ minHeight: '100%', backgroundColor: 'canvas.default' }}>
            <Intro />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <RepoInput onChange={onChange} sx={{ width: '750px', maxWidth: '90vw' }} />
            </Box>
        </Box>
    )
}
