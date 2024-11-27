import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../contexts/GlobalContext';
import './MercadoEstoque.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function MercadoEstoque() {
  const { getLocalStorage, setLocalStorage, getDataByForeignKey } = useContext(GlobalContext);
  const [busca, setBusca] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [mercado, setMercado] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [estoque, setEstoque] = useState({});
  const navigate = useNavigate();

  const idGerente = getLocalStorage('id_gerente');

  // Dados do Mercado
  useEffect(() => {
    if (!idGerente) return;
    const fetchData = async () => {
      try {
        const mercado = await getDataByForeignKey("mercados", "fk_id_gerente", idGerente);
        setMercado(...mercado);
      } catch (error) {
        toast.error("Erro ao carregar mercado.");
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [idGerente]);

  // Produtos do Mercado
  useEffect(() => {
    if (!mercado) return;
    const fetchData = async () => {
      try {
        const produtos = await getDataByForeignKey("produtos", "fk_id_mercado", mercado.id_mercado);
        setProdutos(produtos);
      } catch (error) {
        toast.error("Erro ao carregar produtos.");
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, [mercado]);

  // Carregar estoque
  useEffect(() => {
    if (produtos.length === 0) return;
    const carregarEstoque = async () => {
      const novoEstoque = {};
      for (const produto of produtos) {
        const data = await estoqueProdutos(produto.id_produto);
        novoEstoque[produto.id_produto] = data[0]; // Supondo que `data` seja um array e queremos o primeiro objeto
      }
      setEstoque(novoEstoque);
    };
    carregarEstoque();
  }, [produtos]);

  // Função para buscar estoque de um produto
  const estoqueProdutos = async (idProduto) => {
    try {
      const data = await getDataByForeignKey('estoqueprodutos', 'fk_id_produto', idProduto);
      return data;
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
      return [];
    }
  };

  // Função para lidar com mudanças no campo de busca
  const handleBuscaChange = (event) => {
    setBusca(event.target.value);
  };

  const handleItemClick = () => { /* implementar */ };

  const clikItem = (item) => {
    setLocalStorage('id_produto', item.id_produto)
    setLocalStorage('produtoData', item)
    navigate('/cadastroProdutos')
  }

  // Filtrar produtos
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
              <tr key={index} onClick={() => clikItem(produto)}>
                <td>
                  <div className="produto-info">
                    <div className="produto-imagem-placeholder">
                      <img src={produto.imagem} alt="" style={{ maxWidth: '100%' }} />
                    </div>
                    <div>
                      <p>{produto.nome}</p>
                      <p className="produto-detalhes">
                        {produto.quantidade && produto.unidademedida
                          ? `${produto.quantidade} ${produto.unidademedida}`
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
                    <span
                      className={`circulo-disponivel ${estoque[produto.id_produto]?.quantidade_estoque > 0 ? 'verde' : 'vermelho'
                        }`}
                    ></span>
                    {estoque[produto.id_produto]?.quantidade_estoque > 0 ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td>

                  {estoque[produto.id_produto]?.quantidade_estoque || 0} {estoque[produto.id_produto]?.quantidade_estoque === 1 ? 'unidade' : 'unidades'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MercadoEstoque;
