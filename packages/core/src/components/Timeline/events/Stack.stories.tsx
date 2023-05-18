import { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'
import watchEventsSample from '../../../fixtures/watchEvents.json'

export default {
    title: 'components/Timeline/events/Stack',
    component: Stack,
} as Meta<typeof Stack>

type Story = StoryObj<typeof Stack>

export const Default: Story = {
    args: {
        events: watchEventsSample,
        eventType: 'WatchEvent',
    },
}
