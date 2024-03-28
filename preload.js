const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("environment", {
    user: () => process.env.USER || "",
});

contextBridge.exposeInMainWorld("ipcProcess", {
    sendError: () => ipcRenderer.send("open-error-dialog"),
});

contextBridge.exposeInMainWorld("electron", {
    sendBackError: () =>
        ipcRenderer.on("opened-error-dialog", (event, arg) => console.log(arg)),
});
