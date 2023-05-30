import { Dialog, DialogProps, SxProp } from '@primer/react'
import { GearIcon } from '@primer/octicons-react'
import { Settings, SettingsData } from 'core'

export interface DasnboardProps extends Pick<DialogProps, 'isOpen' | 'onDismiss' | 'returnFocusRef'>, SxProp {
    settings: SettingsData
    onSettingChange: (settings: Partial<SettingsData>) => void
}

export function Dashboard(props: DasnboardProps) {
    const { onSettingChange, settings, ...dialogProps } = props

    return (
        <Dialog {...dialogProps}>
            <Dialog.Header>
                <GearIcon />
            </Dialog.Header>
            <Settings sx={{ padding: 3 }} onSettingChange={onSettingChange} settings={settings} />
        </Dialog>
    )
}
