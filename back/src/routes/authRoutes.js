const express = require('express');
const pool = require('../config/db');

const router = express.Router();

//função para verificar se o email existe
router.get('/:table/email-exists/:email', async (req, res) => {
    const { table, email } = req.params
    try {
        // Sanitize o nome da tabela, se necessário, para evitar SQL Injection
        const result = await pool.query(`SELECT 1 FROM ${table} WHERE email = $1 LIMIT 1`, [email])

        if (result.rows.length > 0) {
            return res.json({ exists: true })
        }

        res.json({ exists: false })
    } catch (err) {
        console.error('Erro ao verificar e-mail:', err.message)
        res.status(500).json({ error: 'Erro ao verificar e-mail' })
    }
})

// Rota para verificar login (e-mail e senha)
router.get('/:table/password-vality/:identificadorNome/:identificadorValor/:senhaValor', async (req, res) => {
    const { table, identificadorNome, identificadorValor, senhaValor } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM ${table} WHERE ${identificadorNome} = $1`, [identificadorValor]);

        if (result.rows.length === 0) {
            return res.status(404).json({ loginSuccess: false, message: `${identificadorNome} não cadastrado` });
        }

        const user = result.rows[0];

        if (user.senha === senhaValor) {
            return res.json({ loginSuccess: true, message: 'Bem vindo!', user });
        } else {
            return res.status(401).json({ loginSuccess: false, message: 'Senha incorreta' });
        }
    } catch (err) {
        console.error('Erro ao verificar e-mail e senha:', err.message);
        res.status(500).json({ error: 'Erro ao verificar login' });
    }
});

// Outras rotas relacionadas a autenticação...

module.exports = router;
