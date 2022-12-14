const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("account", {
    insert: (data) => ipcRenderer.send("insert-account", data),
    refresh: () => ipcRenderer.invoke("new-data", "account"),
});
