const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./app.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

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
			);"
        );

        db.run(
            "CREATE TABLE IF NOT EXISTS Subject (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
				account_id INTEGER NOT NULL,\
                basic REAK DEFAULT 0,\
				code TEXT NOT NULL,\
				notes TEXT,\
				FOREIGN KEY (account_id)\
					REFERENCES Account(id)\
					ON DELETE CASCADE\
			);"
        );

        db.run(
            "CREATE TABLE IF NOT EXISTS Record (id INTEGER PRIMARY KEY AUTOINCREMENT,\
				sub_id INTEGER NOT NULL,\
				name TEXT NOT NULL,\
				plus REAL DEFAULT 0,\
        		deduction REAL DEFAULT 0,\
				balance REAL DEFAULT 0,\
                date INTEGER,\
				details TEXT,\
				FOREIGN KEY (sub_id)\
					REFERENCES Subject(id)\
					ON DELETE CASCADE\
			);"
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
            )`
    );

    console.log("inserted new account successfully with name " + name);
};

exports.insertSubject = (args) => {
    let { accountId, code, notes, basic } = args;

    db.run(
        `INSERT INTO Subject\
            (code, account_id, notes, basic)\
            VALUES(\
                '${code}', ${accountId}, '${notes}', ${basic}\
            )`
    );

    console.log("inserted new subject successfully with code " + code);
};

exports.insertRecord = (args) => {
    const { name, subId, plus, deduction, balance, date, details } = args;

    db.run(
        `INSERT INTO Record\
            (name, sub_id, plus, deduction, balance, date, details)\
            VALUES('${name}', ${subId}, ${plus}, ${deduction}, ${balance}, ${date}, '${details}'\
            )`
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

exports.getSubjects = async (args) => {
    const { code, accountId, id } = args;

    let SQLString =
        "SELECT Subject.id AS id, code, basic, name, notes\
			FROM Subject INNER JOIN Account\
			WHERE Account.id = Subject.account_id ";

    if (accountId !== -1 && accountId !== undefined) SQLString += `AND account_id = ${accountId} `;
    if (id !== -1 && id !== undefined) SQLString += `AND Subject.id = ${id} `;
    if (code !== undefined) SQLString += `AND code = '${code}' `;

    const subjects = await getQueryData(SQLString);
    return subjects;
};

exports.getAllSubjectsDetailed = async (args) => {
    const { code, accountId, id } = args;

    let SQLString =
        "SELECT Subject.id AS id, code, basic, name, notes, basic_text, plus_text, deduction_text, balance_text\
			FROM Subject INNER JOIN Account\
			WHERE Account.id = Subject.account_id ";

    if (accountId !== -1 && accountId !== undefined) SQLString += `AND account_id = ${accountId} `;
    if (id !== -1 && id !== undefined) SQLString += `AND Subject.id = ${id} `;
    if (code !== undefined) SQLString += `AND code = '${code}' `;

    const subjects = await getQueryData(SQLString);
    return subjects;
};

exports.getRecords = async (args) => {
    const { code, accountId, id, recordName, dateSpecific, dateStart, dateEnd } = args;

    let SQLString =
        "SELECT Record.id AS id, Record.name AS name, code, Account.name AS account, basic,\
			plus, deduction, balance, date, details\
			FROM Record INNER JOIN Subject INNER JOIN Account\
			WHERE Subject.id = Record.sub_id AND Subject.account_id = Account.id ";

    if (accountId !== -1 && accountId !== undefined) SQLString += `AND account_id = ${accountId} `;
    if (id !== -1 && id !== undefined) SQLString += `AND Record.id = ${id} `;
    if (code !== undefined) SQLString += `AND code = '${code}' `;
    if (recordName !== undefined) SQLString += `AND Record.name = '${recordName}' `;
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
