const form = document.querySelector("#account-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const accountName = form.querySelector("#account-name").value;
    const basic = form.querySelector("#basic").value || "Basic";
    const plus = form.querySelector("#plus").value || "Plus";
    const deduction = form.querySelector("#deduction").value || "Deduction";
    const balance = form.querySelector("#balance").value || "Balance";
    window.account.insert({
        name: accountName,
        basic,
        plus,
        deduction,
        balance,
    });
    document.querySelector(
        "#message"
    ).innerText = `Added ${accountName} Successfully`;
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
    window.account.refresh();
});
