import { Avatar, Box, Link, SxProp, Text, themeGet } from '@primer/react'
import { GithubEvent } from '../../types/github'
import styled from 'styled-components'

export interface ActorProps extends SxProp {
    actor: GithubEvent['actor']
    avatarSize?: number
}

export function Actor(props: ActorProps) {
    const actor = props.actor
    const linkToActorProfile = `https://github.com/${actor.login}`

    return (
        <Box as="span" sx={{ ...props.sx }}>
            <Link href={linkToActorProfile}>
                <Avatar size={props.avatarSize || 26} src={actor.avatar_url} />
            </Link>
            <StyledActorName href={linkToActorProfile} muted>
                <Text>{actor.login}</Text>
                {actor.display_login && actor.display_login !== actor.login && (
                    <Text sx={{ ml: 1, color: 'fg.muted' }}>{actor.display_login}</Text>
                )}
            </StyledActorName>
        </Box>
    )
}

const StyledActorName = styled(Link)`
    margin-left: 8px;
    font-weight: ${(props) => themeGet('fontWeights.bold')(props)};
    color: ${(props) => themeGet('colors.fg.default')(props)};
    &:hover,
    &:hover span {
        color: ${(props) => themeGet('colors.accent.fg')(props)};
    }
`
