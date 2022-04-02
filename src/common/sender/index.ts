export interface SenderData {
  server: string
  key: string
  group?: string
  pageText: string
  pageTitle?: string
  pageUrl: string
}
// eslint-disable-next-line
export function send(data: SenderData) {
  console.info('send', data)
  const urls = [data.server, data.key, encodeURIComponent(data.pageTitle)]
  if (data.pageText) {
    urls.push(encodeURIComponent(data.pageText))
  }
  const queries = []
  if (data.group) {
    queries.push(`group=${encodeURIComponent(data.group)}`)
  }
  if (data.pageUrl) {
    queries.push(`copy=${encodeURIComponent(data.pageUrl)}`)
    queries.push(`url=${encodeURIComponent(data.pageUrl)}`)
  }
  request({
    url: `${urls.join('/')}?${queries.join('&')}`,
  })
}

interface RequestOption {
  url: string
}
function request(option: RequestOption) {
  return new Promise((resolve) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resolve(xmlHttp.responseText)
      }
    }
    xmlHttp.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    xmlHttp.open('GET', option.url, true) // true for asynchronous
    xmlHttp.send(null)
  })
}
