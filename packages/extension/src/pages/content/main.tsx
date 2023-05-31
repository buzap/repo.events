import { createRoot } from 'react-dom/client'
// customElements is not supported in content script but required by RelativeTime from @primer/react.
// using a polyfill.
import '@webcomponents/custom-elements'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'
import { RepoIdentifier, getRepoFromLocation } from './util'
import { App } from './App'

refreshOnUpdate('pages/content')

const ActivityTabId = 'repo-events-activity-tab'

function injectNavItem(onClick: () => void) {
    const navContainer = document.querySelector('nav.UnderlineNav ul.UnderlineNav-body')

    const a = document.createElement('a')
    a.innerText = 'Activities'
    a.id = ActivityTabId
    a.setAttribute('data-tab-item', 'activity-tab')
    // a.setAttribute('data-turbo-frame', 'repo-content-turbo-frame')
    // a.setAttribute('data-pjax', '#repo-content-pjax-container')
    a.setAttribute('data-view-component', 'true')
    a.className = 'UnderlineNav-item no-wrap js-responsive-underlinenav-item'

    a.addEventListener('click', () => {
        const currentActiveTab = navContainer.querySelector('li a.selected')
        if (currentActiveTab) {
            currentActiveTab.classList.remove('selected', 'js-selected-navigation-item')
            currentActiveTab.setAttribute('aria-current', 'false')
        }
        a.classList.add('selected')
        onClick()
    })

    const li = document.createElement('li')
    li.setAttribute('data-view-component', 'true')
    li.className = 'd-inline-flex'
    li.appendChild(a)

    navContainer.appendChild(li)
}

function injectActivities(repoId: RepoIdentifier) {
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
            const navItem = document.querySelector(`#${ActivityTabId}`)
            if (navItem) {
                navItem.classList.remove('selected')
            }
            root.unmount()
            observer.disconnect()
        }
    })
    observer.observe(container, { childList: true })

    root.render(<App owner={repoId.owner} repo={repoId.repo} />)
}

function mountApp() {
    const repo = getRepoFromLocation()
    if (repo === null) {
        return
    }
    const onActivityTabClick = () => {
        injectActivities(repo)
    }
    injectNavItem(onActivityTabClick)
}

function run() {
    mountApp()
    setInterval(() => {
        const navItem = document.querySelector(`#${ActivityTabId}`)
        if (navItem) {
            return
        }
        mountApp()
    }, 1000)
}

run()
