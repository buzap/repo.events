import { Box, StateLabelProps, SxProp } from '@primer/react'
import { StateLabel, PrimaryLink } from '../../components'

export interface IssueHeadingProps extends SxProp {
    status: StateLabelProps['status']
    title: string
    url: string
    number: number
}

export function IssueHeading(props: IssueHeadingProps) {
    return (
        <Box>
            <StateLabel status={props.status} variant="small" sx={{ mr: 2, verticalAlign: 'bottom' }} />
            <PrimaryLink href={props.url} trailingText={`#${props.number}`}>
                {props.title}
            </PrimaryLink>
        </Box>
    )
}
