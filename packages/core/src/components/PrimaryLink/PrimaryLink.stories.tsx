import { Meta, StoryObj } from '@storybook/react'
import { PrimaryLink } from './PrimaryLink'

export default {
    title: 'components/PrimaryLink',
    component: PrimaryLink,
} as Meta<typeof PrimaryLink>

type Story = StoryObj<typeof PrimaryLink>

export const Default: Story = {
    args: {
        children: 'testing testing',
        href: 'https://github.com',
    },
}

export const WithTrailingText: Story = {
    args: {
        children: 'Testing and testing',
        href: 'https://github.com',
        trailingText: '#19990',
    },
}
