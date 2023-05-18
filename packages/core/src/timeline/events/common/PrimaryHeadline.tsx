import { Box, StateLabelProps, SxProp } from '@primer/react'
import { StateLabel, PrimaryLink } from '../../../components'

export interface PrimaryHeadlineProps extends SxProp {
    status: StateLabelProps['status']
    title: string
    trailingText?: string
    url: string
}

export function PrimaryHeadline(props: PrimaryHeadlineProps) {
    return (
        <Box sx={props.sx}>
            <StateLabel status={props.status} variant="small" sx={{ mr: 2, verticalAlign: 'bottom' }} />
            <PrimaryLink href={props.url} trailingText={props.trailingText}>
                {props.title}
            </PrimaryLink>
        </Box>
    )
}
