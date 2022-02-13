import { updateContextMenus } from './contextMenu'
import { Setting } from '../../common/settings'
import { SenderData, send } from './../../common/sender/index'
import { goSetting, MenuIdRegs, Menus } from './const'
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
  // console.info(settings.setting)
  updateContextMenus(settings.setting)
})

// eslint-disable-next-line
function getServer(serverId: any) {
  const mathed = (settings.servers || []).filter((server) => server.id == serverId)
  if (mathed.length == 0) {
    return
  }
  return mathed[0]
}
// eslint-disable-next-line
function getGroup(groupId: any) {
  const mathed = (settings.groups || []).filter((group) => group.id == groupId)
  if (mathed.length == 0) {
    return
  }
  return mathed[0]
}
async function menuClicked(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
  const id = info.menuItemId.toString()
  if (id == Menus.Config) {
    goSetting()
    return
  }

  let serverId = ''
  let groupId = ''
  if (MenuIdRegs.Group.test(id)) {
    const matches = id.match(MenuIdRegs.Group)
    serverId = matches[2]
    groupId = matches[3]
    // console.info(`send to server:${matches[2]} group:${matches[3]}`)
  } else if (MenuIdRegs.GroupDefault.test(id)) {
    const matches = id.match(MenuIdRegs.GroupDefault)
    serverId = matches[2]
    // console.info(`send to server:${matches[2]} `)
  } else if (MenuIdRegs.Server.test(id)) {
    const matches = id.match(MenuIdRegs.Server)
    serverId = matches[2]
    // console.info(`send to server:${matches[2]} `)
  }
  if (!serverId) {
    return
  }
  const server = getServer(serverId)
  if (!server) {
    return
  }
  console.info(tab)
  const data: SenderData = {
    server: server.url,
    key: server.key,
    pageText: info.selectionText,
    pageTitle: tab.title,
    pageUrl: tab.url,
  }
  // if (!data.pageText) {
  //   data.pageText = await getPageDescription(tab)
  // }
  if (groupId) {
    const group = getGroup(groupId)
    if (group) {
      data.group = group.name
    }
  }
  send(data)
}
chrome.contextMenus.onClicked.addListener(menuClicked)
