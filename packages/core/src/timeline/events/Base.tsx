import { Box, SxProp, RelativeTime, Text } from '@primer/react'
import { GithubEvent } from '../../types/github'
import { MarkdownPreview } from '../markdown'
import { Actor } from '../../components'

export interface BaseProps extends SxProp {
    event: GithubEvent
    description: React.ReactNode
    headline?: React.ReactNode
    details?: React.ReactNode
    markdownDetails?: string
}

export function Base(props: BaseProps) {
    const { event } = props

    let details: React.ReactNode = null
    if (props.details) {
        details = props.details
    } else if (props.markdownDetails) {
        details = <MarkdownPreview content={props.markdownDetails} />
    }

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Box as="span" sx={{ flexGrow: 1 }}>
                    <Actor actor={props.event.actor} />
                    <Text sx={{ ml: 1, color: 'fg.muted' }}>{props.description}</Text>
                </Box>
                <RelativeTime
                    datetime={event.created_at || ''}
                    title={event.created_at || ''}
                    sx={{ color: 'fg.muted' }}
                />
            </Box>
            <Box sx={{ ml: '34px', paddingY: 1 }}>
                {props.headline && <Box>{props.headline}</Box>}
                {details && <Box sx={{ mt: 1 }}>{details}</Box>}
            </Box>
        </Box>
    )
}
