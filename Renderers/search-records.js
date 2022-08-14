const form = document.querySelector("form");
const results = document.querySelector("#results");

let tableData = [];

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
	const dateEnd = getTimestamp(form.querySelector("#end-date").value);

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
		"Record Code",
		"Account Name",
		"Basic",
		"Plus",
		"Deduction",
		"Balance",
		"Date",
		"Notes",
		"Details",
	];
	headRowValues.forEach((headVal, idx) => {
		const headCell = document.createElement("th");
		headCell.innerHTML = headVal;
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
