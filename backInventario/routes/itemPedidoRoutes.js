const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um item de pedido
router.post('/item-pedido', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    
    const { pedidoId, produtoId, quantidade, precoUnitario } = req.body;
    db.run(
        `INSERT INTO ItemPedido (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`,
        [pedidoId, produtoId, quantidade, precoUnitario],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Item de pedido inserido com sucesso', id: this.lastID });
        }
    );
});

router.get('/item-pedidos', (req, res) => {
    db.all('SELECT * FROM ItemPedido', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
