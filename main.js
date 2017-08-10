const electron = require('electron')
const {app, BrowserWindow, globalShortcut} = electron

app.on('ready', ()=>  {
    let win = new BrowserWindow({width:800, height:600})
    win.loadURL(`file://${__dirname}/index.html`)

    const ret = globalShortcut.register('Tab', () => {
        console.log('CommandOrControl+X is pressed')
    })

    const ref = globalShortcut.register('1', () => {
        console.log('CommandOrControl+A is pressed')
    })

    if (!ret) {
        console.log('registration failed')
    }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})