import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../contexts/GlobalContext';
import './MercadoEstoque.css';

function MercadoEstoque() {
  const { produtosdb, setProdutosdb } = useContext(GlobalContext);
  const [busca, setBusca] = useState("");

  // Função para lidar com mudanças no campo de busca
  const handleBuscaChange = (event) => {
    setBusca(event.target.value);
  }

  // Filtra os produtos com base no termo de busca
  const produtosFiltrados = produtosdb.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="mercado-estoque">
      <Sidebar />
      <div className="container-mercadoEstoque">
        <h2>Estoque</h2>
        <div className="busca-novo-produto">
          <input
            type="text"
            placeholder="Busque por produtos"
            value={busca}
            onChange={handleBuscaChange}
          />
          <button className="botao-novo-produto">+ Novo Produto</button>
        </div>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Produtos</th>
              <th>Preço</th>
              <th>Disponível</th>
              <th>Estoque</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto, index) => (
              <tr key={index}>
                <td>
                  <div className="produto-info">
                    <div className="produto-imagem-placeholder">
                      <img src={produto.imagem} alt="" style={{ maxWidth: '100%' }}/>
                    </div>
                    <div>
                      <p>{produto.nome}</p>
                      <p className="produto-detalhes">
                        {produto.informacaoAdicional
                          ? `${produto.informacaoAdicional.peso} ${produto.informacaoAdicional.unidade}`
                          : 'Sem detalhes'}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  {produto.preco && typeof produto.preco == 'number' && produto.preco > 0
                    ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
                    : 'Preço indisponível'}
                </td>
                <td>
                  <span className={`disponivel-${produto.quantidade > 0 ? 'sim' : 'nao'}`}>
                    {produto.quantidade > 0 ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td>{produto.quantidade} unidades</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MercadoEstoque;
