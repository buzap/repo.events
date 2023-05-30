import { Box, Button, FormControl, SxProp, TextInput, Link, Text } from '@primer/react'
import { CheckIcon } from '@primer/octicons-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Octokit } from 'octokit'
import { type RequestError } from '@octokit/request-error'

export interface SettingsData {
    personalAccessToken: string | null
}

export interface SettingsProps extends SxProp {
    settings: SettingsData
    onSettingChange: (settings: Partial<SettingsData>) => void
}

export function Settings(props: SettingsProps) {
    const { onSettingChange } = props

    const [token, setToken] = useState<string | null>(props.settings.personalAccessToken)
    const [validatingToken, setValidatingToken] = useState<boolean>(false)
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)

    useEffect(() => {
        setToken(props.settings.personalAccessToken)
    }, [props.settings])

    const onInputChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.currentTarget.value
            setToken(value)
            if (!value) {
                setIsTokenValid(null)
                return
            }

            setValidatingToken(true)
            setIsTokenValid(null)
            const octo = new Octokit({ auth: value })
            try {
                await octo.rest.meta.root()
                setIsTokenValid(true)
                onSettingChange({ personalAccessToken: value })
            } catch (err) {
                console.warn(err)
                const requestErr = err as RequestError
                if (requestErr.status === 401) {
                    setIsTokenValid(false)
                    return
                }
            } finally {
                setValidatingToken(false)
            }
        },
        [onSettingChange]
    )

    const onDeleteToken = useCallback(() => {
        setToken(null)
        setIsTokenValid(null)
        onSettingChange({ personalAccessToken: null })
    }, [onSettingChange])

    return (
        <Box sx={props.sx}>
            <FormControl>
                <FormControl.Label>Personal Access Token</FormControl.Label>
                <TextInput
                    type="password"
                    block
                    loaderPosition="trailing"
                    value={token || ''}
                    onChange={onInputChange}
                    loading={validatingToken}
                    validationStatus={isTokenValid === false ? 'error' : undefined}
                    trailingVisual={isTokenValid ? CheckIcon : undefined}
                />
                {isTokenValid === false && (
                    <FormControl.Validation variant="error">Invalid personal access token</FormControl.Validation>
                )}
                <FormControl.Caption>
                    <Box>
                        <Text>Use a </Text>
                        <Link href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">
                            GitHub personal access token{' '}
                        </Link>
                        <Text>
                            to access your private repositories, or to continue using the site when you reach GitHub's{' '}
                        </Text>
                        <Link href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting">
                            rate limits
                        </Link>
                        <Text> for unauthenticated requests</Text>
                    </Box>
                    <Box>Your token is stored in your browser only and can be deleted at any time.</Box>
                </FormControl.Caption>
            </FormControl>
            <Box sx={{ mt: 2 }}>
                <Button variant="invisible" size="small" onClick={onDeleteToken}>
                    Delete Personal Access Token
                </Button>
            </Box>
        </Box>
    )
}
