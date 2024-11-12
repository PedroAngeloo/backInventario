const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Criação das tabelas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL,
        quantity INTEGER,
        image TEXT,
        supplierId INTEGER,
        FOREIGN KEY (supplierId) REFERENCES Fornecedor(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Fornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cnpj TEXT,
        contact TEXT,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf_cnpj TEXT,
        contact TEXT,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        clientId INTEGER,
        status TEXT,
        total REAL,
        FOREIGN KEY (clientId) REFERENCES Cliente(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ItemPedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId INTEGER,
        productId INTEGER,
        quantity INTEGER,
        unitPrice REAL,
        FOREIGN KEY (orderId) REFERENCES Pedido(id),
        FOREIGN KEY (productId) REFERENCES Produto(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Transacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        type TEXT,
        value REAL,
        productId INTEGER,
        orderId INTEGER,
        FOREIGN KEY (productId) REFERENCES Produto(id),
        FOREIGN KEY (orderId) REFERENCES Pedido(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);
});

module.exports = db;
