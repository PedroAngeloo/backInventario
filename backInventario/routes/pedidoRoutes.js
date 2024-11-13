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

router.put('/pedido/:id', (req, res) => {
    const { id } = req.params;
    const { data, clienteId, status, total } = req.body;

    db.run(
        `UPDATE Pedido SET data = ?, clienteId = ?, status = ?, total = ? WHERE id = ?`,
        [data, clienteId, status, total, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            res.status(200).json({ message: 'Pedido atualizado com sucesso' });
        }
    );
});

router.delete('/pedido/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        `DELETE FROM Pedido WHERE id = ?`,
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            res.status(200).json({ message: 'Pedido deletado com sucesso' });
        }
    );
});


module.exports = router;
