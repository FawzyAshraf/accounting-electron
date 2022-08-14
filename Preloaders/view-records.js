const { ipcRenderer, contextBridge } = require("electron");

let accounts = [];

ipcRenderer.on("allAccounts", async function (event, allAccounts) {
	const selectElement = document.querySelector("select");
	allAccounts.forEach((account) => {
		const option = document.createElement("option");
		option.value = account.id;
		option.innerHTML = account.name;
		selectElement.appendChild(option);
	});
	accounts = await getData(allAccounts);
});

contextBridge.exposeInMainWorld("record", {
	search: (data) => ipcRenderer.invoke("search-records", data),
	accounts: async () => {
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
