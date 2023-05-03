import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { EyeIcon } from '@primer/octicons-react'
import issueOpenedEventSample from '../../fixtures/issueOpenedEvent.json'
import { Base } from './base'

export default {
    title: 'timeline/events/Base',
    component: Base,
} as Meta<typeof Base>

const template: StoryFn<typeof Base> = (args) => <Base {...args} />

export const WithoutContent = template.bind({})
WithoutContent.args = {
    event: issueOpenedEventSample as unknown,
    summary: 'This is the summary',
    summaryLeading: <EyeIcon />,
}

export const WithContent = template.bind({})
WithContent.args = {
    event: issueOpenedEventSample as unknown,
    summary: 'There is some content below',
    markdownContent: 'This should render as `markdown`',
}

const e1 = JSON.parse(JSON.stringify(issueOpenedEventSample))
e1.actor.display_login = 'Shawn Conn'
export const ShowDisplayLogin = template.bind({})
ShowDisplayLogin.args = {
    event: e1,
    summary: 'See the display_login above',
}
