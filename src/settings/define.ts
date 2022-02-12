export interface BarkServer {
  url: string
  key: string
  name: string
  id: string
}
export interface BarkGroup {
  name: string
  id: string
}
export interface BarkSetting {
  servers?: BarkServer[]
  groups?: BarkGroup[]
}
