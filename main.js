const fs = require("fs");
const { app, BrowserWindow, dialog } = require("electron");

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile(`${__dirname}/index.html`);
  getFile();
});

const getFile = async () => {
  const filesObj = await dialog.showOpenDialog({ properties: ["openFile"] });
  if (filesObj.canceled) return;
  const content = fs.readFileSync(filesObj.filePaths[0]).toString();
  console.log(content);
};
