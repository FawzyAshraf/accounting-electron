const { ipcRenderer, contextBridge } = require("electron");

ipcRenderer.on("allAccounts", function (event, allAccounts) {
    const selectElement = document.querySelector("select");
    allAccounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.innerHTML = account.name;
        selectElement.appendChild(option);
    });
});

contextBridge.exposeInMainWorld("record", {
    insert: (data) => ipcRenderer.send("insert-record", data),
});
