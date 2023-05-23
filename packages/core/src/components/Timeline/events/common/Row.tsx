import { SxProp, Box } from '@primer/react'

export interface RowProps extends SxProp {
    children: React.ReactNode
}

export function Row(props: RowProps) {
    return (
        <Box
            sx={{
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: 'border.subtle',
                paddingY: 3,
                ...props.sx,
            }}
        >
            {props.children}
        </Box>
    )
}
