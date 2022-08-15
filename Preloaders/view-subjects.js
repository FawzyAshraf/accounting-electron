const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("subjects", {
    viewSubjects: (callback) => ipcRenderer.on("allSubjects", callback),
});
