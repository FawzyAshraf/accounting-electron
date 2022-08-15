const form = document.querySelector("#record-form");
const selectElement = document.querySelector("select");
const plusElement = form.querySelector("#plus");
const deductionElement = form.querySelector("#deduction");
const balanceElement = form.querySelector("#balance");

const calcBalance = () => {
    return (
        parseFloat(selectElement.options[selectElement.selectedIndex].dataset.basic) +
        parseFloat(plusElement.value) -
        parseFloat(deductionElement.value)
    );
};

const getDatasetVal = (key) => {
    return selectElement.options[selectElement.selectedIndex].dataset[key];
};

window.record.getSubjects((event, allSubjects) => {
    allSubjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.dataset.basic = subject.basic;
        option.dataset.account = subject.name;
        option.dataset.basicText = subject.basic_text;
        option.dataset.plusText = subject.plus_text;
        option.dataset.deductionText = subject.deduction_text;
        option.dataset.balanceText = subject.balance_text;
        option.innerText = subject.code;
        selectElement.appendChild(option);
    });

    const account = form.querySelector("#account");
    account.value = getDatasetVal("account");
    balanceElement.value = getDatasetVal("basic");
    document.querySelector("#basic_text").innerText = getDatasetVal("basicText");
    document.querySelector("#plus_text").innerText = getDatasetVal("plusText");
    document.querySelector("#deduction_text").innerText = getDatasetVal("deductionText");
    document.querySelector("#balance_text").innerText = getDatasetVal("balanceText");
    document.querySelector("#basic").value = getDatasetVal("basic");

    selectElement.addEventListener("change", (e) => {
        account.value = getDatasetVal("account");
        balanceElement.value = calcBalance();
        document.querySelector("#basic_text").innerText = getDatasetVal("basicText");
        document.querySelector("#plus_text").innerText = getDatasetVal("plusText");
        document.querySelector("#deduction_text").innerText = getDatasetVal("deductionText");
        document.querySelector("#balance_text").innerText = getDatasetVal("balanceText");
        document.querySelector("#basic").value = getDatasetVal("basic");
    });
});

plusElement.addEventListener("change", () => {
    balanceElement.value = calcBalance();
});

deductionElement.addEventListener("change", () => {
    balanceElement.value = calcBalance();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todayDate = new Date();
    const todayDateString = `${todayDate.getFullYear()}-${todayDate.getMonth() < 9 ? "0" : ""}${
        todayDate.getMonth() + 1
    }-${todayDate.getDate() < 10 ? "0" : ""}${todayDate.getDate()}`;

    const basic = getDatasetVal("basic");

    const balance = balanceElement.value;

    const recordName = form.querySelector("#record-name").value;
    const subId = selectElement.value;
    const plus = plusElement.value || 0;
    const deduction = deductionElement.value || 0;
    const date = form.querySelector("#date").value || todayDateString;
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
    document.querySelector("#message").innerText = `Added ${recordName} Successfully`;
    document.querySelectorAll("input[type=text]").forEach((input) => {
        input.value = "";
    });
    document.querySelectorAll("input[type=number]").forEach((input) => {
        input.value = 0;
    });
});
