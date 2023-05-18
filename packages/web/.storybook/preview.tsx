import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider, BaseStyles } from '@primer/react'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
}

export const decorators = [
    (Story) => (
        <ThemeProvider>
            <BaseStyles>
                <Story />
            </BaseStyles>
        </ThemeProvider>
    ),
]

export default preview
