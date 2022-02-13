export function goSetting() {
  chrome.tabs.create({
    url: 'options.html',
  })
}

export function getPageDescription(tab: chrome.tabs.Tab) {
  return new Promise<string>((resolve) => {
    chrome.tabs.sendMessage(
      tab.id,
      {
        method: 'bark:page:description',
      },
      (data: string) => {
        resolve(data)
      },
    )
  })
}
/* eslint-disable no-unused-vars */
export enum Menus {
  Config = 'bark_config',
  Root = 'bark_all',
  RootSelection = 'selection#bark_all',
}

export const MenuIdRegs = {
  Group: /^(selection#)?bark_(\d+)_(\d+)$/,
  GroupDefault: /^(selection#)?bark_(\d+)_origin$/,
  Server: /^(selection#)?bark_(\d+)$/,
}
