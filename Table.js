class Table {
	constructor(tableData, root = document, deletefn = undefined) {
		this.root = root;
		this.tableData = tableData;
		this.deletefn = deletefn;
		let columns = root.querySelectorAll("th").length;
		if (deletefn) --columns;
		this.tableData = tableData;
		this.sortState = Array(columns);
		this.sortState.fill(-1);
		this.root.querySelectorAll("th").forEach((th, idx) => {
			if (idx === columns && deletefn) return;
			th.addEventListener("click", () => {
				this.sortOnClick(idx);
			});
		});
	}

	fillTable() {
		const tbody = this.root.querySelector("tbody");
		tbody.innerHTML = "";
		if (!this.tableData) return;
		this.tableData.forEach((record) => {
			const row = document.createElement("tr");
			Object.values(record).forEach((value) => {
				const cell = document.createElement("td");
				cell.innerText = value;
				row.appendChild(cell);
			});

			if (this.deletefn !== undefined) {
				const cell = document.createElement("td");
				const cellButton = document.createElement("i");
				cellButton.addEventListener("click", (e) => {
					this.deletefn(record["id"]);
				});
				cellButton.className = "fa-solid fa-trash-can";
				cell.appendChild(cellButton);
				row.appendChild(cell);
			}

			tbody.appendChild(row);
		});
	}

	sortOnClick(idx) {
		console.log(`this is idx = ${idx}`);
		const key = Object.keys(this.tableData[0])[idx];
		this.sortState.forEach((val, i) => {
			if (i !== idx) this.sortState[i] = -1;
		});
		this.sortState[idx] =
			this.sortState[idx] < 0 || this.sortState[idx] > 1
				? 0
				: 1 - this.sortState[idx];
		console.log(`its value is ${this.sortState[idx]}`);
		console.log(`All the values ${this.sortState}`);
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
		this.root.querySelectorAll("th").forEach((head, id) => {
			if (id === this.sortState.length) return;
			if (this.sortState[id] === 0) head.className = "up";
			else if (this.sortState[id] === 1) head.className = "down";
			else head.className = "up down";
		});
	}
}
