const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
    "./app.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
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
			);"
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

    let SQLString = "SELECT * FROM Record ",
        oneChosen = false;
    if (accountId !== -1) {
        SQLString += `WHERE account_id = ${accountId}`;
        oneChosen = true;
    }
    if (id !== -1) {
        if (oneChosen) SQLString += `AND id = ${id}`;
        else {
            SQLString += `WHERE id = ${id}`;
            oneChosen = true;
        }
    }
    if (code !== undefined) {
        if (oneChosen) SQLString += `AND code = ${code}`;
        else {
            SQLString += `WHERE code=${code}`;
            oneChosen = true;
        }
    }
    if (recordName !== undefined) {
        if (oneChosen) SQLString += `AND name = ${recordName}`;
        else {
            SQLString += `WHERE name = ${recordName}`;
        }
    }

    const records = getQueryData(SQLString);
    return records;
};

async function getQueryData(SQLQuery) {
    return new Promise((data) => {
        db.all(SQLQuery, (err, rows) => {
            if (err) {
                console.error(err);
                throw err;
            }
            try {
                data(rows);
            } catch (error) {
                data({});
                throw error;
            }
        });
    });
}
