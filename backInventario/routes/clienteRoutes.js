const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um cliente
router.post('/cliente', (req, res) => {
    console.log(req.body);
    console.log(req.headers);

    const { nome, cpf_cnpj, contato, endereco } = req.body;
    db.run(
        `INSERT INTO Cliente (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)`,
        [nome, cpf_cnpj, contato, endereco],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Cliente inserido com sucesso', id: this.lastID });
        }
    );
});

router.get('/clientes', (req, res) => {
    db.all('SELECT * FROM Cliente', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
