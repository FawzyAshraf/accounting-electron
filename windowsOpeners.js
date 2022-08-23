const { BrowserWindow } = require("electron");
const path = require("path");
const {
    getAllAccounts,
    getAllAccountsDetailed,
    getSubjects,
    getAllSubjectsDetailed,
} = require("./db");

exports.addAccount = async () => {
    const accountWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/add-account.js"),
        },
    });

    // accountWindow.openDevTools();

    accountWindow.loadFile("HTMLFiles/add-account.html");
};

exports.addSubject = async () => {
    const subjectWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/add-subject.js"),
        },
    });

    const allAccounts = await getAllAccounts();
    // console.log("hello");

    subjectWindow.webContents.on("did-finish-load", () => {
        subjectWindow.webContents.send("allAccounts", allAccounts);
    });

    // subjectWindow.openDevTools();

    subjectWindow.loadFile("HTMLFiles/add-subject.html");
};

exports.addRecord = async () => {
    const recordWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/add-record.js"),
        },
    });

    const allSubjects = await getAllSubjectsDetailed({});
    // console.log("hello");
    recordWindow.webContents.on("did-finish-load", () => {
        recordWindow.webContents.send("allSubjects", allSubjects);
    });

    //recordWindow.openDevTools();

    recordWindow.loadFile("HTMLFiles/add-record.html");
};

exports.viewAccounts = async () => {
    const accountsWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/view-accounts.js"),
        },
    });

    // accountsWindow.openDevTools();

    const allAccounts = await getAllAccountsDetailed();

    accountsWindow.webContents.on("did-finish-load", () => {
        accountsWindow.webContents.send("allAccounts", allAccounts);
    });
    accountsWindow.loadFile("HTMLFiles/view-accounts.html");
};

exports.viewSubjects = async () => {
    const subjectsWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/view-subjects.js"),
        },
    });

    const allSubjects = await getSubjects({});
    subjectsWindow.webContents.on("did-finish-load", () => {
        subjectsWindow.webContents.send("allSubjects", allSubjects);
    });

    // subjectsWindow.openDevTools();
    subjectsWindow.loadFile("HTMLFiles/view-subjects.html");
};

exports.searchRecords = async () => {
    const recordsWindow = new BrowserWindow({
        height: 1200,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "Preloaders/search-records.js"),
        },
    });

    // recordsWindow.openDevTools();

    const allAccounts = await getAllAccounts();
    recordsWindow.webContents.on("did-finish-load", () => {
        recordsWindow.webContents.send("allAccounts", allAccounts);
    });

    recordsWindow.loadFile("HTMLFiles/search-records.html");
};
