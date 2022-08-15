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
        });
    } catch (err) {
        console.error(err);
    }
    document.querySelector("#message").innerText = `Added ${code} Successfully`;
    document.querySelectorAll("input[type=text]").forEach((input) => {
        input.value = "";
    });
    document.querySelectorAll("input[type=number]").forEach((input) => {
        input.value = 0;
    });
});
