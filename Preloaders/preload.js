const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    setTitle: (title) => ipcRenderer.send("set-title", title),
    insert: (data) => ipcRenderer.send("insert", data),
});
