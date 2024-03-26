const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    sendError: () => ipcRenderer.send("open-error-dialog"),
    // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("environment", {
    user: () => process.env.USER || "",
});
