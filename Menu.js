const { BrowserWindow } = require("electron");
const path = require("path");
const { getAllAccounts, getAllAccountsDetailed } = require("./db");

exports.menuTemplate = [
    {
        label: "Add",
        submenu: [
            {
                label: "Account",
                click: async () => {
                    const accountWindow = new BrowserWindow({
                        height: 1200,
                        width: 1000,
                        webPreferences: {
                            preload: path.join(
                                __dirname,
                                "Preloaders/add-account.js"
                            ),
                        },
                    });

                    // accountWindow.openDevTools();

                    accountWindow.loadFile("HTMLFiles/add-account.html");
                },
            },
            {
                label: "Record",
                click: async () => {
                    const recordWindow = new BrowserWindow({
                        height: 1200,
                        width: 1000,
                        webPreferences: {
                            preload: path.join(
                                __dirname,
                                "Preloaders/add-record.js"
                            ),
                        },
                    });

                    const allAccounts = await getAllAccounts();

                    recordWindow.webContents.send("allAccounts", allAccounts);

                    // recordWindow.openDevTools();

                    recordWindow.loadFile("HTMLFiles/add-record.html");
                },
            },
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Accounts",
                click: async () => {
                    const accountsWindow = new BrowserWindow({
                        height: 1200,
                        width: 1000,
                        webPreferences: {
                            preload: path.join(
                                __dirname,
                                "Preloaders/view-accounts.js"
                            ),
                        },
                    });

                    // accountsWindow.openDevTools();

                    const allAccounts = await getAllAccountsDetailed();

                    accountsWindow.webContents.send("allAccounts", allAccounts);
                    accountsWindow.loadFile("HTMLFiles/view-accounts.html");
                },
            },
            {
                label: "Records per Account",
                click: async () => {
                    const recordAccountWindow = new BrowserWindow({
                        height: 1200,
                        width: 1000,
                        webPreferences: {
                            preload: path.join(
                                __dirname,
                                "Preloaders/view-records.js"
                            ),
                        },
                    });

                    // const allAccounts = await getAllAccounts();
                    // recordAccountWindow.webContents.send(
                    // 	"allAccounts",
                    // 	allAccounts,
                    // );
                    const allAccounts = await getAllAccountsDetailed();

                    recordAccountWindow.webContents.send(
                        "allAccounts",
                        allAccounts
                    );

                    // recordAccountWindow.openDevTools();
                    recordAccountWindow.loadFile("HTMLFiles/view-records.html");
                },
            },
        ],
    },
    {
        label: "Search",
        submenu: [
            {
                label: "Records",
                click: async () => {
                    const recordsWindow = new BrowserWindow({
                        height: 1200,
                        width: 1000,
                        webPreferences: {
                            preload: path.join(
                                __dirname,
                                "Preloaders/search-records.js"
                            ),
                        },
                    });

                    // recordsWindow.openDevTools();

                    const allAccounts = await getAllAccounts();
                    recordsWindow.webContents.send("allAccounts", allAccounts);

                    recordsWindow.loadFile("HTMLFiles/search-records.html");
                },
            },
        ],
    },
    {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
    },
];
