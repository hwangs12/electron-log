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

// Exposed protected methods in the render process.
contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods.
    "ipcRender",
    {
        // From render to main.
        send: (channel, args) => {
            let validChannels = ipc.render.send;
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, args);
            }
        },
        // From main to render.
        receive: (channel, listener) => {
            let validChannels = ipc.render.receive;
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`.
                ipcRenderer.on(channel, (event, ...args) => listener(...args));
            }
        },
        // From render to main and back again.
        invoke: (channel, args) => {
            let validChannels = ipc.render.sendReceive;
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, args);
            }
        },
    }
);
