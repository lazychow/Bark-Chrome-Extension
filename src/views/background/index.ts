import { updateContextMenus } from './contextMenu'
import { Setting } from '../../settings'
chrome.browserAction.onClicked.addListener(() => {
  // chrome.tabs.sendMessage(
  //   tab.id,
  //   {
  //     method: 'getSelection',
  //   },
  //   () => {},
  // )
})

const settings = new Setting(true, () => {
  console.info(settings.setting)
  updateContextMenus(settings.setting)
})

// Vue.
// new Vue({
//   created() {},
// })
// chrome.contextMenus.create({
//   title: 'Push To Device ',
//   onclick: () => {},
//   id: 'bark_1',
// })

// chrome.contextMenus.create({
//   title: 'Push To Device ',
//   onclick: () => {},
//   id: 'bark_1_1',
//   parentId: 'bark_1',
// })
