import { Box, SxProp, RelativeTime, StateLabelProps } from '@primer/react'
import { AnyEvent } from '../../types/github'
import { MarkdownPreview } from '../markdown'
import { Actor, StateLabel } from '../../components'

export interface BaseProps extends SxProp {
    event: AnyEvent
    status?: StateLabelProps['status']
    summary?: React.ReactNode
    markdownContent?: string
    content?: React.ReactNode
}

export function Base(props: BaseProps) {
    const event = props.event

    let content: React.ReactNode = null
    if (props.content) {
        content = props.content
    } else if (props.markdownContent) {
        content = <MarkdownPreview content={props.markdownContent} />
    }

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Actor actor={props.event.actor} sx={{ flexGrow: 1 }} />
                <RelativeTime
                    datetime={event.created_at || ''}
                    title={event.created_at || ''}
                    sx={{ alignSelf: 'flex-end', color: 'fg.muted' }}
                />
            </Box>
            <Box sx={{ ml: '34px' }}>
                <Box sx={{ color: 'fg.muted' }}>
                    {props.status && <StateLabel status={props.status} variant="small" />}
                    {props.summary}
                </Box>
                {content && <Box>{content}</Box>}
            </Box>
        </Box>
    )
}
