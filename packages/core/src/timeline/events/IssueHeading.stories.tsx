import { Meta, StoryObj } from '@storybook/react'
import { IssueHeading } from './IssueHeading'

export default {
    title: 'timeline/events/IssueHeading',
    component: IssueHeading,
} as Meta<typeof IssueHeading>

type Story = StoryObj<typeof IssueHeading>

export const Default: Story = {
    args: {
        status: 'issueOpened',
        title: 'Add a setting to mark file(s) readonly [nonEditable]',
        url: 'https://github.com/microsoft/vscode/pull/161716',
        number: 161716,
    },
}
