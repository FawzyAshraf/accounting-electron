const { ipcRenderer, contextBridge } = require("electron");

let accounts;

ipcRenderer.on("allAccounts", async function (event, allAccounts) {
	accounts = await getData(allAccounts);
});

contextBridge.exposeInMainWorld("accounts", {
	viewAccounts: () => {
		return accounts;
	},
});

async function getData(data) {
	return new Promise((resolve, reject) => {
		try {
			resolve(data);
		} catch (err) {
			reject(err);
		}
	});
}
