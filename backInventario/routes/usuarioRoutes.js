const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um usuário
router.post('/usuario', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    
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

router.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM Usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;