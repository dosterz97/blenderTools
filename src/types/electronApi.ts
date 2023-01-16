export interface MyElectronAPi {
  getAppVersion: () => Promise<string>
  getAppPath: () => Promise<string>
}
