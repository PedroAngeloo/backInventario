const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Rota para inserir um produto
router.post('/produto', (req, res) => {
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

module.exports = router;
