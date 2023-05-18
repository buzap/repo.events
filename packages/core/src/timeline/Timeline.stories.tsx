import { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'

export default {
    title: 'timeline/Timeline',
    component: Timeline,
} as Meta<typeof Timeline>

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
    args: {
        owner: 'golang',
        repo: 'go',
    },
}
