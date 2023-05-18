import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { StateLabel, ComponentProps } from './StateLabel'

export default {
    title: 'components/StateLabel',
    component: StateLabel,
} as Meta<ComponentProps<typeof StateLabel>>

export const Default = () => <StateLabel status="issueOpened">Open</StateLabel>

export const Playground: StoryFn<ComponentProps<typeof StateLabel>> = (args) => <StateLabel {...args}>Star</StateLabel>

Playground.args = {
    status: 'issueOpened',
    variant: 'small',
}

Playground.argTypes = {
    ref: {
        controls: false,
        table: {
            disable: true,
        },
    },
    sx: {
        controls: false,
        table: {
            disable: true,
        },
    },
    theme: {
        controls: false,
        table: {
            disable: true,
        },
    },
}
