const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("record", {
    insert: (data) => ipcRenderer.send("insert-record", data),
    getSubjects: (callback) => ipcRenderer.on("allSubjects", callback),
});
