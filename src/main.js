const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = !app.isPackaged;
const path = require("path");

const { MongoClient } = require("mongodb");

const uri = process.env.mongo_uri;
console.log(uri);
const client = new MongoClient(uri);

/* function to list chatrooms from mongo */
async function getChatrooms() {
    try {
        await client.connect();
        const db = client.db("chat");
        const collection = db.collection("chatroom");
        const chatrooms = await collection.find({}).toArray();
        return chatrooms;
    } catch (error) {
        console.error(error);
    }
}

/* async function run() {
    try {
        await client.connect();
        const db = client.db("sample_mflix");
        const collection = db.collection("movies");

        // Find the first document in the collection
        const first = await collection.findOne();
        console.log(first);
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
} */

// run().catch(console.error);

const createWindow = async () => {
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

    window.loadFile(path.join(__dirname, "index.html"));

    const chatrooms = await getChatrooms();
    window.webContents.send("chatrooms", chatrooms);

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

ipcMain.on("add-chat-box", async function (event, payload) {
    const { chatRoomName } = payload;
    await client.connect();
    const db = client.db("chat");
    const collection = db.collection("chatroom");
    await collection.insertOne({ chatRoomName, conversations: [] });
});
