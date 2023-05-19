import { Meta, StoryObj } from '@storybook/react'
import { Intro } from './Intro'

export default {
    title: 'components/Intro',
    component: Intro,
} as Meta<typeof Intro>

type Story = StoryObj<typeof Intro>

export const Basic: Story = {
    args: {
        sx: {
            width: '90vw',
            height: '60vh',
        },
    },
}
