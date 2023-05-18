import React, { useCallback } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Box } from '@primer/react'
import { LoadDrive } from './LoadDrive'

export default {
    title: 'components/Timeline/LoadDrive',
    component: LoadDrive,
} as Meta<typeof LoadDrive>

const Template: StoryFn<typeof LoadDrive> = (args) => {
    const onRequestLoad = useCallback((): Promise<void> => {
        console.log('request load')
        return new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }, [])

    return (
        <Box sx={{ width: '100vw', height: '220vh', display: 'flext', alignItems: 'center', justifyContent: 'center' }}>
            <LoadDrive {...args} requestLoad={onRequestLoad} />
        </Box>
    )
}

export const Default: StoryFn<typeof LoadDrive> = Template.bind({})
Default.args = {
    maxAutomaticLoad: 3,
}
