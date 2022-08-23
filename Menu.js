const { BrowserWindow } = require("electron");
const path = require("path");
const {
    getAllAccounts,
    getAllAccountsDetailed,
    getSubjects,
    getAllSubjectsDetailed,
} = require("./db");
const {
    addAccount,
    addSubject,
    addRecord,
    viewAccounts,
    viewSubjects,
    searchRecords,
} = require("./windowsOpeners");

exports.menuTemplate = [
    {
        label: "Add",
        submenu: [
            {
                label: "Account",
                click: addAccount,
            },
            {
                label: "Subject",
                click: addSubject,
            },
            {
                label: "Record",
                click: addRecord,
            },
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Accounts",
                click: viewAccounts,
            },
            {
                label: "Subjects",
                click: viewSubjects,
            },
        ],
    },
    {
        label: "Search",
        submenu: [
            {
                label: "Records",
                click: searchRecords,
            },
        ],
    },
    {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
    },
];
