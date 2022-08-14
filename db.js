const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
	"./app.db",
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
);

exports.createTables = () => {
	db.serialize(() => {
		db.run(
			"CREATE TABLE IF NOT EXISTS Account (\
				id INTEGER PRIMARY KEY AUTOINCREMENT,\
				name TEXT NOT NULL,\
				basic_text TEXT DEFAULT 'Basic',\
				plus_text TEXT DEFAULT 'Plus',\
				deduction_text TEXT DEFAULT 'Deduction',\
				balance_text TEXT DEFAULT 'Balance'\
			);",
		);

		db.run(
			"CREATE TABLE IF NOT EXISTS Record (id INTEGER PRIMARY KEY AUTOINCREMENT,\
				account_id INTEGER NOT NULL,\
				code TEXT NOT NULL,\
				name TEXT NOT NULL,\
				basic REAL DEFAULT 0,\
				plus REAL DEFAULT 0,\
        		deduction REAL DEFAULT 0,\
				balance REAL DEFAULT 0,\
                date INTEGER,\
				details TEXT,\
				notes TEXT,\
				FOREIGN KEY (account_id)\
					REFERENCES Account(id)\
					ON DELETE CASCADE\
			);",
		);

		console.log("Created the Tables");
	});
};

exports.closeDBConnection = () => {
	db.close();
};

exports.insertAccount = (args) => {
	let { name, basic, plus, deduction, balance } = args;

	db.run(
		`INSERT INTO Account\
            (name, basic_text, plus_text, deduction_text, balance_text)\
            VALUES(\
                '${name}', '${basic}', '${plus}', '${deduction}', '${balance}'\
            )`,
	);

	console.log("inserted new account successfully with name " + name);
};

exports.insertRecord = (args) => {
	const {
		name,
		code,
		accountId,
		basic,
		plus,
		deduction,
		balance,
		date,
		details,
		notes,
	} = args;

	db.run(
		`INSERT INTO Record\
            (name, code, account_id, basic, plus, deduction, balance, date, details, notes)\
            VALUES('${name}', '${code}', ${accountId}, ${basic}, ${plus}, ${deduction}, ${balance}, ${date}, '${details}', '${notes}'\
            )`,
	);

	console.log("inserted new Record successfully with name " + name);
};

exports.getAllAccounts = async () => {
	const allAccounts = await getQueryData("SELECT id, name FROM Account");
	return allAccounts;
};

exports.getAllAccountsDetailed = async () => {
	const allAccounts = await getQueryData("SELECT * FROM Account");
	return allAccounts;
};

exports.getRecords = async (args) => {
	const {
		code,
		accountId,
		id,
		recordName,
		dateSpecific,
		dateStart,
		dateEnd,
	} = args;

	let SQLString =
		"SELECT Record.id AS id, Record.name AS name, code, Account.name AS account, basic,\
			plus, deduction, balance, date, details, notes\
			FROM Record INNER JOIN Account\
			WHERE Account.id = Record.account_id ";

	if (accountId !== -1 && accountId !== undefined)
		SQLString += `AND account_id = ${accountId} `;
	if (id !== -1 && id !== undefined) SQLString += `AND Record.id = ${id} `;
	if (code !== undefined) SQLString += `AND code = '${code}' `;
	if (recordName !== undefined)
		SQLString += `AND Record.name = '${recordName}' `;
	if (dateSpecific !== undefined) SQLString += `AND date = ${dateSpecific} `;
	if (dateStart !== undefined) SQLString += `AND date >= ${dateStart} `;
	if (dateEnd !== undefined) SQLString += `AND date <= ${dateEnd} `;

	const records = getQueryData(SQLString);
	return records;
};

async function getQueryData(SQLQuery) {
	return new Promise((resolve, reject) => {
		db.all(SQLQuery, (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
}
