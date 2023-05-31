import { Meta, StoryObj } from '@storybook/react'
import { Octokit } from 'octokit'
import { defaultOctokitOptions } from '../../utils'
import { Timeline } from './Timeline'

export default {
    title: 'components/Timeline/Timeline',
    component: Timeline,
} as Meta<typeof Timeline>

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
    args: {
        owner: 'golang',
        repo: 'go',
        octokit: new Octokit(defaultOctokitOptions()),
    },
}
