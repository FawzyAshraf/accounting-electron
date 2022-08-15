window.subjects.viewSubjects((event, allSubjects) => {
    const table = new Table(allSubjects);
    table.fillTable();
});
