const save = document.getElementById('save')
const clear = document.getElementById('clear')
const statusScroll = document.getElementById('statusScroll')

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]
    const { id, url } = tab
    save.addEventListener('click', (element: any) => {
        chrome.tabs.executeScript(
            id,
            {
                code: `window.scrollY`,
            },
            (data) => {
                if (data) {
                    const scrollY = data[0]
                    chrome.storage.sync.set({ [url]: scrollY })
                    statusScroll.textContent = 'Scroll position saved'
                }
            }
        )
    })

    clear.addEventListener('click', (element: any) => {
        chrome.storage.sync.remove(url)
        statusScroll.textContent = 'Scroll position not saved'
    })

    chrome.storage.sync.get(url, (data) => {
        const scrollY = data[url] || null

        if (scrollY) {
            statusScroll.textContent = 'Scroll position saved'
        } else {
            statusScroll.textContent = 'Scroll position not saved'
        }
    })
})
