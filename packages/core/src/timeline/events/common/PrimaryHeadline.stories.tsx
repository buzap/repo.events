import { Meta, StoryObj } from '@storybook/react'
import { PrimaryHeadline } from './PrimaryHeadline'

export default {
    title: 'timeline/events/common/PrimaryHeadline',
    component: PrimaryHeadline,
} as Meta<typeof PrimaryHeadline>

type Story = StoryObj<typeof PrimaryHeadline>

export const Default: Story = {
    args: {
        status: 'issueOpened',
        title: 'Add a setting to mark file(s) readonly [nonEditable]',
        url: 'https://github.com/microsoft/vscode/pull/161716',
        trailingText: '#161716',
    },
}
