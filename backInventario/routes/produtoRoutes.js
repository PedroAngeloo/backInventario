const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um produto
router.post('/produto', (req, res) => {
    console.log(req.body);
    console.log(req.headers);

    const { nome, descricao, preco, quantidade, imagem, fornecedorId } = req.body;
    db.run(
        `INSERT INTO Produto (nome, descricao, preco, quantidade, imagem, fornecedorId) VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, descricao, preco, quantidade, imagem, fornecedorId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Produto inserido com sucesso', id: this.lastID });
        }
    );
});

router.get('/produtos', (req, res) => {
    db.all('SELECT * FROM Produtos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
