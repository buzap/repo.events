import { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'
import { Octokit } from 'octokit'

export default {
    title: 'components/Timeline/Timeline',
    component: Timeline,
} as Meta<typeof Timeline>

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
    args: {
        owner: 'golang',
        repo: 'go',
        octokit: new Octokit({
            auth: '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',
        }),
    },
}
