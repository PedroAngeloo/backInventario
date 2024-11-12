const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um fornecedor
router.post('/fornecedor', (req, res) => {
    console.log(req.body);
    console.log(req.headers); // Para ver o Content-Type

    const { nome, cnpj, contato, endereco } = req.body;
    db.run(
        `INSERT INTO Fornecedor (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)`,
        [nome, cnpj, contato, endereco],
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
    db.all('SELECT * FROM Fornecedor', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Rota para atualizar um fornecedor
router.put('/fornecedor/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, contato, endereco } = req.body;

    db.run(
        `UPDATE Fornecedor SET nome = ?, cnpj = ?, contato = ?, endereco = ? WHERE id = ?`,
        [nome, cnpj, contato, endereco, id],
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

    db.run(`DELETE FROM Fornecedor WHERE id = ?`, id, function (err) {
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
