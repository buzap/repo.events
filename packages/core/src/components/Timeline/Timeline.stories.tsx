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
        octokit: new Octokit(),
    },
}
