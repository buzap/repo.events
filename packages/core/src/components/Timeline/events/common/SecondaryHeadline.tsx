import { Icon } from '@primer/octicons-react'
import { Box, Link, StyledOcticon, SxProp, Text } from '@primer/react'

export interface SecondaryHeadlineProps extends SxProp {
    icon: Icon
    title: React.ReactNode
    url?: string
    trailingText?: string
}

export function SecondaryHeadline(props: SecondaryHeadlineProps) {
    return (
        <Box sx={props.sx}>
            <StyledOcticon icon={props.icon} sx={{ mr: 2 }} />
            <Link href={props.url} muted>
                <Text>{props.title} </Text>
                <Text sx={{ fontStyle: 'italic' }}>{props.trailingText}</Text>
            </Link>
        </Box>
    )
}
