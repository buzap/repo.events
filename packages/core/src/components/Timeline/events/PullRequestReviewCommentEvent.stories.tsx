import { Meta, StoryObj } from '@storybook/react'
import { PullRequestReviewCommentEvent } from './PullRequestReviewCommentEvent'
import PullRequestReviewCommentEvent_created from '../../../fixtures/PullRequestReviewCommentEvent_created.json'

export default {
    title: 'components/Timeline/events/PullRequestReviewCommentEvent',
    component: PullRequestReviewCommentEvent,
} as Meta<typeof PullRequestReviewCommentEvent>

type Story = StoryObj<typeof PullRequestReviewCommentEvent>

export const Default: Story = {
    args: {
        event: PullRequestReviewCommentEvent_created,
    },
}
