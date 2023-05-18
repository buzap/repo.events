import { Box } from '@primer/react'
import { Intro } from '@/components/Intro'
import { RepoInput } from '@/components/RepoInput'
import styled from 'styled-components'

export default function Home() {
    const onChange = (e: any) => {
        console.log(e)
    }

    return (
        <Box sx={{ minHeight: '100%', backgroundColor: 'canvas.default' }}>
            <SomeComponent>Hello</SomeComponent>
            <Intro />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <RepoInput onChange={onChange} sx={{ width: '750px', maxWidth: '90vw' }} />
            </Box>
        </Box>
    )
}

const SomeComponent = styled.div`
    border: 1px solid red;
`
