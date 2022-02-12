import { BarkSetting } from './define'

const SETTING_KEY = 'chrome:bark:setting'
export function changeAndNotifySetting(setting: BarkSetting) {
  chrome.storage.local.set({ [SETTING_KEY]: JSON.stringify(setting) }, () => {
    chrome.runtime.sendMessage({ [SETTING_KEY]: 'updated' })
  })
}

/* eslint-disable-next-line */
export function syncSetting(callBack: (setting: BarkSetting) => void) {
  chrome.storage.local.get(SETTING_KEY, (items) => {
    const settting: BarkSetting = JSON.parse(items[SETTING_KEY] || '{}')
    callBack(settting)
  })
}

/* eslint-disable-next-line */
export function listenSettingUpdated(callBack: Function) {
  chrome.runtime.onMessage.addListener((request) => {
    if (request[SETTING_KEY] == 'updated') {
      callBack()
    }
  })
}
