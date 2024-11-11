const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco-de-dados.db');

// Criação das tabelas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL,
        quantidade INTEGER,
        imagem TEXT,
        fornecedorId INTEGER,
        FOREIGN KEY (fornecedorId) REFERENCES Fornecedor(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Fornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT,
        contato TEXT,
        endereco TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf_cnpj TEXT,
        contato TEXT,
        endereco TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        clienteId INTEGER,
        status TEXT,
        total REAL,
        FOREIGN KEY (clienteId) REFERENCES Cliente(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ItemPedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedidoId INTEGER,
        produtoId INTEGER,
        quantidade INTEGER,
        precoUnitario REAL,
        FOREIGN KEY (pedidoId) REFERENCES Pedido(id),
        FOREIGN KEY (produtoId) REFERENCES Produto(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Transacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        tipo TEXT,
        valor REAL,
        produtoId INTEGER,
        pedidoId INTEGER,
        FOREIGN KEY (produtoId) REFERENCES Produto(id),
        FOREIGN KEY (pedidoId) REFERENCES Pedido(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )`);
});

module.exports = db;
