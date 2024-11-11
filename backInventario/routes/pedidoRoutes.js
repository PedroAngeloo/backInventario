const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um pedido
router.post('/pedido', (req, res) => {
    const { data, clienteId, status, total } = req.body;
    db.run(
        `INSERT INTO Pedido (data, clienteId, status, total) VALUES (?, ?, ?, ?)`,
        [data, clienteId, status, total],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Pedido inserido com sucesso', id: this.lastID });
        }
    );
});

module.exports = router;
