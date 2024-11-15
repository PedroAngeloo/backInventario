const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const itemPedidoRoutes = require('./routes/itemPedidoRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(produtoRoutes);
app.use(fornecedorRoutes);
app.use(clienteRoutes);
app.use(pedidoRoutes);
app.use(itemPedidoRoutes);
app.use(transacaoRoutes);
app.use(usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
