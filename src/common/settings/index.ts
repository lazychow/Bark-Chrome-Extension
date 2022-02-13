import { BarkGroup, BarkServer, BarkSetting } from './define'
import { changeAndNotifySetting, listenSettingUpdated, syncSetting } from './sync'

const keys = ['servers', 'groups']
export class Setting {
  private _setting: BarkSetting
  /* eslint-disable-next-line */
  private updateListener: Function

  /* eslint-disable-next-line */
  constructor(listen = true, listener?: Function) {
    this._setting = {
      servers: [],
      groups: [],
    }
    this.updateListener = listener
    if (listen) {
      listenSettingUpdated(() => {
        this.updateSetting()
      })
    }
    this.updateSetting()
  }

  private updateSetting() {
    syncSetting((setting) => {
      keys.forEach((key) => {
        this._setting[key] = setting[key]
      })
      if (this.updateListener) {
        this.updateListener()
      }
    })
  }

  get servers() {
    return this._setting.servers || []
  }

  set servers(servers: BarkServer[]) {
    this._setting.servers = servers
    changeAndNotifySetting(this._setting)
  }

  addServer(server: BarkServer) {
    const servers = this._setting.servers || []
    servers.push(server)
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

  get setting() {
    return this._setting || {}
  }
}
