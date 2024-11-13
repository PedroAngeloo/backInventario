const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Creating the tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        price REAL,
        stock INTEGER,
        image TEXT,
        supplierId INTEGER,
        FOREIGN KEY (supplierId) REFERENCES Supplier(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Supplier (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cnpj TEXT,
        contact TEXT,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf_cnpj TEXT,
        contact TEXT,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        clientId INTEGER,
        status TEXT,
        total REAL,
        FOREIGN KEY (clientId) REFERENCES Client(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS OrderItem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId INTEGER,
        productId INTEGER,
        quantity INTEGER,
        unitPrice REAL,
        FOREIGN KEY (orderId) REFERENCES Orders(id),
        FOREIGN KEY (productId) REFERENCES Product(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS TransactionRecord (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        type TEXT,
        value REAL,
        productId INTEGER,
        orderId INTEGER,
        FOREIGN KEY (productId) REFERENCES Product(id),
        FOREIGN KEY (orderId) REFERENCES Orders(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);
});

module.exports = db;
