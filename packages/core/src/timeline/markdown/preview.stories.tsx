import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MarkdownPreview } from './preview'

export default {
    title: 'components/preview/MarkdownPreview',
    component: MarkdownPreview,
} as ComponentMeta<typeof MarkdownPreview>

const template: ComponentStory<typeof MarkdownPreview> = (args) => <MarkdownPreview {...args} />

export const basic = template.bind({})
basic.args = {
    content: `# This is some title

The content of the **markdown document**
`,
}
