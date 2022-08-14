const selectElement = document.querySelector("select"),
	basicText = document.querySelector("#basic"),
	plusText = document.querySelector("#plus"),
	deductionText = document.querySelector("#deduction"),
	balanceText = document.querySelector("#balance");

selectElement.addEventListener("change", async (e) => {
	const val = parseInt(selectElement.value);
	const accounts = await window.record.accounts();
	if (val === -1) {
		basicText.innerText = "Basic";
		plusText.innerText = "Plus";
		deductionText.innerText = "Deduction";
		balanceText.innerText = "Balance";
		document.querySelector("tbody").innerHTML = "";
	} else {
		const t = accounts.filter((account) => account.id === val)[0];
		basicText.innerText = t.basic_text;
		plusText.innerText = t.plus_text;
		deductionText.innerText = t.deduction_text;
		balanceText.innerText = t.balance_text;

		const tableData = await window.record.search({ accountId: val });
		tableData.forEach((record) => {
			record["date"] = formatDate(record["date"]);

			//Delete Extra Data
			delete record["account"];
		});
		const table = new Table(tableData);
		table.fillTable();
	}
});

function formatDate(date) {
	const d = new Date(date);
	return `${d.getFullYear()}-${d.getMonth() < 9 ? "0" : ""}${
		d.getMonth() + 1
	}-${d.getDate() < 10 ? "0" : ""}${d.getDate()}`;
}
