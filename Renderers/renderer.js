window.homepage.viewAccounts((event, allAccounts) => {
    const table = new Table(
        allAccounts,
        document.querySelector("#accounts-table")
    );
    table.fillTable();
});

window.homepage.viewSubjects((event, allSubjects) => {
    const table = new Table(
        allSubjects,
        document.querySelector("#subjects-table")
    );
    table.fillTable();
});

window.homepage.viewRecords((event, allRecords) => {
    allRecords.forEach((record) => {
        record["date"] = formatDate(record["date"]);
    });
    const table = new Table(
        allRecords,
        document.querySelector("#records-table")
    );
    table.fillTable();
});

function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() < 9 ? "0" : ""}${
        d.getMonth() + 1
    }-${d.getDate() < 10 ? "0" : ""}${d.getDate()}`;
}
