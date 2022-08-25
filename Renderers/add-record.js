const form = document.querySelector("#record-form");
const selectElementAccount = document.querySelector("#account-name");
const selectElementSubject = document.querySelector("#subject-code");
const plusElement = form.querySelector("#plus");
const deductionElement = form.querySelector("#deduction");
const balanceElement = form.querySelector("#balance");

const calcBalance = () => {
    return (
        (selectElementSubject.options.length === 0
            ? 0
            : parseFloat(
                  selectElementSubject.options[
                      selectElementSubject.selectedIndex
                  ].dataset.basic
              )) +
        parseFloat(plusElement.value) -
        parseFloat(deductionElement.value)
    );
};

const getDatasetValAccount = (key) => {
    return selectElementAccount.options[selectElementAccount.selectedIndex]
        .dataset[key];
};

const getDatasetValSubject = (key) => {
    return selectElementSubject.options[selectElementSubject.selectedIndex]
        .dataset[key];
};

const getAssociatedSubjects = async () => {
    selectElementSubject.innerHTML = "";
    const accountId = selectElementAccount.value;
    console.log(accountId);
    const subjects = await window.record.getSubjects({ accountId });
    console.log(subjects);
    subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.innerText = subject.code;
        option.dataset.basic = subject.basic;
        option.dataset.name = subject.name;
        console.log(option);
        selectElementSubject.appendChild(option);
    });
    if (subjects.length === 0) return;
    form.querySelector("#subject-name").innerText =
        getDatasetValSubject("name");
    document.querySelector("#basic").value = getDatasetValSubject("basic");
    selectElementSubject.addEventListener("change", (e) => {
        form.querySelector("#subject-name").innerText =
            getDatasetValSubject("name");
        document.querySelector("#basic").value = calcBalance();
    });
};

window.record.getAccounts((event, allAccounts) => {
    allAccounts.forEach((account) => {
        const option = document.createElement("option");
        option.value = account.id;
        option.innerText = account.name;
        option.dataset.basicText = account.basic_text;
        option.dataset.plusText = account.plus_text;
        option.dataset.deductionText = account.deduction_text;
        option.dataset.balanceText = account.balance_text;
        selectElementAccount.appendChild(option);
    });
    document.querySelector("#basic_text").innerText =
        getDatasetValAccount("basicText");
    document.querySelector("#plus_text").innerText =
        getDatasetValAccount("plusText");
    document.querySelector("#deduction_text").innerText =
        getDatasetValAccount("deductionText");
    document.querySelector("#balance_text").innerText =
        getDatasetValAccount("balanceText");
    // document.querySelector("#basic").value = getDatasetVal("basic");
    getAssociatedSubjects();

    selectElementAccount.addEventListener("change", async (e) => {
        await getAssociatedSubjects();
        balanceElement.value = calcBalance();
        document.querySelector("#basic_text").innerText =
            getDatasetValAccount("basicText");
        document.querySelector("#plus_text").innerText =
            getDatasetValAccount("plusText");
        document.querySelector("#deduction_text").innerText =
            getDatasetValAccount("deductionText");
        document.querySelector("#balance_text").innerText =
            getDatasetValAccount("balanceText");
        document.querySelector("#basic").value = getDatasetValAccount("basic");
    });
});

// selectElementAccount.addEventListener("load", getAssociatedSubjects);

plusElement.addEventListener("change", () => {
    balanceElement.value = calcBalance();
});

deductionElement.addEventListener("change", () => {
    balanceElement.value = calcBalance();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todayDate = new Date();
    const todayDateString = `${todayDate.getFullYear()}-${
        todayDate.getMonth() < 9 ? "0" : ""
    }${todayDate.getMonth() + 1}-${
        todayDate.getDate() < 10 ? "0" : ""
    }${todayDate.getDate()}`;

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
    window.record.refresh();
    document.querySelector(
        "#message"
    ).innerText = `Added ${recordName} Successfully`;
    document.querySelectorAll("input[type=text]").forEach((input) => {
        input.value = "";
    });
    document.querySelector("textarea").value = "";
    plusElement.value = 0;
    deductionElement.value = 0;
    balanceElement.value = calcBalance();
});
