const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("subject", {
    insert: (data) => ipcRenderer.send("insert-subject", data),
    getAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
});
