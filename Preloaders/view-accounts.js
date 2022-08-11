const { ipcRenderer } = require("electron");

ipcRenderer.on("allAccounts", function (event, allAccounts) {
    const table = document.querySelector("table");
    console.log(allAccounts);
    allAccounts.forEach((account) => {
        const row = document.createElement("tr");
        Object.values(account).forEach((value) => {
            const cell = document.createElement("td");
            cell.innerText = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
});
