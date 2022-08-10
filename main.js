// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { createTables, insertAccount } = require("./db");

createTables();

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/preload.js"),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile("HTMLFiles/index.html");

    ipcMain.on("set-title", (event, data) => {
        insertAccount({ name: data });
    });

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    const template = [
        {
            label: "Add",
            submenu: [
                {
                    label: "Accountant",
                    click: async () => {
                        const accountantWindow = new BrowserWindow({
                            height: 800,
                            width: 600,
                            webPreferences: path.join(
                                __dirname,
                                "Preloaders/add-account.js"
                            ),
                        });

                        accountantWindow.openDevTools();

                        accountantWindow.loadFile("HTMLFiles/add-account.html");
                    },
                },
                {
                    label: "Record",
                    click: async () => {
                        const recordWindow = new BrowserWindow({
                            height: 800,
                            width: 600,
                            webPreferences: path.join(
                                __dirname,
                                "Preloaders/add-record.js"
                            ),
                        });

                        recordWindow.openDevTools();

                        recordWindow.loadFile("HTMLFiles/add-record.html");
                    },
                },
            ],
        },
        {
            label: "window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                { role: "close" },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
