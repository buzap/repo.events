import { Box, SxProp, RelativeTime, Text } from '@primer/react'
import { GithubEvent } from '../../../../types/github'
import { MarkdownPreview } from '../../MarkdownPreview'
import { Actor } from '../../../Actor'

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
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box as="span" sx={{ flexGrow: 1 }}>
                    <Actor actor={props.event.actor} />
                    <Text sx={{ ml: 1, color: 'fg.muted' }}>{props.description}</Text>
                </Box>
                <RelativeTime
                    datetime={event.created_at || ''}
                    title={event.created_at || ''}
                    sx={{ color: 'fg.muted', ml: '34px' }}
                />
            </Box>
            <Box sx={{ ml: '34px' }}>
                {props.headline && <Box>{props.headline}</Box>}
                {details && <Box sx={{ mt: 1 }}>{details}</Box>}
            </Box>
        </Box>
    )
}
