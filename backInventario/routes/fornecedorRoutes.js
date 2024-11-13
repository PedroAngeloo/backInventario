const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um fornecedor
router.post('/fornecedor', (req, res) => {
    console.log(req.body);
    console.log(req.headers); // Para ver o Content-Type

    const { name, cnpj, contact, address } = req.body;
    db.run(
        `INSERT INTO Supplier (name, cnpj, contact, address) VALUES (?, ?, ?, ?)`,
        [name, cnpj, contact, address],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Fornecedor inserido com sucesso', id: this.lastID });
        }
    );
});

// Rota para obter todos os fornecedores
router.get('/fornecedores', (req, res) => {
    db.all('SELECT * FROM Supplier', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Rota para atualizar um fornecedor
router.put('/fornecedor/:id', (req, res) => {
    const { id } = req.params;
    const { name, cnpj, contact, address } = req.body;

    db.run(
        `UPDATE Supplier SET name = ?, cnpj = ?, contact = ?, address = ? WHERE id = ?`,
        [name, cnpj, contact, address, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
        }
    );
});

// Rota para deletar um fornecedor
router.delete('/fornecedor/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM Supplier WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
    });
});

module.exports = router;