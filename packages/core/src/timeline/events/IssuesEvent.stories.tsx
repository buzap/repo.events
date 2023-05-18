import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import issueOpenedEventSample from '../../fixtures/issueOpenedEvent.json'
import issueClosedEventSample from '../../fixtures/issueClosedEvent.json'
import { GithubEvent } from '../../types/github'
import { IssuesEvent } from './issuesEvent'

export default {
    title: 'timeline/events/IssuesEvent',
    component: IssuesEvent,
} as Meta<typeof IssuesEvent>

const template: StoryFn<typeof IssuesEvent> = (args) => <IssuesEvent {...args} />

export const IssueOpened = template.bind({})
IssueOpened.args = {
    event: issueOpenedEventSample as GithubEvent,
}

export const IssueClosed = template.bind({})
IssueClosed.args = {
    event: issueClosedEventSample as GithubEvent,
}

export const IssueClosedNotPlanned = template.bind({})
const issueClosedNotPlannedSample = JSON.parse(JSON.stringify(issueClosedEventSample))
issueClosedNotPlannedSample.payload.issue.state_reason = 'not_planned'
IssueClosedNotPlanned.args = {
    event: issueClosedNotPlannedSample,
}

// export const issueReopened = template.bind({})
// issueReopened.args = {
//     event: {},
// }
