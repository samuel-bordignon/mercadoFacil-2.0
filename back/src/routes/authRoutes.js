const express = require('express');
const pool = require('../config/db');

const router = express.Router();

const checkTableExists = async (table) => {
    const result = await pool.query(
        `SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = $1
        )`,
        [table]
    );
    return result.rows[0].exists;
};

router.get('/:table/email-exists/:email', async (req, res) => {
    const { table, email } = req.params;

    try {
        console.log(`Verificando tabela: ${table}, email: ${email}`);

        // Verificar se a tabela existe no banco
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' });
        }

        // Executar consulta
        const result = await pool.query(`SELECT 1 FROM ${table} WHERE email = $1`, [email]);
        console.log(`Resultado da consulta: ${JSON.stringify(result.rows)}`);

        res.json({ exists: result.rows.length > 0 });
    } catch (err) {
        console.error("Erro ao verificar e-mail:", err.message);
        console.error("Erro ao processar requisição:", err.stack);
        res.status(500).json({ error: 'Erro ao verificar e-mail' });
    }
});


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
