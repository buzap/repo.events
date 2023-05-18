import { useEffect, useState } from 'react'
import { SxProp } from '@primer/react'
import styled from 'styled-components'
import { themeGet, sx } from '@primer/react'
import { parse } from './parse'

export interface MarkdownPreviewProps extends SxProp {
    content: string
}

export function MarkdownPreview(props: MarkdownPreviewProps) {
    const [content, setContent] = useState<string>('')

    useEffect(() => {
        parse(props.content).then((rendered) => {
            setContent(rendered)
        })
    }, [props.content])

    return <Container dangerouslySetInnerHTML={{ __html: content }} sx={props.sx} />
}

const Container = styled.div`
    &,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote {
        margin-top: 0;
        margin-bottom: 0;
    }

    a {
        color: ${(props) => themeGet('colors.fg.default')(props)};
        text-decoration: none;
        &:hover {
            color: ${(props) => themeGet('colors.accent.fg')(props)};
            text-decoration: underline;
        }
    }

    img {
        display: none;
    }

    strong {
        color: ${(props) => themeGet('colors.fg.default')(props)};
        font-weight: ${(props) => themeGet('fontWeights.normal')(props)};
    }

    & > p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    blockquote {
        margin: 0.25em 0;
        padding: 0 1em;
        color: ${(props) => themeGet('colors.fg.muted')(props)};
        border-left: 0.25em solid ${(props) => themeGet('colors.border.default')(props)};
    }
    blockquote > p {
        display: none;
    }
    blockquote > p:first-of-type {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    code {
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        font-family: ${(props) => themeGet('fonts.mono')(props)};
        white-space: break-spaces;
        background-color: ${(props) => themeGet('colors.neutral.muted')(props)};
        border-radius: 6px;
    }

    ${sx}
`
