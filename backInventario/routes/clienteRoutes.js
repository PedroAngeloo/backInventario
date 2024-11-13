const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Route to add a new client
router.post('/client', (req, res) => {
    const { name, cpf_cnpj, contact, address } = req.body;

    db.run(
        'INSERT INTO Client (name, cpf_cnpj, contact, address) VALUES (?, ?, ?, ?)', // Corrigido aqui
        [name, cpf_cnpj, contact, address],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Client added successfully', clientId: this.lastID });
        }
    );
    
});

router.get('/clientes', (req, res) => {
    db.all('SELECT * FROM Client', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Route to update a client
router.put('/client/:id', (req, res) => {
    const { id } = req.params;
    const { name, cpf_cnpj, contact, address } = req.body;

    db.run(
        `UPDATE Client SET name = ?, cpf_cnpj = ?, contact = ?, address = ? WHERE id = ?`,
        [name, cpf_cnpj, contact, address, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Client updated successfully' });
        }
    );
});

// Rota para deletar um cliente
router.delete('/cliente/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM Client WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    });
});

module.exports = router;
