const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("homepage", {
    viewAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
    viewSubjects: (callback) => ipcRenderer.on("allSubjects", callback),
    viewRecords: (callback) => ipcRenderer.on("allRecords", callback),
});
