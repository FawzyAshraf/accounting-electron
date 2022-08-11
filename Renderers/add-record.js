const form = document.querySelector("#record-form");

form.addEventListener("submit", (e) => {
    document.querySelector("#message").innerHTML = "hahahah";
    const recordName = form.querySelector("#record-name").value;
    const code = form.querySelector("#code").value;
    const accountId = form.querySelector("#account-id").value;
    const basic = form.querySelector("#basic").value || 0;
    const plus = form.querySelector("#plus").value || 0;
    const deduction = form.querySelector("#deduction").value || 0;
    const date = form.querySelector("#date").value || Date.now();
    const balance = form.querySelector("#balance").value || 0;
    const details = form.querySelector("#details").value || " ";
    const notes = form.querySelector("#notes").value || " ";
    window.record.insert({
        name: recordName,
        code,
        accountId,
        basic,
        plus,
        deduction,
        balance,
        date,
        details,
        notes,
    });
    e.preventDefault();
});
