import { ChangeEvent, useCallback, useState } from 'react'
import { SxProp, Box, Text, TextInput, FormControl, StyledOcticon, Link, IconButton } from '@primer/react'
import { MarkGithubIcon, CheckIcon, SyncIcon } from '@primer/octicons-react'
import github100 from './github100.json'

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

    const [shownSuggestions, setShowSuggestions] = useState<string[]>(() => {
        // don't use getRandomRepoNames() or we will encounter the nextjs hydration issue
        return github100.slice(0, 3)
    })
    const changeSuggestions = useCallback(() => {
        setShowSuggestions(getRandomRepoNames())
    }, [])

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
                        height: '50px',
                        verticalAlign: 'bottom',
                    }}
                >
                    <StyledOcticon icon={MarkGithubIcon} size={18} />
                    <Text sx={{ fontSize: 3, paddingLeft: 3, paddingRight: 2 }}>github.com /</Text>
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
                    sx={{ flexGrow: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: '50px', fontSize: 3 }}
                />
            </Box>
            <FormControl.Caption id="repo-name-hint" sx={{ fontSize: 2, paddingTop: 2 }}>
                <IconButton
                    icon={SyncIcon}
                    size="small"
                    onClick={changeSuggestions}
                    aria-label="change suggestions"
                    sx={{ mr: 1 }}
                />
                Try these
                {shownSuggestions.map((s) => (
                    <Link key={s} onClick={() => onChange(s, 'suggestion')} sx={{ ml: 2, cursor: 'pointer' }}>
                        {s}
                    </Link>
                ))}
            </FormControl.Caption>
        </FormControl>
    )
}

function isValidRepoName(s: string): boolean {
    return repoNamePattern.test(s)
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomRepoNames(): string[] {
    return [github100[getRandomInt(0, 33)], github100[getRandomInt(33, 66)], github100[getRandomInt(66, 100)]]
}
