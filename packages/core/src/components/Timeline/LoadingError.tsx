import { type RequestError } from '@octokit/request-error'
import { Box, Details, Flash, Link, SxProp, Text, themeGet } from '@primer/react'
import styled from 'styled-components'

export interface LoadingErrorPorps extends SxProp {
    error: unknown
    authenticated: boolean
    requestAuthentication: () => void
}

const RateLimitDoc =
    'https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting'

export function LoadingError(props: LoadingErrorPorps) {
    const requestError = props.error as RequestError
    if (requestError.status === 403) {
        if (props.authenticated) {
            return (
                <Flash variant="warning">
                    <StyledTitle>
                        <Text>You have reached </Text>
                        <Link href={RateLimitDoc}>GitHub API's rate limit</Link>.
                    </StyledTitle>
                    <Box>Take some rest and come back later.</Box>
                </Flash>
            )
        }
        return (
            <Flash variant="warning">
                <StyledTitle>
                    <Text>You have reached </Text>
                    <Link href={RateLimitDoc}>GitHub API's rate limit for unauthenticated requests</Link>.
                </StyledTitle>
                <Box>
                    <Link as="button" onClick={props.requestAuthentication}>
                        Set your personal access token
                    </Link>
                    <Text> to get a higher rate limit, or take some rest and come back later.</Text>
                </Box>
            </Flash>
        )
    }
    if (requestError.status === 404) {
        return (
            <Flash variant="warning">
                <StyledTitle>Repository not found</StyledTitle>
                <Box>
                    If this is a private repository that you have access to, you can{' '}
                    <Link as="button" onClick={props.requestAuthentication}>
                        set your personal access token
                    </Link>
                    <Text> with appropriate permission to retrieve activity from it.</Text>
                </Box>
            </Flash>
        )
    }

    return (
        <Flash variant="danger">
            <StyledTitle>Something went wrong</StyledTitle>
            <Box>
                We apologize for the inconvenience. You can report the issue at{' '}
                <Link href="https://github.com/buzap/repo.event/issues">
                    https://github.com/buzap/repo.event/issues
                </Link>
            </Box>
            <Details sx={{ marginTop: 4, color: 'fg.muted' }}>
                <Text as="summary">Error details</Text>
                <Box as="pre">{JSON.stringify(requestError)}</Box>
            </Details>
        </Flash>
    )
}

const StyledTitle = styled.div`
    font-weight: ${(props) => themeGet('fontWeights.bold')(props)};
    margin-bottom: ${(props) => themeGet('space.2')(props)};
`
