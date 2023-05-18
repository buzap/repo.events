import { Meta, StoryObj } from '@storybook/react'
import { SecondaryHeadline } from './SecondaryHeadline'
import { CommentIcon } from '@primer/octicons-react'

export default {
    title: 'timeline/events/common/SecondaryHeadline',
    component: SecondaryHeadline,
} as Meta<typeof SecondaryHeadline>

type Story = StoryObj<typeof SecondaryHeadline>

export const Default: Story = {
    args: {
        icon: CommentIcon,
        title: 'Add an optional configurable toolbar below the menu',
        trailingText: '#41309 (comment)',
        url: 'https://github.com/microsoft/vscode/issues/41309#issuecomment-356238665',
    },
}
