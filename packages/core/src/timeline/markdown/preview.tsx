import { useEffect, useState } from 'react'
import { SxProp } from '@primer/react'
import styled from 'styled-components'
import { themeGet, sx } from '@primer/react'
import { parse } from './parse'

export interface MarkdownPreviewProps extends SxProp {
    content: string
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
        color: ${(props) => themeGet('colors.accent.fg')(props)};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    blockquote {
        margin: 0.25em 0;
        padding: 0 1em;
        color: ${(props) => themeGet('colors.fg.muted')(props)};
        border-left: 0.25em solid ${(props) => themeGet('colors.border.default')(props)};
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

export function MarkdownPreview(props: MarkdownPreviewProps) {
    const [content, setContent] = useState<string>('')

    useEffect(() => {
        parse(props.content).then((rendered) => {
            setContent(rendered)
        })
    }, [props.content])

    return <Container dangerouslySetInnerHTML={{ __html: content }} sx={props.sx} />
}
