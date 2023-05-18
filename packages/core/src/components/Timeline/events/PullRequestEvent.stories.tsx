import { Meta, StoryObj } from '@storybook/react'
import { PullRequestEvent } from './PullRequestEvent'
import pullRequestOpened from '../../../fixtures/pullRequestOpenedEvent.json'
import pullRequestClosed from '../../../fixtures/pullRequestClosedEvent.json'

export default {
    title: 'components/Timeline/events/PullRequestEvent',
    component: PullRequestEvent,
} as Meta<typeof PullRequestEvent>

type Story = StoryObj<typeof PullRequestEvent>

export const Opened: Story = {
    args: {
        event: pullRequestOpened,
    },
}

export const Closed: Story = {
    args: {
        event: pullRequestClosed,
    },
}
