// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const {
	createTables,
	insertAccount,
	insertRecord,
	closeDBConnection,
	getRecords,
	insertSubject,
	getAllAccountsDetailed,
	getSubjects,
	deleteSubject,
	deleteAccount,
} = require("./db");
const { menuTemplate } = require("./Menu");
const {
	addAccount,
	addSubject,
	addRecord,
	viewSubjects,
	viewAccounts,
	searchRecords,
} = require("./windowsOpeners");

createTables();

async function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "Preloaders/preload.js"),
		},
	});

	mainWindow.loadFile("HTMLFiles/index.html");

	// mainWindow.webContents.openDevTools();

	let allAccounts = await getAllAccountsDetailed();
	let allRecords = await getRecords({});
	let allSubjects = await getSubjects({});

	ipcMain.handle("new-data", async (event, data) => {
		switch (data) {
			case "account":
				allAccounts = await getAllAccountsDetailed();
				break;
			case "subject":
				allSubjects = await getSubjects({});
				break;
			case "record":
				allRecords = await getRecords({});
				break;
			default:
				allAccounts = await getAllAccountsDetailed();
				allSubjects = await getSubjects({});
				allRecords = await getRecords({});
				break;
		}
		mainWindow.reload();
	});

	mainWindow.webContents.on("did-finish-load", () => {
		mainWindow.webContents.send("allAccounts", allAccounts);
		mainWindow.webContents.send("allRecords", allRecords);
		mainWindow.webContents.send("allSubjects", allSubjects);
	});

	const menu = Menu.buildFromTemplate(menuTemplate);
	mainWindow.setMenu(menu);
}

app.whenReady().then(() => {
	ipcMain.handle("search-records", async (event, data) => {
		const records = await getRecords(data);
		return records;
	});

	ipcMain.handle("open-window", async (event, windowName) => {
		switch (windowName) {
			case "add-account":
				addAccount();
				break;
			case "add-subject":
				addSubject();
				break;
			case "add-record":
				addRecord();
				break;
			case "view-account":
				viewAccounts();
				break;
			case "view-subject":
				viewSubjects();
				break;
			case "search-records":
				searchRecords();
				break;
			default:
				break;
		}
	});

	ipcMain.handle("delete-subject", async (event, id) => {
		deleteSubject(id);
	});

	ipcMain.handle("delete-account", async (event, id) => {
		deleteAccount(id);
	});

	ipcMain.on("insert-account", (event, data) => {
		insertAccount(data);
	});

	ipcMain.on("insert-record", (event, data) => {
		insertRecord(data);
	});

	ipcMain.on("insert-subject", (event, data) => {
		insertSubject(data);
	});

	ipcMain.handle("get-subject-from-accountID", (event, data) => {
		return getSubjects(data);
	});

	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	closeDBConnection();
	if (process.platform !== "darwin") app.quit();
});
