const content = document.getElementById('content')

const renderList = () =>
    chrome.storage.sync.get((items) => {
        const list = Object.keys(items).map((url) => {
            const date = new Date(items[url].date).toUTCString()
            return `<li><a href="${url}">${url}</a><span>${date}</span><button value="${url}">Remove</button></li>`
        })
        content.innerHTML = `<h3>List of urls</h3><ul>${list.join('')}</ul>`
    })

content.addEventListener('click', (event) => {
    const target: any = event.target
    if (target.tagName === 'BUTTON') {
        chrome.storage.sync.remove(target.value)
        renderList()
    }
})

renderList()
