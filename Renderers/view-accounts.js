document.addEventListener("DOMContentLoaded", async () => {
    const allAccounts = await window.accounts.viewAccounts();
    const table = new Table(allAccounts);
    table.fillTable();
});
