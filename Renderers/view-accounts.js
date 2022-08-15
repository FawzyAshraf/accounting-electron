window.accounts.viewAccounts((event, allAccounts) => {
    const table = new Table(allAccounts);
    table.fillTable();
});
