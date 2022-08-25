const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("record", {
    insert: (data) => ipcRenderer.send("insert-record", data),
    getAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
    getSubjects: (data) =>
        ipcRenderer.invoke("get-subject-from-accountID", data),
    refresh: () => ipcRenderer.invoke("new-data", "record"),
});
