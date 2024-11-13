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

router.put('/transacao/:id', (req, res) => {
    const { id } = req.params;
    const { data, tipo, valor, produtoId, pedidoId } = req.body;

    db.run(
        `UPDATE Transacao SET data = ?, tipo = ?, valor = ?, produtoId = ?, pedidoId = ? WHERE id = ?`,
        [data, tipo, valor, produtoId, pedidoId, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Transação não encontrada' });
            }
            res.status(200).json({ message: 'Transação atualizada com sucesso' });
        }
    );
});

router.delete('/transacao/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        `DELETE FROM Transacao WHERE id = ?`,
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Transação não encontrada' });
            }
            res.status(200).json({ message: 'Transação deletada com sucesso' });
        }
    );
});

module.exports = router;
