import { BarkGroup, BarkServer, BarkSetting } from '@/common/settings/define'
import { goSetting, Menus } from './const'

export async function updateContextMenus(setting: BarkSetting) {
  await removeAllMenu()
  const { servers = [], groups = [] } = setting
  if (servers.length == 0) {
    createMenu({
      title: 'Configure',
      id: Menus.Config,
      onclick: goSetting,
    })
    return
  }
  if (servers.length == 1) {
    createServerMenu(servers[0], groups)
    return
  }
  createMenu({
    title: `Send to`,
    id: Menus.Root,
  })
  createMenu({
    title: `Send '%s' to`,
    contexts: ['selection', 'image'],
    id: Menus.RootSelection,
  })
  servers.forEach((server) => {
    createServerMenus(server, groups)
  })
}

function createServerMenu(server: BarkServer, groups: BarkGroup[]) {
  if (groups.length == 0) {
    createMenu({
      title: `Send to ${server.name}`,
      id: `bark_${server.id}`,
    })
    createMenu({
      title: `Send '%s' to ${server.name}`,
      id: `selection#bark_${server.id}`,
      contexts: ['selection'],
    })
    return
  }
  createMenu({
    title: `Send to ${server.name}`,
    id: `bark_${server.id}`,
  })
  createMenu({
    title: ` Send %s to ${server.name}`,
    id: `selection#bark_${server.id}`,
    contexts: ['selection'],
  })
  createGroup(server, groups)
}
function createServerMenus(server: BarkServer, groups: BarkGroup[]) {
  createMenu(
    {
      title: `${server.name}`,
      id: `bark_${server.id}`,
      parentId: 'bark_all',
    },
    true,
  )
  if (groups.length == 0) {
    return
  }
  createGroup(server, groups)
}

function createGroup(server: BarkServer, groups: BarkGroup[]) {
  createMenu(
    {
      title: `Default`,
      id: `bark_${server.id}_origin`,
      parentId: `bark_${server.id}`,
    },
    true,
  )
  groups.forEach((group) => {
    createMenu(
      {
        title: `${group.name}`,
        id: `bark_${server.id}_${group.id}`,
        parentId: `bark_${server.id}`,
      },
      true,
    )
  })
}

function removeAllMenu() {
  return new Promise<void>((resolve) => {
    chrome.contextMenus.removeAll(() => {
      resolve()
    })
  })
}

function createMenu(option: chrome.contextMenus.CreateProperties, section = false) {
  chrome.contextMenus.create(option)
  if (section) {
    option.contexts = ['selection', 'image']
    option.id = `selection#${option.id}`
    if (option.parentId) {
      option.parentId = `selection#${option.parentId}`
    }
    chrome.contextMenus.create(option) /*  */
  }
}
