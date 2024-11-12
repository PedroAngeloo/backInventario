const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um pedido
router.post('/pedido', (req, res) => {
    console.log(req.body);
    console.log(req.headers);

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

router.get('/pedidos', (req, res) => {
    db.all('SELECT * FROM Pedidos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
