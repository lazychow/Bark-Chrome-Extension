export function goSetting() {
  chrome.tabs.create({
    url: 'options.html',
  })
}
