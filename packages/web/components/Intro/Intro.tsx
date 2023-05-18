import { SxProp, Box } from '@primer/react'

export interface IntroProps extends SxProp {}

export function Intro(props: SxProp) {
    return (
        <Box sx={{ height: '450px', backgroundColor: 'canvas.default', position: 'relative', ...props.sx }}>
            <Box as="h1" sx={{ position: 'absolute', top: '33%', left: '50px', fontSize: '4' }}>
                See what&apos;s happening in a github repository at a glance
            </Box>
        </Box>
    )
}
