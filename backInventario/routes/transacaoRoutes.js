const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir uma transação
router.post('/transacao', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    
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

router.get('/transacaos', (req, res) => {
    db.all('SELECT * FROM Transacao', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
