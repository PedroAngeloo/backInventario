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

router.put('/item-pedido/:id', (req, res) => {
    const { id } = req.params;
    const { pedidoId, produtoId, quantidade, precoUnitario } = req.body;

    db.run(
        `UPDATE ItemPedido SET pedidoId = ?, produtoId = ?, quantidade = ?, precoUnitario = ? WHERE id = ?`,
        [pedidoId, produtoId, quantidade, precoUnitario, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Item de pedido não encontrado' });
            }
            res.status(200).json({ message: 'Item de pedido atualizado com sucesso' });
        }
    );
});

router.delete('/item-pedido/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        `DELETE FROM ItemPedido WHERE id = ?`,
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Item de pedido não encontrado' });
            }
            res.status(200).json({ message: 'Item de pedido deletado com sucesso' });
        }
    );
});


module.exports = router;
