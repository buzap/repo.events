import { Meta, StoryObj } from '@storybook/react'
import { Actor } from './Actor'

export default {
    title: 'components/Actor',
    component: Actor,
} as Meta<typeof Actor>

type Story = StoryObj<typeof Actor>

export const Deault: Story = {
    args: {
        actor: {
            id: 123,
            login: 'buzap',
            display_login: 'Neil Armstrong',
            gravatar_id: null,
            url: '',
            avatar_url: 'https://avatars.githubusercontent.com/u/9068824',
        },
    },
}
