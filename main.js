console.log("main process working");
console.log("main.js");

const electron = require("electron");
const ipc = electron.ipcMain;
const dialog = electron.dialog;

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
    /* you can create as many windows as you want */
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "#1F1A24",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");

    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });
};

ipc.on("open-error-dialog", (event) => {
    dialog.showErrorBox("An error message", "Demo of an error message");
});

app.whenReady().then(() => {
    ipcMain.handle("ping", () => "pong");
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
