import { Meta, StoryObj } from '@storybook/react'
import { PullRequestReviewEvent } from './PullRequestReviewEvent'
import PullRequestReviewEvent_approved from '../../../fixtures/PullRequestReviewEvent_approved.json'

export default {
    title: 'components/Timeline/events/PullRequestReviewEvent',
    component: PullRequestReviewEvent,
} as Meta<typeof PullRequestReviewEvent>

type Story = StoryObj<typeof PullRequestReviewEvent>

export const Default: Story = {
    args: {
        event: PullRequestReviewEvent_approved,
    },
}
