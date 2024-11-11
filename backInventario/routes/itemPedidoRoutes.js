const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um item de pedido
router.post('/item-pedido', (req, res) => {
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

module.exports = router;
