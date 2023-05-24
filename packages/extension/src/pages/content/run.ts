import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
// customElements is not supported in content script but required by RelativeTime from @primer/react.
// using a polyfill.
import '@webcomponents/custom-elements'
import { getRepoFromLocation } from './util'
import { App } from './App'

function createNavItem(onClick: () => void): HTMLElement {
    const a = document.createElement('a')
    a.innerText = 'Activity'
    a.id = 'activity-tab'
    a.setAttribute('data-tab-item', 'activity-tab')
    a.setAttribute('data-turbo-frame', 'repo-content-turbo-frame')
    a.setAttribute('data-pjax', '#repo-content-pjax-container')
    a.setAttribute('data-view-component', 'true')
    a.className = 'UnderlineNav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item'

    a.addEventListener('click', () => {
        const repoInfo = getRepoFromLocation()
        if (!repoInfo) {
            return
        }
        history.pushState(null, '', `/${repoInfo.owner}/${repoInfo.repo}/activity`)
        onClick()
    })

    const li = document.createElement('li')
    li.setAttribute('data-view-component', 'true')
    li.className = 'd-inline-flex'
    li.appendChild(a)

    return li
}

function mountActivities() {
    const container = document.querySelector('turbo-frame#repo-content-turbo-frame')
    if (!container) {
        console.error('unable to find mount point for activities')
        return
    }
    while (container.lastChild) {
        container.removeChild(container.lastChild)
    }

    const rootNode = document.createElement('div')
    rootNode.id = 'repo-events-react-root'
    container.appendChild(rootNode)
    const root = createRoot(rootNode)

    const observer = new MutationObserver((mutations) => {
        let done = false
        let rootNodeRemoved = false
        for (const mu of mutations) {
            if (mu.type !== 'childList') {
                continue
            }
            for (const node of mu.removedNodes || []) {
                if (node === rootNode) {
                    rootNodeRemoved = true
                    done = true
                    break
                }
            }
            if (done) {
                break
            }
        }
        if (rootNodeRemoved) {
            root.unmount()
            observer.disconnect()
        }
    })
    observer.observe(container, { childList: true })

    root.render(createElement(App))
}

const ActivityPathPattern = /^\/([A-Za-z0-9-_.]+)\/([A-Za-z0-9-_.]+)\/activity/

function run() {
    const repo = getRepoFromLocation()
    if (repo === null) {
        return
    }

    window.addEventListener('popstate', () => {
        const isActivityPage = ActivityPathPattern.test(window.location.pathname)
        if (!isActivityPage) {
            return
        }
        mountActivities()
    })

    const navItem = createNavItem(() => {
        mountActivities()
    })

    const navContainer = document.querySelector('nav.UnderlineNav ul.UnderlineNav-body')
    navContainer.appendChild(navItem)
}

run()
