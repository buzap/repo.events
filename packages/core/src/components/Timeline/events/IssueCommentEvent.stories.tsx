import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { GithubEvent } from '../../../types/github'
import issueCommentEventSample from '../../../fixtures/issueCommentEvent.json'
import { IssueCommentEvent } from './IssueCommentEvent'

export default {
    title: 'components/Timeline/events/IssueCommentEvent',
    component: IssueCommentEvent,
} as Meta<typeof IssueCommentEvent>

const template: StoryFn<typeof IssueCommentEvent> = (args) => <IssueCommentEvent {...args} />

export const Created = template.bind({})
Created.args = {
    event: issueCommentEventSample as GithubEvent,
}
