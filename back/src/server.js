const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MercadoFacil',
    password: 'senai',
    port: 5432,
})

app.use(cors())
app.use(express.json())

// Função para verificar se a tabela existe no banco de dados
const checkTableExists = async (table) => {
    const result = await pool.query(
        `SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = $1
        )`,
        [table]
    )
    return result.rows[0].exists
}

//função para verificar se o email existe
app.get('/:table/email-exists/:email', async (req, res) => {
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


// Função para verificar a validade da senha para um login
app.get('/:table/password-vality/:email/:columName/:columValue', async (req, res) => {
    const { table, email, columName, columValue } = req.params
    try {
        // Consulta o usuário pelo e-mail
        const result = await pool.query(`SELECT * FROM ${table} WHERE email = $1`, [email])

        if (result.rows.length === 0) {
            return res.status(404).json({ loginSuccess: false, message: 'Email não cadastrado' })
        }

        const user = result.rows[0]

        // Verifica se a senha fornecida corresponde à senha armazenada
        if (user[columName] === columValue) {
            return res.json({ loginSuccess: true, message: 'Bem vindo!', user })
        } else {
            return res.status(401).json({ loginSuccess: false, message: `${columName} incorreta` })
        }

    } catch (err) {
        console.error('Erro ao verificar e-mail e senha:', err.message)
        res.status(500).json({ error: 'Erro ao verificar login' })
    }
})

// Rota para buscar todos os registros de qualquer tabela
app.get('/:table', async (req, res) => {
    const { table } = req.params
    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }
        const result = await pool.query(`SELECT * FROM ${table}`)
        res.json(result.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Erro ao buscar dados' })
    }
})

// Rota para buscar um registro por ID de qualquer tabela
app.get('/:table/:id', async (req, res) => {
    const { table, id } = req.params

    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }

        // Consultar o nome da coluna de chave primária da tabela
        const primaryKeyQuery = `
            SELECT a.attname AS column_name
            FROM pg_index i
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE i.indrelid = $1::regclass AND i.indisprimary
        `
        const primaryKeyResult = await pool.query(primaryKeyQuery, [table])

        if (primaryKeyResult.rows.length === 0) {
            return res.status(404).json({ error: 'Chave primária não encontrada para a tabela' })
        }

        const primaryKeyColumn = primaryKeyResult.rows[0].column_name

        // Consultar o registro usando a chave primária identificada
        const result = await pool.query(`SELECT * FROM ${table} WHERE ${primaryKeyColumn} = $1`, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Erro ao buscar registro' })
    }
})

// Rota para buscar um regidtro pela foreign key de qualquer tabela
app.get('/:table/:fk_column/:fk_value', async (req, res) => {
    const { table, fk_column, fk_value } = req.params;

    try {
        // Verifique se a tabela e a coluna de chave estrangeira existem
        const tableExists = await checkTableExists(table);
        if (!tableExists) {
            return res.status(404).json({ error: 'Tabela não encontrada' });
        }

        if (!fk_column.startsWith('fk_')) {
            return res.status(400).json({ error: 'Coluna de chave estrangeira inválida' });
        }

        // Use consulta parametrizada para evitar SQL injection
        const result = await pool.query(`SELECT * FROM ${table} WHERE ${fk_column} = $1`, [fk_value]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// Rota para adicionar um registro a qualquer tabela
app.post('/:table', async (req, res) => {
    const { table } = req.params
    const data = req.body

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Nenhum dado foi enviado no corpo da requisição' })
    }

    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }
        const columns = Object.keys(data).join(', ')
        const values = Object.values(data)
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')

        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`
        const result = await pool.query(query, values)
        res.json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Erro ao inserir dados' })
    }
})

// Rota para atualizar um registro de qualquer tabela
app.put('/:table/:id', async (req, res) => {
    const { table, id } = req.params
    const data = req.body
    
    const columns = Object.keys(data)
    const values = Object.values(data)
    const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ')

    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }

        // Obter o nome da coluna de chave primária da tabela
        const primaryKeyQuery = `
            SELECT a.attname AS column_name
            FROM pg_index i
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE i.indrelid = $1::regclass AND i.indisprimary
        `
        const primaryKeyResult = await pool.query(primaryKeyQuery, [table])

        if (primaryKeyResult.rows.length === 0) {
            return res.status(404).json({ error: 'Chave primária não encontrada para a tabela' })
        }

        const primaryKeyColumn = primaryKeyResult.rows[0].column_name

        // Executar a atualização usando o nome da chave primária
        const result = await pool.query(
            `UPDATE ${table} SET ${setClause} WHERE ${primaryKeyColumn} = $${columns.length + 1} RETURNING *`,
            [...values, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro não encontrado' })
        }
        
        res.json(result.rows[0])
    } catch (err) {
        console.error("Erro ao atualizar registro:", err.message)
        res.status(500).json({ error: 'Erro ao atualizar registro' })
    }
})

// Rota para deletar um registro de qualquer tabela
app.delete('/:table/:id', async (req, res) => {
    const { table, id } = req.params
    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }

        // Obter o nome da coluna de chave primária da tabela
        const primaryKeyQuery = `
            SELECT a.attname AS column_name
            FROM pg_index i
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE i.indrelid = $1::regclass AND i.indisprimary
        `
        const primaryKeyResult = await pool.query(primaryKeyQuery, [table])

        if (primaryKeyResult.rows.length === 0) {
            return res.status(404).json({ error: 'Chave primária não encontrada para a tabela' })
        }

        const primaryKeyColumn = primaryKeyResult.rows[0].column_name

        // Executar o delete usando o nome da chave primária
        const result = await pool.query(
            `DELETE FROM ${table} WHERE ${primaryKeyColumn} = $1 RETURNING *`,
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro não encontrado' })
        }

        res.json({ message: 'Registro deletado com sucesso' })
    } catch (err) {
        console.error("Erro ao deletar registro:", err.message)
        res.status(500).json({ error: 'Erro ao deletar registro' })
    }
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
