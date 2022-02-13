import Vue from 'vue'
import { pure } from '../../../common'
import { BarkGroup, BarkServer, BarkSetting } from '../../../common/settings/define'
import { changeAndNotifySetting, syncSetting } from '../../../common/settings/sync'

const keys = ['servers', 'groups']
class Setting {
  private _setting: BarkSetting
  /* eslint-disable-next-line */

  /* eslint-disable-next-line */
  constructor() {
    this._setting = Vue.observable({
      servers: [],
      groups: [],
    } as BarkSetting)
    this.updateSetting()
  }

  private updateSetting() {
    syncSetting((setting) => {
      keys.forEach((key) => {
        this._setting[key] = setting[key]
      })
    })
  }

  get servers() {
    return this._setting.servers || []
  }

  set servers(servers: BarkServer[]) {
    this._setting.servers = servers
    changeAndNotifySetting(this._setting)
  }

  updateServer(server: BarkServer) {
    if (!server.id) {
      server.id = new Date().getTime().toString()
      this.addServer(server)
    } else {
      const servers = this._setting.servers || []
      servers.forEach((ser, index) => {
        if (server.id == ser.id) {
          servers[index] = server
        }
      })
      this._setting.servers = servers
      changeAndNotifySetting(this._setting)
    }
  }
  private addServer(server: BarkServer) {
    const servers = this._setting.servers || []
    servers.push(server)
    this._setting.servers = servers
    changeAndNotifySetting(this._setting)
  }

  removeServer(id: string) {
    const servers = (this._setting.servers || []).filter((server) => server.id != id)
    this._setting.servers = servers
    changeAndNotifySetting(this._setting)
  }

  get groups() {
    return this._setting.groups || []
  }

  set groups(groups: BarkGroup[]) {
    this._setting.groups = groups
    changeAndNotifySetting(this._setting)
  }

  updateGroup(group: BarkGroup) {
    const groups = this._setting.groups || []
    if (group.id) {
      groups.forEach((gro, index) => {
        if (group.id == gro.id) {
          groups[index] = group
        }
      })
    } else {
      group.id = new Date().getTime().toString()
      groups.push(group)
    }

    this._setting.groups = groups
    console.info(pure(this._setting))
    changeAndNotifySetting(this._setting)
  }

  removeGroup(id: string) {
    const groups = (this._setting.groups || []).filter((group) => group.id != id)
    this._setting.groups = groups
    changeAndNotifySetting(this._setting)
  }

  get setting() {
    return this._setting || {}
  }
}
export const OptionSetting = new Setting()
