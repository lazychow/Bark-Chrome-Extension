chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == 'getSelection') {
    sendResponse({ data: window.getSelection().toString() })
  } else if (request.method == 'bark:page:description') {
    sendResponse({ data: getDescription() })
    return true
  } else {
    sendResponse({}) // snub them.
  }
})

function getDescription() {
  const meta = window.document.getElementsByTagName('meta')
  console.info(meta)
  let share_desc = ''
  for (const i in meta) {
    if (meta[i].name && meta[i].name.toLowerCase() == 'description') {
      share_desc = meta[i].content
    }
  }
  console.info(`share_desc ${share_desc}`)
  return share_desc
}
