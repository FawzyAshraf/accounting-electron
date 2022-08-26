const form = document.querySelector("form");
const results = document.querySelector("#results");

let tableData = [];

window.record.getAccounts((event, allAccounts) => {
	const selectElement = document.querySelector("select");
	allAccounts.forEach((account) => {
		const option = document.createElement("option");
		option.value = account.id;
		option.innerHTML = account.name;
		selectElement.appendChild(option);
	});
});

form.querySelectorAll('input[name="selection"]').forEach((i) => {
	i.addEventListener("change", (e) => {
		switch (e.target.value) {
			case "id":
				form.querySelector("#record-name").value = "";
				form.querySelector("#code").value = "";
				form.querySelector("#record-name").disabled = true;
				form.querySelector("#code").disabled = true;
				form.querySelector("#record-id").disabled = false;
				break;
			case "code":
				form.querySelector("#record-name").disabled = true;
				form.querySelector("#code").disabled = false;
				form.querySelector("#record-name").value = "";
				form.querySelector("#record-id").value = "";
				form.querySelector("#record-id").disabled = true;
				break;
			case "name":
				form.querySelector("#record-name").disabled = false;
				form.querySelector("#code").disabled = true;
				form.querySelector("#record-id").disabled = true;
				form.querySelector("#code").value = "";
				form.querySelector("#record-id").value = "";
				break;
			default:
				break;
		}
	});
});

form.querySelectorAll('input[name="date-selection"]').forEach((i) => {
	i.addEventListener("change", (e) => {
		switch (e.target.value) {
			case "specific":
				form.querySelector("#start-date").value = "";
				form.querySelector("#finish-date").value = "";
				form.querySelector("#start-date").disabled = true;
				form.querySelector("#finish-date").disabled = true;
				form.querySelector("#specific-date").disabled = false;
				break;
			case "timerange":
				form.querySelector("#specific-date").value = "";
				form.querySelector("#specific-date").disabled = true;
				form.querySelector("#start-date").disabled = false;
				form.querySelector("#finish-date").disabled = false;
				break;
			default:
				break;
		}
	});
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	results.innerHTML = "";
	const recordName = form.querySelector("#record-name").value || undefined;
	const code = form.querySelector("#code").value || undefined;
	const id = form.querySelector("#record-id").value || -1;
	const accountId = parseInt(form.querySelector("#account").value);
	const dateSpecific = getTimestamp(
		form.querySelector("#specific-date").value,
	);
	const dateStart = getTimestamp(form.querySelector("#start-date").value);
	const dateEnd = getTimestamp(form.querySelector("#finish-date").value);

	const val = await window.record.search({
		recordName,
		code,
		id,
		accountId,
		dateSpecific,
		dateStart,
		dateEnd,
	});

	const resultsTitle = document.createElement("h3");
	results.appendChild(resultsTitle);
	tableData = val;
	tableData.forEach((record) => {
		record["date"] = formatDate(record["date"]);
	});

	if (val.length === 0) {
		resultsTitle.innerText = "No Results Found";
	} else {
		resultsTitle.innerText = "Results";
		const table = document.createElement("table");
		results.appendChild(table);
		table.appendChild(document.createElement("thead"));
		table.appendChild(document.createElement("tbody"));
		document.querySelector("thead").appendChild(getTableHeads());
		const tablleObj = new Table(tableData);
		tablleObj.fillTable();
	}
});

function getTimestamp(date) {
	if (date === "") return undefined;
	return new Date(date).getTime();
}

function getTableHeads() {
	const headRow = document.createElement("tr");
	const headRowValues = [
		"Record Id",
		"Record Name",
		"Subject",
		"Subject Code",
		"Account Name",
		"Basic",
		"Plus",
		"Deduction",
		"Balance",
		"Date",
		"Details",
	];
	headRowValues.forEach((headVal, idx) => {
		const headCell = document.createElement("th");
		headCell.innerHTML = headVal;
		headCell.className = "up down";
		headRow.appendChild(headCell);
	});
	return headRow;
}

function formatDate(date) {
	const d = new Date(date);
	return `${d.getFullYear()}-${d.getMonth() < 9 ? "0" : ""}${
		d.getMonth() + 1
	}-${d.getDate() < 10 ? "0" : ""}${d.getDate()}`;
}
