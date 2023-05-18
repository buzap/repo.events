import styled from 'styled-components'
import { Link, LinkProps, themeGet } from '@primer/react'

export interface PrimaryLinkProps extends LinkProps {
    trailingText?: string
}

export function PrimaryLink(props: PrimaryLinkProps) {
    const { trailingText, ...linkProps } = props
    return (
        <StyledPrimaryLink {...linkProps}>
            {props.children}
            {trailingText && <TrailingText> {trailingText}</TrailingText>}
        </StyledPrimaryLink>
    )
}

const StyledPrimaryLink = styled(Link)`
    font-weight: ${(props) => themeGet('fontWeights.bold')(props)};
    color: ${(props) => themeGet('colors.fg.default')(props)};
    &:hover {
        color: ${(props) => themeGet('colors.accent.fg')(props)};
        text-decoration: underline;
    }
`

const TrailingText = styled.span`
    font-weight: ${(props) => themeGet('fontWeights.normal')(props)};
    color: ${(props) => themeGet('colors.fg.muted')(props)};
    ${StyledPrimaryLink}:hover & {
        color: ${(props) => themeGet('colors.accent.fg')(props)};
    }
`
