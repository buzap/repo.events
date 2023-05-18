import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { MarkdownPreview } from './Preview'

export default {
    title: 'components/Timeline/markdown/MarkdownPreview',
    component: MarkdownPreview,
} as Meta<typeof MarkdownPreview>

const template: StoryFn<typeof MarkdownPreview> = (args) => <MarkdownPreview {...args} />

export const Basic = template.bind({})
Basic.args = {
    content: `# This is some title

The content of the **markdown document**
`,
}
