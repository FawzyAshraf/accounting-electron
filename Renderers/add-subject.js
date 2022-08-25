const form = document.querySelector("#subject-form");

window.subject.getAccounts((event, allAccounts) => {
    console.log("subjects called allAccounts");
    const selectElement = document.querySelector("select");
    allAccounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.innerHTML = account.name;
        selectElement.appendChild(option);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value;
    const code = form.querySelector("#code").value;
    const accountId = form.querySelector("#account-id").value;
    const basic = form.querySelector("#basic").value || 0;
    const notes = form.querySelector("#notes").value || " ";

    try {
        window.subject.insert({
            code,
            accountId,
            notes,
            basic,
            name,
        });
    } catch (err) {
        console.error(err);
    }
    window.subject.refresh();
    document.querySelector("#message").innerText = `Added ${name} Successfully`;
    document.querySelectorAll("input[type=text]").forEach((input) => {
        input.value = "";
    });
    document.querySelectorAll("input[type=number]").forEach((input) => {
        input.value = 0;
    });
    document.querySelector("textarea").value = "";
});
