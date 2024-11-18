import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../contexts/GlobalContext';
import './MercadoEstoque.css';
import { useNavigate } from "react-router-dom";

function MercadoEstoque() {
  const { produtosdb } = useContext(GlobalContext);
  const [busca, setBusca] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  // Função para lidar com mudanças no campo de busca
  const handleBuscaChange = (event) => {
    setBusca(event.target.value);
  };

  
  const handleItemClick = () => {
    // Quando o botão "Novo Produto" for clicado, redireciona para a página de cadastro de produto
    setActiveItem('novoProduto');
    navigate('/cadastroProdutos');  // Certifique-se de que a rota '/cadastroProdutos' está definida corretamente
  };

  // Filtra os produtos com base no termo de busca
  const produtosFiltrados = produtosdb.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Função para redirecionar para a página de cadastro com os dados do produto
  const handleProdutoClick = (produto) => {
    // Navega para a página de cadastro de produtos passando os dados do produto
    navigate('/cadastroProdutos', { state: { produto } });
  };

  return (
    <div className="mercado-estoque">
      <Sidebar />
      <div className="container-mercadoEstoque">
        <div className="tituloEstoque">
          <h2>Estoque</h2>
        </div>
        <div className="busca-novo-produto">
          <div className="input-icon">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Busque por produtos"
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
          <button 
            className={`botao-novo-produto ${activeItem === 'novoProduto' ? 'active' : ''}`}
            onClick={handleItemClick}
          >
            <i className="bi bi-plus-lg"></i> Novo Produto
          </button>
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
              <tr key={index} onClick={() => handleProdutoClick(produto)}>
                <td>
                  <div className="produto-info">
                    <div className="produto-imagem-placeholder">
                      <img src={produto.imagem} alt="" style={{ maxWidth: '100%' }} />
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
                  {produto.preco && typeof produto.preco === 'number' && produto.preco > 0
                    ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
                    : 'Preço indisponível'}
                </td>
                <td>
                  <span className="disponivel">
                    <span className={`circulo-disponivel ${produto.quantidade > 0 ? 'verde' : 'vermelho'}`}></span>
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
