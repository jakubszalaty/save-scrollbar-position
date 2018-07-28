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
                    const scrollObj = { scroll: data[0], date: new Date().toISOString() }

                    chrome.storage.sync.set({ [url]: scrollObj })

                    const date = new Date(scrollObj.date).toLocaleString()
                    statusScroll.textContent = `Scroll position saved at ${date}`
                }
            }
        )
    })

    clear.addEventListener('click', (element: any) => {
        chrome.storage.sync.remove(url)
        statusScroll.textContent = 'Scroll position not saved'
    })

    chrome.storage.sync.get(url, (data) => {
        const scrollObj = data[url] || null
        const date = new Date(scrollObj.date).toLocaleString()

        if (scrollObj) {
            statusScroll.textContent = `Scroll position saved at ${date}`
        } else {
            statusScroll.textContent = 'Scroll position not saved'
        }
    })
})
