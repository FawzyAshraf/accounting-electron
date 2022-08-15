const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("accounts", {
    viewAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
});
