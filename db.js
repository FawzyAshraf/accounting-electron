const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

exports.createTables = () => {
    db.serialize(() => {
        db.run(
            "CREATE TABLE Account (\
				id INTEGER PRIMARY KEY AUTOINCREMENT,\
				name TEXT NOT NULL,\
				basic_text TEXT,\
				plus_text TEXT,\
				deduction_text TEXT,\
				balance_text TEXT\
			);"
        );

        db.run(
            "CREATE TABLE Record (id INTEGER PRIMARY KEY AUTOINCREMENT,\
				account_id INTEGER NOT NULL,\
				code TEXT NOT NULL,\
				name TEXT NOT NULL,\
				basic REAL,\
				plus REAL,\
        		deduction REAL,\
				balance REAL,\
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

exports.insertAccount = (args) => {
    const { name } = args;

    db.run(`INSERT INTO Account (name) VALUES('${name}')`);

    console.log("inserted new account successfully with name" + name);
};
