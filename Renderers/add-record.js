const form = document.querySelector("#record-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todayDate = new Date();
    const todayDateString = `${todayDate.getFullYear()}-${
        todayDate.getMonth() < 9 ? "0" : ""
    }${todayDate.getMonth() + 1}-${
        todayDate.getDate() < 10 ? "0" : ""
    }${todayDate.getDate()}`;

    const recordName = form.querySelector("#record-name").value;
    const code = form.querySelector("#code").value;
    const accountId = form.querySelector("#account-id").value;
    const basic = form.querySelector("#basic").value || 0;
    const plus = form.querySelector("#plus").value || 0;
    const deduction = form.querySelector("#deduction").value || 0;
    const date = form.querySelector("#date").value || todayDateString;
    const balance = form.querySelector("#balance").value || 0;
    const details = form.querySelector("#details").value || " ";
    const notes = form.querySelector("#notes").value || " ";

    const dateTimeStamp = new Date(date).getTime();
    window.record.insert({
        name: recordName,
        code,
        accountId,
        basic,
        plus,
        deduction,
        balance,
        date: dateTimeStamp,
        details,
        notes,
    });
    // document.querySelector(
    //     "#message"
    // ).innerText = `Added ${recordName} Successfully`;
});
