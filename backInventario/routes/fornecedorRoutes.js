const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um fornecedor
router.post('/fornecedor', (req, res) => {
console.log (req.body);
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

router.get('/fornecedores', (req, res) => {
    db.all('SELECT * FROM Fornecedor', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
