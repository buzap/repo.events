import { ChangeEvent, useCallback, useState } from 'react'
import { SxProp, Box, Text, TextInput, FormControl, StyledOcticon, Link, IconButton } from '@primer/react'
import { MarkGithubIcon, CheckIcon, SyncIcon } from '@primer/octicons-react'
import { RepoIdentifier, getRandomRepos } from '../../utils/randomRepo'

const repoNamePattern = /^[\w.-]+\/[\w.-]+$/

export interface RepoInputChangeEvent {
    owner: string
    repo: string
    from: 'input' | 'suggestion'
}

export interface RepoInputProps extends SxProp {
    onChange: (event: RepoInputChangeEvent) => void
}

export function RepoInput(props: RepoInputProps) {
    const { onChange: originalOnChange } = props
    const onChange = useCallback(
        (value: string, from: RepoInputChangeEvent['from']) => {
            const parts = value.split('/', 2)
            const event: RepoInputChangeEvent = {
                owner: parts[0] || '',
                repo: parts[1] || '',
                from: from,
            }
            originalOnChange(event)
        },
        [originalOnChange]
    )

    const [value, setValue] = useState<string>('')
    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }, [])
    const onInputKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') {
                return
            }
            if (!isValidRepoName(value)) {
                return
            }
            onChange(value, 'input')
        },
        [onChange, value]
    )
    const onInputTrailingAction = useCallback(() => {
        if (!isValidRepoName(value)) {
            return
        }
        onChange(value, 'input')
    }, [onChange, value])

    const [shownSuggestions, setShowSuggestions] = useState<RepoIdentifier[]>([
        { owner: 'golang', repo: 'go' },
        { owner: 'facebook', repo: 'react' },
        { owner: 'microsoft', repo: 'vscode' },
    ])
    const changeSuggestions = useCallback(() => {
        setShowSuggestions(getRandomRepos(3))
    }, [])

    const onSuggestionClick = useCallback(
        (repo: RepoIdentifier) => {
            originalOnChange({ owner: repo.owner, repo: repo.repo, from: 'suggestion' })
        },
        [originalOnChange]
    )

    const isValid = isValidRepoName(value)

    return (
        <FormControl sx={{ ...props.sx }}>
            <FormControl.Label visuallyHidden htmlFor="repo-name">
                Repository Name
            </FormControl.Label>
            <Box sx={{ width: '100%', display: 'flex' }}>
                <Box
                    as="span"
                    sx={{
                        display: 'inline-flext',
                        alignItems: 'center',
                        paddingLeft: '12px',
                        backgroundColor: 'canvas.subtle',
                        borderColor: 'border.default',
                        borderWidth: '1',
                        borderStyle: 'solid',
                        borderRadius: '6px 0 0 6px',
                        height: '40px',
                        verticalAlign: 'bottom',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <StyledOcticon icon={MarkGithubIcon} size={18} />
                    <Text
                        sx={{
                            fontSize: 2,
                            paddingLeft: [1, 1, 2, 3],
                            paddingRight: 2,
                        }}
                    >
                        github.com /
                    </Text>
                </Box>
                <TextInput
                    id="repo-name"
                    placeholder="owner/repo"
                    value={value}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                    trailingAction={
                        <TextInput.Action
                            icon={CheckIcon}
                            onClick={onInputTrailingAction}
                            sx={{ visibility: isValid ? 'visible' : 'hidden', color: 'fg.subtle' }}
                            aria-label="show events from repository"
                        />
                    }
                    aria-describedby="repo-name-hint"
                    aria-invalid={!isValid}
                    sx={{ flexGrow: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: '40px', fontSize: 2 }}
                />
            </Box>
            <FormControl.Caption id="repo-name-hint" sx={{ fontSize: 2, paddingTop: 2 }}>
                <IconButton
                    icon={SyncIcon}
                    size="small"
                    variant="invisible"
                    onClick={changeSuggestions}
                    aria-label="change suggestions"
                    sx={{ mr: 1, verticalAlign: 'middle' }}
                />
                Try these
                {shownSuggestions.map((repo) => (
                    <Link
                        key={`${repo.owner}/${repo.repo}`}
                        onClick={() => onSuggestionClick(repo)}
                        sx={{ ml: 2, cursor: 'pointer' }}
                    >
                        {repo.owner}/{repo.repo}
                    </Link>
                ))}
            </FormControl.Caption>
        </FormControl>
    )
}

function isValidRepoName(s: string): boolean {
    return repoNamePattern.test(s)
}
