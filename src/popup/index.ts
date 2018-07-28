const save = document.getElementById('save')
const restore = document.getElementById('restore')
const clear = document.getElementById('clear')
const statusScroll = document.getElementById('statusScroll')

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]
    const { id, url } = tab
    save.addEventListener('click', (element: any) => {
        chrome.tabs.executeScript(
            id,
            {
                code: `window.scrollY / document.body.scrollHeight`,
            },
            (data) => {
                if (data) {
                    const scrollObj = { scroll: data[0], date: new Date().toISOString() }

                    chrome.storage.sync.set({ [url]: scrollObj })

                    const date = new Date(scrollObj.date).toLocaleString()
                    statusScroll.textContent = `Scroll position saved at ${date}`
                    restore.style.display = 'initial'
                    clear.style.display = 'initial'
                }
            }
        )
    })

    restore.addEventListener('click', (element: any) => {
        chrome.storage.sync.get(url, (data) => {
            const scrollObj = data[url] || null

            if (scrollObj) {
                chrome.tabs.executeScript(id, {
                    code: `window.scroll(0, ${scrollObj.scroll} * document.body.scrollHeight)`,
                })
            }
        })
    })

    clear.addEventListener('click', (element: any) => {
        chrome.storage.sync.remove(url)
        statusScroll.textContent = 'Scroll position not saved'
        restore.style.display = ''
        clear.style.display = ''
    })

    chrome.storage.sync.get(url, (data) => {
        const scrollObj = data[url] || null

        if (scrollObj) {
            const date = new Date(scrollObj.date).toLocaleString()
            statusScroll.textContent = `Scroll position saved at ${date}`
            restore.style.display = 'initial'
            clear.style.display = 'initial'
        } else {
            statusScroll.textContent = 'Scroll position not saved'
        }
    })
})
