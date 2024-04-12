const env = process.env.NODE_ENV || "development";
const electron = require("electron");
const dialog = electron.dialog;

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

let window;

if (env === "development") {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron"),
        hardResetMethod: "exit",
    });
}

const createWindow = () => {
    /* you can create as many windows as you want */
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "#1F1A24",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    window.loadFile("index.html");

    return window;
};

ipcMain.on("open-error-dialog", (event) => {
    dialog.showErrorBox("An error message", "Demo of an error message");
    event.sender.send(
        "opened-error-dialog",
        "Main process opened error dialog"
    );
    let window = new BrowserWindow();
    window.loadURL("http://github.com");
});

app.on("ready", () => {
    window = createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
