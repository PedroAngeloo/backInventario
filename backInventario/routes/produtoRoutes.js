const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um produto
router.post('/produto', (req, res) => {
    console.log(req.body);
    console.log(req.headers);

    const { name, category, price, stock, image, supplierId } = req.body;
    db.run(
        'INSERT INTO Product (name, category, price, stock, image, supplierId) VALUES (?, ?, ?, ?, ?, ?)',
        [name, category, price, stock, image, supplierId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Produto inserido com sucesso', id: this.lastID });
        }
    );
});

router.get('/produtos', (req, res) => {
    db.all('SELECT * FROM Product', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

router.put('/produto/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock, image, supplierId } = req.body;

    db.run(
        'UPDATE Product SET name = ?, category = ?, price = ?, stock = ?, image = ?, supplierId = ? WHERE id = ?',
        [name, category, price, stock, image, supplierId, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        }
    );
});

router.delete('/produto/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM Product WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
    );
});

module.exports = router;
