import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { PushEvent as PushEventData } from '../../../types/github'
import pushEventSample_oneCommit from '../../../fixtures/pushEvent_oneCommit.json'
import { PushEvent } from './PushEvent'

export default {
    title: 'components/Timeline/events/PushEvent',
    component: PushEvent,
} as Meta<typeof PushEvent>

const template: StoryFn<typeof PushEvent> = (args) => <PushEvent {...args} />

export const OneCommit = template.bind({})
OneCommit.args = {
    event: pushEventSample_oneCommit as PushEventData,
}
