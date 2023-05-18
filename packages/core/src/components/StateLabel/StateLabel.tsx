import { themeGet, StyledOcticon, sx, SxProp } from '@primer/react'
import {
    GitMergeIcon,
    GitPullRequestIcon,
    IssueClosedIcon,
    SkipIcon,
    IssueDraftIcon,
    IssueOpenedIcon,
    QuestionIcon,
    GitMergeQueueIcon,
    Icon,
    StarIcon,
    RepoForkedIcon,
} from '@primer/octicons-react'
import styled from 'styled-components'
import { variant } from 'styled-system'

const octiconMap: Record<string, { icon: Icon; text: string }> = {
    issueOpened: { icon: IssueOpenedIcon, text: 'Open' },
    pullOpened: { icon: GitPullRequestIcon, text: 'Open' },
    issueClosed: { icon: IssueClosedIcon, text: 'Closed' },
    issueClosedNotPlanned: { icon: SkipIcon, text: 'Closed' },
    pullClosed: { icon: GitPullRequestIcon, text: 'Closed' },
    pullMerged: { icon: GitMergeIcon, text: 'Merged' },
    draft: { icon: GitPullRequestIcon, text: 'Draft' },
    issueDraft: { icon: IssueDraftIcon, text: 'Draft' },
    pullQueued: { icon: GitMergeQueueIcon, text: 'Queued' },
    starred: { icon: StarIcon, text: 'Star' },
    forked: { icon: RepoForkedIcon, text: 'Fork' },
}

const colorVariants = variant({
    prop: 'status',
    variants: {
        issueClosed: {
            backgroundColor: 'done.emphasis',
            color: 'fg.onEmphasis',
        },
        issueClosedNotPlanned: {
            backgroundColor: 'neutral.emphasis',
            color: 'fg.onEmphasis',
        },
        pullClosed: {
            backgroundColor: 'closed.emphasis',
            color: 'fg.onEmphasis',
        },
        pullMerged: {
            backgroundColor: 'done.emphasis',
            color: 'fg.onEmphasis',
        },
        pullQueued: {
            backgroundColor: 'attention.emphasis',
            color: 'fg.onEmphasis',
        },
        issueOpened: {
            backgroundColor: 'open.emphasis',
            color: 'fg.onEmphasis',
        },
        pullOpened: {
            backgroundColor: 'open.emphasis',
            color: 'fg.onEmphasis',
        },
        draft: {
            backgroundColor: 'neutral.emphasis',
            color: 'fg.onEmphasis',
        },
        issueDraft: {
            backgroundColor: 'neutral.emphasis',
            color: 'fg.onEmphasis',
        },
        starred: {
            backgroundColor: 'neutral.muted',
            color: 'fg.muted',
        },
        forked: {
            backgroundColor: 'neutral.muted',
            color: 'fg.muted',
        },
    },
})

const sizeVariants = variant({
    prop: 'variant',
    variants: {
        small: {
            paddingX: 2,
            paddingY: 1,
            fontSize: 0,
        },
        normal: {
            paddingX: '12px',
            paddingY: 2,
            fontSize: 1,
        },
    },
})

type StyledStateLabelBaseProps = {
    variant?: 'small' | 'normal'
    status: keyof typeof octiconMap
} & SxProp

const StateLabelBase = styled.span<StyledStateLabelBaseProps>`
    display: inline-flex;
    align-items: center;
    font-weight: ${themeGet('fontWeights.bold')};
    line-height: 16px;
    color: ${themeGet('colors.canvas.default')};
    text-align: center;
    border-radius: ${themeGet('radii.3')};
    ${colorVariants};
    ${sizeVariants};
    ${sx};
`

export type StateLabelProps = ComponentProps<typeof StateLabelBase>

// This component is copied from https://github.com/primer/react/blob/cc13cf6316e9725897b90a3b919b738b798e526f/src/StateLabel/StateLabel.tsx
// with some added status.
export function StateLabel({ children, status, variant: variantProp = 'normal', ...rest }: StateLabelProps) {
    let icon: Icon = QuestionIcon
    let content: React.ReactNode = children
    const item = octiconMap[status]
    if (item) {
        icon = item.icon
        content = content || item.text
    }

    const octiconProps = variantProp === 'small' ? { width: '1em' } : {}
    return (
        <StateLabelBase {...rest} variant={variantProp} status={status}>
            {status && <StyledOcticon {...octiconProps} icon={icon} sx={{ mr: 1 }} />}
            {content}
        </StateLabelBase>
    )
}

/**
 * Extract a component's props
 *
 * Source: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-component
 *
 * @example ComponentProps<typeof MyComponent>
 *
 * COPIED FROM https://github.com/primer/react/blob/cc13cf6316e9725897b90a3b919b738b798e526f/src/utils/types/ComponentProps.ts
 */
export type ComponentProps<T> = T extends React.ComponentType<React.PropsWithChildren<infer Props>>
    ? Props extends object
        ? Props
        : never
    : never
