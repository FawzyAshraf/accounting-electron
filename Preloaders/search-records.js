const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("record", {
    search: (data) => ipcRenderer.invoke("search-records", data),
    getAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
});
