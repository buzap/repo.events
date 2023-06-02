import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import issueOpenedEventSample from '../../../../fixtures/issueOpenedEvent.json'
import { Base } from './Base'
import { PrimaryHeadline } from './PrimaryHeadline'

export default {
    title: 'components/Timeline/events/common/Base',
    component: Base,
} as Meta<typeof Base>

const template: StoryFn<typeof Base> = (args) => <Base {...args} />

export const DescriptionOnly = template.bind({})
DescriptionOnly.args = {
    event: issueOpenedEventSample as unknown,
    description: 'did something',
}

export const DescriptionAndHeadline = template.bind({})
DescriptionAndHeadline.args = {
    event: issueOpenedEventSample as unknown,
    description: 'opened issue',
    headline: (
        <PrimaryHeadline
            status="issueOpened"
            title="Allow to change the font size and font of the workbench"
            url="https://github.com/microsoft/vscode/issues/519"
            trailingText="#519"
        />
    ),
}

export const EveryThing = template.bind({})
EveryThing.args = {
    event: issueOpenedEventSample as unknown,
    description: 'opened issue',
    authorAssociation: 'COLLABORATOR',
    headline: (
        <PrimaryHeadline
            status="issueOpened"
            title="Allow to change the font size and font of the workbench"
            url="https://github.com/microsoft/vscode/issues/519"
            trailingText="#519"
        />
    ),
    markdownDetails: issueOpenedEventSample.payload.issue.body,
}
