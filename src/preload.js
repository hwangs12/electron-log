const { contextBridge, ipcRenderer, BrowserWindow } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("environment", {
    user: () => process.env.USER || "",
    // browserWin: electron.remote.BrowserWindow,
});

contextBridge.exposeInMainWorld("database", {
    sendAddChatRoomSignal: (chatRoomName) =>
        ipcRenderer.send("add-chat-box", {
            chatRoomName,
        }),
    listChatrooms: (callback) =>
        ipcRenderer.on("chatrooms", (_event, value) => {
            callback(value);
        }),
});

contextBridge.exposeInMainWorld("electron", {
    sendBackError: () =>
        ipcRenderer.on("opened-error-dialog", (event, arg) => console.log(arg)),
});

const ipc = {
    render: {
        // From render to main.
        send: [],
        // From main to render.
        receive: [
            "message:update", // Here is your channel name
        ],
        // From render to main and back again.
        sendReceive: [],
    },
};
