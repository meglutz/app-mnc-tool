const {app, BrowserWindow} = require('electron')
let IPC = require("electron").ipcMain;

/* global reference of window obj. Otherwise the window will be closed if the
JavaScript object is garbage collected. */
let mainWindow

app.on('ready', createMainWindow)

/* quit when all windows are closed. */
app.on('window-all-closed', function ()
  {
    /* on macOS it is common for applications and their menu bar
    to stay active until the user quits explicitly with Cmd + Q */
    if (process.platform !== 'darwin')
    {
      app.quit();
    }
  }
)


app.on('activate', function ()
  {
    /* on macOS it's common to re-create a window in the app when the
    dock icon is clicked and there are no other windows open. */
    if (mainWindow === null)
    {
      createWindow();
    }
  }
)


function createMainWindow()
{
  mainWindow = new BrowserWindow
  (
    {
      width: 800,
      height: 600,
      webPreferences:
      {
        nodeIntegration: true
      }
    }
  )

  /* maximize mainWindow */
  mainWindow.maximize();
  mainWindow.loadFile('index.html')

  /* open the DevTools. */
  if (process.argv[2] == "-debug")
  {
    mainWindow.webContents.openDevTools()
  }

  /* Emitted when the window is closed. */
  mainWindow.on('closed', function ()
    {
      /* dereference the window object, usually you would store windows in an array if your
      app supports multi windows, this is the time when you should delete the corresponding element. */
      mainWindow = null
    }
  )
}


/* Close tool on [closeTool] via IPC */
IPC.on("closeTool", function(event, data)
{
  app.quit();
});
