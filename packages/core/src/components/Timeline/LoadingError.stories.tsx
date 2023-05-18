import { Meta, StoryObj } from '@storybook/react'
import { LoadingError } from './LoadingError'

export default {
    title: 'components/Timeline/LoadingError',
    component: LoadingError,
} as Meta<typeof LoadingError>

type Story = StoryObj<typeof LoadingError>

export const AuthenticatedRateLimit: Story = {
    args: {
        error: { status: 403 },
        authenticated: true,
    },
}

export const UnauthenticatedRateLimit: Story = {
    args: {
        error: { status: 403 },
        authenticated: false,
    },
}

export const NotFound: Story = {
    args: {
        error: { status: 404 },
    },
}

export const Unkonwn: Story = {
    args: {
        error: { status: 500 },
    },
}
