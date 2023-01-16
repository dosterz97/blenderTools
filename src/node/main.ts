import path from 'path'
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import log from 'electron-log'
import serve from 'electron-serve'
import { autoUpdater } from 'electron-updater'

const PRODUCTION = app.isPackaged
const MANAGE_UNREAL_WINDOW = false
const APP_NAME = PRODUCTION ? 'My Electron App' : 'My Electron App - Dev'
const RESOURCES_PATH = PRODUCTION ? process.resourcesPath : app.getAppPath()

app.setName(APP_NAME)

let loadURL: serve.loadURL

if (PRODUCTION) {
  log.info('Serving My Electron App...')
  loadURL = serve({ directory: 'build/browser', scheme: 'My Electron App' })
}

let mainWindow: BrowserWindow

function createMainWindow() {
  // Hide the app menu (not used)
  Menu.setApplicationMenu(null)

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 600,
    title: APP_NAME,
    webPreferences: {
      devTools: !PRODUCTION,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.on('close', () => {
    app.quit()
  })

  // Open external URLs in user's browser rather than electron app
  // Requires setting target="_blank" for links
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  // Open the DevTools.
  if (!PRODUCTION) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  // Load browser page
  const loadPromise = PRODUCTION ? loadURL(mainWindow) : mainWindow.loadURL('http://localhost:3002')

  loadPromise
    .then(() => {
      log.info('Site loaded.')

      // Check for and handle auto updates
      autoUpdater.logger = log
      autoUpdater.checkForUpdatesAndNotify()
      autoUpdater.on('checking-for-update', () => {
        log.info('checking-for-update')
      })
      autoUpdater.on('update-available', ev => {
        log.info('ev', ev)
      })
      autoUpdater.on('update-not-available', ev => {
        log.info('ev', ev)
      })
      autoUpdater.on('error', (ev, err) => {
        log.info('err', err)
      })
      autoUpdater.on('update-downloaded', ev => {
        log.info('ev', ev)
      })
    })
    .catch(err => console.error('site load error', err))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    ipcMain.handle('get-app-version', () => app.getVersion())
    ipcMain.handle('get-app-path', () => app.getAppPath())
  })
  .then(createMainWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
