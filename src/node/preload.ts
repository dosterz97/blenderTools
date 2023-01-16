import { contextBridge, ipcRenderer } from 'electron'

const api: MyElectronAPi = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: () => ipcRenderer.invoke('get-app-path')
}

contextBridge.exposeInMainWorld('electronAPI', api)
