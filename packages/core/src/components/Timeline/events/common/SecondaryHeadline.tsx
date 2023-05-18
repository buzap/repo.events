import { Icon } from '@primer/octicons-react'
import { Box, Link, StyledOcticon, SxProp, Text } from '@primer/react'

export interface SecondaryHeadlineProps extends SxProp {
    icon: Icon
    title: React.ReactNode
    url?: string
    trailingText?: string
}

export function SecondaryHeadline(props: SecondaryHeadlineProps) {
    const title = (
        <>
            <Text>{props.title} </Text>
            <Text sx={{ fontStyle: 'italic' }}>{props.trailingText}</Text>
        </>
    )
    let content: React.ReactNode
    if (props.url) {
        content = (
            <Link href={props.url} muted>
                {title}
            </Link>
        )
    } else {
        content = <Text sx={{ color: 'fg.muted' }}>{title}</Text>
    }

    return (
        <Box sx={props.sx}>
            <StyledOcticon icon={props.icon} sx={{ mr: 2 }} />
            {content}
        </Box>
    )
}
