class Table {
	constructor(tableData) {
		this.tableData = tableData;
		const columns = document.querySelectorAll("th").length;
		this.tableData = tableData;
		this.sortState = Array(columns);
		this.sortState.fill(-1);
		document.querySelectorAll("th").forEach((th, idx) => {
			th.addEventListener("click", () => {
				this.sortOnClick(idx);
			});
		});
	}

	fillTable() {
		const tbody = document.querySelector("tbody");
		tbody.innerHTML = "";
		this.tableData.forEach((record) => {
			const row = document.createElement("tr");
			Object.values(record).forEach((value) => {
				const cell = document.createElement("td");
				cell.innerText = value;
				row.appendChild(cell);
			});
			tbody.appendChild(row);
		});
	}

	sortOnClick(idx) {
		const key = Object.keys(this.tableData[0])[idx];
		this.sortState.forEach((val, i) => {
			if (i !== idx) this.sortState[i] = -1;
		});
		this.sortState[idx] =
			this.sortState[idx] < 0 || this.sortState[idx] > 1
				? 0
				: 1 - this.sortState[idx];
		const cmp = (o1, o2) => {
			if (typeof o1[key] === "string")
				return this.sortState[idx] === 0
					? o1[key].localeCompare(o2[key])
					: o2[key].localeCompare(o1[key]);
			else
				return this.sortState[idx] === 0
					? o1[key] - o2[key]
					: o2[key] - o1[key];
		};
		this.tableData.sort(cmp);
		this.fillTable();
	}
}
