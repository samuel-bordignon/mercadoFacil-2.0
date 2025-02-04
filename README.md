# Mercado Fácil

## Descrição
**Mercado Fácil** é um site projetado para ajudar usuários a comparar preços de produtos em mercados próximos, permitindo decisões de compra mais econômicas e práticas. O projeto busca simplificar o dia a dia tanto de clientes quanto de comerciantes, promovendo acessibilidade, economia e conveniência.

## Funcionalidades
- **Comparação de preços:** Compare preços de produtos entre mercados da sua região.
- **Cadastro de usuários:** Personalize sua experiência criando uma conta

- **Cadastro de mercados:** Permita que donos de mercados atualizem preços e gerenciem seus catálogos.
- **Busca inteligente:** Crie listas de produtos e encontre as melhores ofertas.
- **Histórico de compras:** Visualize listas de compras anteriores para facilitar futuras decisões.

## Requisitos para Execução
- **Navegador compatível:** Google Chrome, Mozilla Firefox ou Microsoft Edge.
- **Conexão à internet:** Necessária para acessar o site.

## Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript, React e Bootstrap.
- **Backend:** Node.js, Express e Axios.
- **Banco de Dados:** PostgreSQL.
- **Ferramenta para consulta:** Postman.

## Como Executar o Projeto

### Configuração Inicial
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/MercadoFacil.git
   cd MercadoFacil
   ```

### Configuração do Back-End
1. Acesse a pasta `back` e instale as dependências:
   ```bash
   cd back
   npm install
   ```
2. Configure o banco de dados:
   - Atualize o arquivo `db.js` localizado em `config/` com suas credenciais:
     ```javascript
     const { Pool } = require('pg');

     const pool = new Pool({
         user: 'postgres', // seu username
         host: 'localhost', // seu host
         database: 'MercadoFacil', // nome do banco de dados
         password: 'sua-senha', // sua senha
         port: 5432, // porta padrão do PostgreSQL
     });

     module.exports = pool;
     ```
3. Inicie o servidor:
   ```bash
   npx nodemon src/server.js
   ```

### Configuração do Front-End
1. Acesse a pasta `front` e instale as dependências:
   ```bash
   cd front
   npm install
   ```
2. Inicie o front-end:
   ```bash
   npm run dev
   ```
### Restaurando o Banco de Dados

1. Certifique-se de que o PostgreSQL está rodando em sua máquina na versão 17.

2. Navegue até a pasta onde o backup está localizado:
   ```bash
   cd backup
   ````
3. Restaure o banco de dados usando o comando:
````bash
psql -U postgres -d MercadoFacil -f backup.sql
````
- Substitua **postgres** pelo seu usuário do PostgreSQL.
- Se o banco de dados ainda não existir, crie-o antes de restaurar:
````bash
createdb -U postgres MercadoFacil
````
4. Após restaurar, o banco estará pronto para uso.


### Uso do Sistema
1. Acesse o link gerado pelo comando `npm run dev`.
2. Escolha o tipo de perfil:
   - **Cliente:** Para visualizar produtos e comparar preços.
   - **Parceiro:** Para cadastrar produtos e gerenciar o mercado.


## Contribuindo
Contribuições são bem-vindas! Siga os passos abaixo para colaborar:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adiciona minha feature"
   ```
4. Envie suas mudanças:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request no repositório original.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE). Fique à vontade para usar e modificar.
