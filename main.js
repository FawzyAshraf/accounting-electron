// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const {
	createTables,
	insertAccount,
	insertRecord,
	closeDBConnection,
	getRecords,
} = require("./db");
const { menuTemplate } = require("./Menu");

createTables();

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "Preloaders/preload.js"),
		},
	});

	mainWindow.loadFile("HTMLFiles/index.html");

	// mainWindow.webContents.openDevTools();

	const menu = Menu.buildFromTemplate(menuTemplate);
	mainWindow.setMenu(menu);
}

app.whenReady().then(() => {
	ipcMain.handle("search-records", async (event, data) => {
		const records = await getRecords(data);
		return records;
	});

	ipcMain.on("insert-account", (event, data) => {
		insertAccount(data);
	});

	ipcMain.on("insert-record", (event, data) => {
		insertRecord(data);
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
