const url = window.location.origin + window.location.pathname

chrome.storage.sync.get(url, (data) => {
    const scrollObj = data[url] || null
    if (scrollObj) {
        setTimeout(() => {
            window.scroll(0, scrollObj.scroll)
        }, 300)
    }
})
