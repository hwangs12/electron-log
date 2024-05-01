const { app, BrowserWindow } = require("electron");
const isDev = !app.isPackaged;
const path = require("path");

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

    // to prevent the Sync Connection from ending prematurely, start reading from stdin so we don't exit

    process.stdin.resume();

    window.loadFile(path.join(__dirname, "index.html"));

    return window;
};

if (isDev) {
    require("electron-reload")(__dirname, {
        electron: path.resolve(
            __dirname,
            "..",
            "node_modules",
            ".bin",
            "electron"
        ),
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
