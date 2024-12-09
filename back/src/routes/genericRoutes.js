const express = require('express');
const pool = require('../config/db');
const fuzz = require('fuzzball'); // Biblioteca para fuzzy matching

const router = express.Router();

// Função para verificar se a tabela existe
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

// Rota para buscar todos os registros de qualquer tabela
router.get('/:table', async (req, res) => {
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
router.get('/:table/:id', async (req, res) => {
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
router.get('/:table/:fk_column/:fk_value', async (req, res) => {
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

// Rota para comparar a lista de compras com os produtos do mercado
router.post('/comparar-lista', async (req, res) => {
    const { idMercado, listaCompras } = req.body;
  
    if (!idMercado || !listaCompras || !Array.isArray(listaCompras)) {
      return res.status(400).json({ error: 'Parâmetros inválidos!' });
    }
  
    try {
      // Busca os produtos do mercado com base na palavra-chave, categoria ou nome
      const produtosMercado = await pool.query(
        `SELECT p.id_produto, p.nome, p.preco, p.imagem_file_path, p.unidademedida, p.quantidade, 
                k.nome_palavra AS palavra_chave, k.categoria 
         FROM produtos p
         JOIN palavrachave_produto_relacao pk ON p.id_produto = pk.fk_id_produto
         JOIN palavrachave k ON pk.fk_id_palavrachave = k.id_palavrachave
         WHERE p.fk_id_mercado = $1`,
        [idMercado]
      );
  
      const produtosEncontrados = [];
      const produtosNaoEncontrados = [];
  
    //   console.log('--- Iniciando comparação da lista de compras ---');
  
      // Comparação da lista de compras com os produtos disponíveis
      listaCompras.forEach((item, index) => {
        // console.log(`Comparando item da lista [${index + 1}]:`, item);
  
        const produto = produtosMercado.rows.find((produto) => {
          // Comparações exatas e por categoria
          const nomeCorresponde = produto.nome.toLowerCase().includes(item.nome.toLowerCase());
          const palavraChaveCorresponde = produto.palavra_chave.toLowerCase().includes(item.palavraChave.toLowerCase());
          const categoriaCorresponde = produto.categoria && produto.categoria.toLowerCase().includes(item.nome.toLowerCase());
          const quantidadeCorresponde = produto.quantidade === item.quantidade && produto.unidademedida.toLowerCase() === item.unidademedida.toLowerCase();
  
          // Fuzzy matching
          const fuzzyScore = fuzz.partial_ratio(item.nome.toLowerCase(), produto.nome.toLowerCase());
  
          // Log de cada tentativa de correspondência
        //   console.log(`  Comparando com produto do mercado:`, produto);
        //   console.log(`    Nome corresponde: ${nomeCorresponde}`);
        //   console.log(`    Palavra-chave corresponde: ${palavraChaveCorresponde} ${produto.palavra_chave.toLowerCase()} ${item.nome.toLowerCase()}`);
        //   console.log(`    Categoria corresponde: ${categoriaCorresponde}`);
        //   console.log(`    Quantidade corresponde: ${quantidadeCorresponde}`);
        //   console.log(`    Fuzzy Score: ${fuzzyScore}`);
  
          return nomeCorresponde || palavraChaveCorresponde || categoriaCorresponde || quantidadeCorresponde && fuzzyScore > 80;
        });
        
  
        if (produto) {
        //   console.log(`✅ Produto encontrado para "${item.nome}":`, produto);
          produtosEncontrados.push({
            ...produto,
            quantidade_lista: item.quantidade_lista, 
            categoria: item.categoria,
            id_produto_original: item.id_produto,
            id_mercado: idMercado
          });
          
        } else {
        //   console.log(`❌ Nenhum produto encontrado para "${item.nome}".`);
          produtosNaoEncontrados.push({
            ...item,
          });
        }
      });
  
    //   console.log('--- Comparação concluída ---');
    //   console.log('Produtos encontrados:', produtosEncontrados);
    //   console.log('Produtos não encontrados:', produtosNaoEncontrados);
    console.log(produtosEncontrados);
  
      return res.json({
        listaCompras,
        produtosEncontrados,
        produtosNaoEncontrados,
        produtosMercado: produtosMercado.rows, // Incluindo todos os produtos do mercado na resposta
      });
    } catch (error) {
      console.error('Erro ao comparar lista:', error);
      res.status(500).json({ error: 'Erro interno do servidor!' });
    }
  });
  
// Rota para adicionar um registro a qualquer tabela
router.post('/:table', async (req, res) => {
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
router.put('/:table/:id', async (req, res) => {
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
router.delete('/:table/:id', async (req, res) => {
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

// Rota para deletar um registro de qualquer tabela
router.delete('/:table/:columName/:columValue', async (req, res) => {
    const { table, columName, columValue } = req.params
    try {
        if (!(await checkTableExists(table))) {
            return res.status(404).json({ error: 'Tabela não encontrada' })
        }

        // Executar o delete usando o nome da chave primária
        const result = await pool.query(
            `DELETE FROM ${table} WHERE ${columName} = $1 RETURNING *`,
            [columValue]
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

module.exports = router;
