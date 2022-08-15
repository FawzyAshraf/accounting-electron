const form = document.querySelector("#record-form");

window.record.getSubjects((event, allSubjects) => {
    const selectElement = document.querySelector("select");
    allSubjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.innerHTML = subject.code;
        selectElement.appendChild(option);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todayDate = new Date();
    const todayDateString = `${todayDate.getFullYear()}-${
        todayDate.getMonth() < 9 ? "0" : ""
    }${todayDate.getMonth() + 1}-${
        todayDate.getDate() < 10 ? "0" : ""
    }${todayDate.getDate()}`;

    const recordName = form.querySelector("#record-name").value;
    const subId = form.querySelector("#subject-id").value;
    const basic = form.querySelector("#basic").value || 0;
    const plus = form.querySelector("#plus").value || 0;
    const deduction = form.querySelector("#deduction").value || 0;
    const date = form.querySelector("#date").value || todayDateString;
    const balance = form.querySelector("#balance").value || 0;
    const details = form.querySelector("#details").value || " ";

    const dateTimeStamp = new Date(date).getTime();
    window.record.insert({
        name: recordName,
        subId,
        basic,
        plus,
        deduction,
        balance,
        date: dateTimeStamp,
        details,
    });
    document.querySelector(
        "#message"
    ).innerText = `Added ${recordName} Successfully`;
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
});
