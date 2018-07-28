const url = window.location.origin + window.location.pathname

chrome.storage.sync.get(url, (data) => {
    const scrollY = data[url] || null
    if (scrollY) {
        setTimeout(() => {
            window.scroll(0, scrollY)
        }, 250)
    }
})
