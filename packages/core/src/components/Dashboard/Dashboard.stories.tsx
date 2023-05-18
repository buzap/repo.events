import { Meta, StoryObj } from '@storybook/react'
import { Dashboard, Settings } from './Dashboard'

export default {
    title: 'components/Dashboard',
    component: Dashboard,
} as Meta<typeof Dashboard>

type Story = StoryObj<typeof Dashboard>

export const Default: Story = {
    args: {
        isOpen: true,
        settings: {
            personalAccessToken: null,
        },
        onSettingChange: (key: keyof Settings, value: unknown) => {
            console.log(key, value)
        },
    },
}
