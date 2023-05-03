import React from 'react'
import css from '@styled-system/css'
import styled from 'styled-components'
import { Box, Link, SxProp, Avatar, Text, RelativeTime, themeGet } from '@primer/react'
import { AnyEvent } from '../../types/github'
import { MarkdownPreview } from '../markdown'

export interface BaseProps extends SxProp {
    event: AnyEvent
    summary?: React.ReactNode
    summaryLeading?: React.ReactNode
    markdownContent?: string
    content?: React.ReactNode
}

export function Base(props: BaseProps) {
    const event = props.event
    const actor = event.actor
    const linkToActorProfile = `https://github.com/${actor.login}`
    const showDisplayLogin = actor.display_login !== actor.login

    let content: React.ReactNode = null
    if (props.content) {
        content = props.content
    } else if (props.markdownContent) {
        content = <MarkdownPreview content={props.markdownContent} />
    }

    return (
        <Container sx={props.sx}>
            <Link href={linkToActorProfile}>
                <Avatar src={actor.avatar_url} />
            </Link>
            <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box as="span" sx={{ flexGrow: 1 }}>
                        <Link
                            href={linkToActorProfile}
                            muted
                            sx={{
                                fontWeight: 'bold',
                                color: 'fg.default',
                                mr: 1,
                            }}
                        >
                            {actor.login}
                        </Link>
                        {showDisplayLogin && <Text sx={{ color: 'fg.muted' }}>{props.event.actor.display_login}</Text>}
                    </Box>
                    <RelativeTime
                        datetime={event.created_at || ''}
                        title={event.created_at || ''}
                        sx={{ alignSelf: 'flex-end', color: 'fg.muted' }}
                    />
                </Box>
                <Box sx={{ color: 'fg.muted' }}>
                    {props.summaryLeading && (
                        <Box as="span" sx={{ mr: 1 }}>
                            {props.summaryLeading}
                        </Box>
                    )}
                    {props.summary}
                </Box>
                {content && <Box>{content}</Box>}
            </Box>
        </Container>
    )
}

const Container = styled.div<SxProp>`
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => themeGet('colors.border.subtle')(props)};

    ${(props) => css(props.sx)}
`
