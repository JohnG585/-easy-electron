const electron = require('electron')
// Module to control application life.

const countdown = require('./countdown')
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipc = electron.ipcMain

const windows = []

app.on('ready', _=> {
  [1, 2, 3].forEach(_ => {
    let win = new BrowserWindow({
      height: 400,
      width: 400
    })

    win.loadURL(`file://${__dirname}/countdown.html`)

    win.on('closed', function () {
    mainWindow = null
    })

    windows.push(win)
  })
})

ipc.on('countdown-start', _ => {
  countdown(count => {
    windows.forEach(win => {
      win.webContents.send('countdown', count)
    })
  })
})
