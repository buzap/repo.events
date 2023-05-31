import reloadOnUpdate from 'virtual:reload-on-update-in-background-script'

reloadOnUpdate('pages/background')

chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'openOptionsPage') {
        chrome.runtime.openOptionsPage()
    }
})
