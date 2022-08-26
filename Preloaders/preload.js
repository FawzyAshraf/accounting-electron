const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("homepage", {
	viewAccounts: (callback) => ipcRenderer.on("allAccounts", callback),
	viewSubjects: (callback) => ipcRenderer.on("allSubjects", callback),
	viewRecords: (callback) => ipcRenderer.on("allRecords", callback),
	openWindow: (callback) => ipcRenderer.invoke("open-window", callback),
	deleteSubject: (id) => ipcRenderer.invoke("delete-subject", id),
	deleteAccount: (id) => ipcRenderer.invoke("delete-account", id),
	refresh: (data) => ipcRenderer.invoke("new-data", data),
});
