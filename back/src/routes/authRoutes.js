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

    // Verificar se a tabela existe
    if (!checkTableExists(table)) {
        return res.status(404).json({ loginSuccess: false, message: 'Tabela não encontrada' });  
    }

    try {
        if(identificadorNome === 'cnpj') {
            const result = await pool.query(`SELECT * FROM mercados WHERE ${identificadorNome} = $1`, [identificadorValor])

            if (result.rows.length === 0) {
                return res.status(404).json({ loginSuccess: false, message: `${identificadorNome} não cadastrado` });
            }

            const user = result.rows[0];

            const resultGerente = await pool.query(`SELECT * FROM gerentes WHERE id_gerente = $1`, [user.fk_id_gerente])

            const userGerente = resultGerente.rows[0];

            console.log(userGerente.senha, senhaValor);
            console.log('id do gerente');

            // Verificar se a senha está correta

            if (userGerente.senha === senhaValor) {
                return res.status(200).json({ loginSuccess: true, message: 'Login realizado com sucesso!', userGerente });
            }else {
                console.log('Login realizado com sucesso!');
                return res.status(401).json({ loginSuccess: false, message: 'Senha incorreta' });
            }

        }


        console.log(`Verificando tabela: ${table}, ${identificadorNome}: ${identificadorValor}, senha: ${senhaValor}`);
        const result = await pool.query(`SELECT * FROM ${table} WHERE ${identificadorNome} = $1`, [identificadorValor]);

        // Verificar se o identificador existe
        if (result.rows.length === 0) {
            return res.status(404).json({ loginSuccess: false, message: `${identificadorNome} não cadastrado` });
        }

        const user = result.rows[0];

        // Verificar se a senha está correta
        if (user.senha === senhaValor) {
            return res.json({ loginSuccess: true, message: 'Bem-vindo!', user });
        } else {
            return res.status(401).json({ loginSuccess: false, message: 'Senha incorreta' });
        }
    } catch (err) {
        console.error('Erro ao verificar login:', err.message);
        return res.status(500).json({ loginSuccess: false, message: 'Erro ao verificar login' });
    }
});


// Outras rotas relacionadas a autenticação...

module.exports = router;
