import { SettingsData } from 'core'

export type UserSettings = SettingsData

export class Settings {
    static readonly Prefix = {
        UserSettings: 'user.',
    }

    static genUserSettingKey(key: keyof UserSettings): string {
        return Settings.Prefix.UserSettings + key
    }

    private storage: chrome.storage.StorageArea
    readonly onChanged: chrome.storage.StorageArea['onChanged']

    constructor(storage: chrome.storage.StorageArea = chrome.storage.local) {
        this.storage = storage
        this.onChanged = storage.onChanged
    }

    private async get(
        prefix: string,
        key: string | string[] | { [key: string]: unknown }
    ): Promise<{ [key: string]: unknown }> {
        let args: string | string[] | { [key: string]: unknown }
        if (typeof key === 'string') {
            args = [prefix + key]
        } else if (Array.isArray(key)) {
            args = key.map((k) => prefix + k)
        } else if (typeof key === 'object') {
            args = prefixObjectKeys(prefix, key)
        } else {
            throw new Error(`unsupported key ${key}`)
        }
        const value = await this.storage.get(args)
        return removePrefixFromObjectKeys(prefix, value)
    }

    private set(prefix: string, values: { [key: string]: unknown }): Promise<void> {
        const updatedValues = prefixObjectKeys(prefix, values)
        return this.storage.set(updatedValues)
    }

    getAllUserSettings(): Promise<UserSettings> {
        const settings: UserSettings = {
            personalAccessToken: null,
        }
        return this.get(
            Settings.Prefix.UserSettings,
            settings as unknown as { [key: string]: unknown }
        ) as unknown as Promise<UserSettings>
    }

    getUserSettings<S extends Partial<UserSettings>>(args: S): Promise<S> {
        return this.get(Settings.Prefix.UserSettings, args) as Promise<S>
    }

    setUserSettings(updates: Partial<UserSettings>): Promise<void> {
        return this.set(Settings.Prefix.UserSettings, updates)
    }
}

function prefixObjectKeys(prefix: string, value: { [key: string]: unknown }): { [key: string]: unknown } {
    const updatedValues: { [key: string]: unknown } = {}
    for (const [key, val] of Object.entries(value)) {
        updatedValues[prefix + key] = val
    }
    return updatedValues
}

function removePrefixFromObjectKeys(prefix: string, value: { [key: string]: unknown }): { [key: string]: unknown } {
    const updatedValues: { [key: string]: unknown } = {}
    const len = prefix.length
    for (const [key, val] of Object.entries(value)) {
        let k = key
        if (key.startsWith(prefix)) {
            k = key.slice(len)
        }
        updatedValues[k] = val
    }
    return updatedValues
}
