const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um usuário
router.post('/usuario', (req, res) => {
    const { nome, email, senha } = req.body;
    db.run(
        `INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, senha],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuário inserido com sucesso', id: this.lastID });
        }
    );
});

module.exports = router;
