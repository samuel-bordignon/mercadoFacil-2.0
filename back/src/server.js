const express = require('express');
const cors = require('cors');
const genericRoutes = require('./routes/genericRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const imageRoutes = require('./routes/imageRoutes.js');  // Corrigido

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Permitir payloads de até 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Para dados no formato URL-encoded

// Rotas
app.use('/', genericRoutes);
app.use('/auth', authRoutes);
app.use('/api/images', imageRoutes)  // Atualizado para evitar conflitos de rota

// Servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
