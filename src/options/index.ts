const content = document.getElementById('content')

const renderList = () =>
    chrome.storage.sync.get((items) => {
        const list = Object.keys(items).map(
            (url) => `<li><a href="${url}">${url}</a><button value="${url}">Remove</button></li>`
        )
        content.innerHTML = `
    <h3>List of urls</h3>
    <ul>
        ${list.join('')}
    </ul>`
    })

content.addEventListener('click', (event) => {
    const target: any = event.target
    if (target.tagName === 'BUTTON') {
        chrome.storage.sync.remove(target.value)
        renderList()
    }
})

renderList()
