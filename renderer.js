const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const user = document.getElementById("user");
user.innerText = environment.user();

/* const func = async () => {
    const response = await window.versions.ping();
    console.log(response);
}; */

const errorBtn = document.getElementById("ipcButton");

errorBtn.addEventListener("click", function () {
    /**
     * rather than exposing ipc renderer directly in renderer js
     * we use preload script to access it through windows.versions
     */
    ipcProcess.sendError();
});

electron.sendBackError();

window.ipcRender.receive("message:update", (message) => {
    document.getElementById("text-caption").innerText = message;
});
/* const BrowserWindow = environment.browserWin;

let rendwin = new BrowserWindow();
rendwin.loadURL("http://github.com"); */

// func();
