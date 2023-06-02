import { Box, SxProp, RelativeTime, Text, Label } from '@primer/react'
import { GithubEvent } from '../../../../utils/github'
import { MarkdownPreview } from '../../MarkdownPreview'
import { Actor } from '../../../Actor'
import { Row } from './Row'

export interface BaseProps extends SxProp {
    event: GithubEvent
    description: React.ReactNode
    authorAssociation?: string
    headline?: React.ReactNode
    details?: React.ReactNode
    markdownDetails?: string
}

const AuthorAssociationLabels: { [key: string]: string } = {
    COLLABORATOR: 'Collaborator',
    CONTRIBUTOR: 'Contributor',
    FIRST_TIMER: 'First Timer',
    FIRST_TIME_CONTRIBUTOR: 'First Time Contributor',
    MEMBER: 'Member',
    OWNER: 'Owner',
}

export function Base(props: BaseProps) {
    const { event } = props

    let details: React.ReactNode = null
    if (props.details) {
        details = props.details
    } else if (props.markdownDetails) {
        details = <MarkdownPreview content={props.markdownDetails} />
    }

    const authorAssociationLabel = AuthorAssociationLabels[props.authorAssociation || '']

    return (
        <Row sx={props.sx}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box as="span" sx={{ flexGrow: 1 }}>
                    <Actor actor={props.event.actor} />
                    {authorAssociationLabel && (
                        <Label size="small" sx={{ mx: 1 }}>
                            {authorAssociationLabel}
                        </Label>
                    )}
                    <Text sx={{ ml: 1, color: 'fg.muted' }}>{props.description}</Text>
                </Box>
                <RelativeTime
                    datetime={event.created_at || ''}
                    title={event.created_at || ''}
                    sx={{ color: 'fg.muted', ml: '34px' }}
                />
            </Box>
            <Box sx={{ ml: '34px' }}>
                {props.headline && <Box>{props.headline}</Box>}
                {details && <Box sx={{ mt: 1 }}>{details}</Box>}
            </Box>
        </Row>
    )
}
