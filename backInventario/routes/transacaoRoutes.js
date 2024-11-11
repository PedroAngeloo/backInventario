const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir uma transação
router.post('/transacao', (req, res) => {
    const { data, tipo, valor, produtoId, pedidoId } = req.body;
    db.run(
        `INSERT INTO Transacao (data, tipo, valor, produtoId, pedidoId) VALUES (?, ?, ?, ?, ?)`,
        [data, tipo, valor, produtoId, pedidoId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Transação inserida com sucesso', id: this.lastID });
        }
    );
});

module.exports = router;
