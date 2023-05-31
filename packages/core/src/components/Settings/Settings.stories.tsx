import { Meta, StoryObj } from '@storybook/react'
import { Settings, SettingsData } from './Settings'

export default {
    title: 'components/Settings',
    component: Settings,
} as Meta<typeof Settings>

type Story = StoryObj<typeof Settings>

export const Default: Story = {
    args: {
        settings: {
            personalAccessToken: null,
        },
        onSettingChange: (settings: Partial<SettingsData>) => {
            console.log(settings)
        },
    },
}
