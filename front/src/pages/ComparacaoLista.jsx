import './ComparacaoLista.css'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext, useState, useEffect } from 'react'


function ComparacaoLista() {

  const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey } = useContext(GlobalContext)
  const [produtosdb, setProdutosdb] = useState([])
  const [mercadoAtual, setMercadoAtual] = useState({})
  const [cliente, setCliente] = useState({})
  const [enderecosCliente, setEnderecosCliente] = useState([])
  const idCliente = getLocalStorage('id_cliente')
  const idMercado = getLocalStorage('id_mercado')
  const mercadosProximos = getLocalStorage('mercadosDentro')

  const trocaIdMercado = (id) => {
    setLocalStorage('id_mercado', id)
  }

  const fetchData = async () => {
    if (!idCliente) return
    try {
      const [cliente, tabelaRelacao, mercadoAtual] = await Promise.all([
        getDataById('clientes', idCliente),
        getDataByForeignKey('endereco_cliente_relecao', 'fk_id_cliente', idCliente),
        getDataById('mercados', idMercado),
      ])
      const enderecosRelacionados = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )
      if (enderecosRelacionados.length === 0) {
        throw new Error('Nenhum endereço relacionado encontrado para o cliente atual.')
      }

      const produtos = getLocalStorage('listaDefout')

      setCliente(cliente)
      setEnderecosCliente(enderecosRelacionados)
      setMercadoAtual(mercadoAtual)
      setProdutosdb(produtos)

    } catch (error) {
      console.error("Erro:", error)
    }
  }

  useEffect(() => {
    const produtos = getLocalStorage('listaDefout')
    setProdutosdb(produtos)
    fetchData()
  }, [])

  const incrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id_produto === idProduto) {
        return { ...item, quantidade_lista: item.quantidade_lista + 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
    setLocalStorage('listaDefout', updatedprodutosdb)

  }
  // Função para decrementar a quantidade de um produto
  const desincrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id_produto === idProduto && item.quantidade_lista > 1) {
        return { ...item, quantidade_lista: item.quantidade_lista - 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
    setLocalStorage('listaDefout', updatedprodutosdb)
  }
  // Função para remover um produto do carrinho
  const deleteProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.filter((item) => item.id != idProduto)
    setProdutosdb(updatedprodutosdb)
    setLocalStorage('listaDefout', updatedprodutosdb)
  }
  // Função para calcular o total da compra
  const calcularTotal = () => {
    return produtosdb.reduce((total, item) => total + (item.preco * item.quantidade_lista), 0).toFixed(2)
  }

  return (
    <div className='container-comparacao-total'>
      <div className='navBar-comparaLista'>
        <button>Voltar</button>
        <img src="/public/logo.png" alt="" />
      </div>
      <div className='container-comparacao-lista'>

        <div className='container-comparaLista'>
          <h1>Compare sua Lista de Compras</h1>
          <div className="container-icons">
            <i class="bi bi-bicycle"></i>
            <i class="bi bi-car-front"></i>
            <i class="bi bi-person-walking"></i>
          </div>
          <div className='info-localizacao'>
            <img src="/public/mapa.png" alt="" />
            <div className='text-loc'>
              <h3>Endereço do mercado</h3>
              <h4>Complemento</h4>
            </div>
          </div>

          <div className='horario-atendimento'>
            <h3>{mercadosProximos.find((mercado) =>mercado.id_mercado == idMercado).tempo}</h3>
          </div>

          <div className='container-card-mer'>
            {mercadosProximos.map((mercado) => (
              <div
                className={`card-mer-2 ${idMercado === mercado.id_mercado ? 'ativo' : ''}`}
                key={mercado.id_mercado}
                onClick={() => trocaIdMercado(mercado.id_mercado)}>
                <div className='cabecario-mer'>
                  <div >
                    <img className='logo-mercado-compara-lista' src={mercado.logo} alt="Logo do mercado" />
                  </div>
                  <h3 className='nome-mercado'>{mercado.nome}</h3>
                </div>
                <h4 className='distancia-mer'>{mercado.distancia} Km</h4>
                <h4 className='preco-total'>{mercado.nome}</h4>
              </div>
            ))}
          </div>

          <div className='bot-enviar-lista'>
            <button>Enviar Lista</button>

          </div>
        </div>
        <div id="popup-list-comparacao" onClick={(e) => e.stopPropagation()}>
          <div className="market-list">
            <div className="logo-name">
              <img src={mercadoAtual.logo} alt="Logo do mercado" className="logo-mercado-list-comparacao" />
              <span className="market-name-comparacao">{mercadoAtual.nome}</span>
            </div>
            <hr />
          </div>
          <div className="shopping-list">

            <div className="list-itens">
              {produtosdb.length > 0 ? (
                produtosdb.map((item) => (
                  <div key={item.id_produto} className="list-item">
                    <h4 style={{ color: '#4D453F' }}>Encontramos esses itens</h4>
                    <div className="item-info">
                      <div className="img-detaisl">
                        <div className="item-image">
                          <img src={`/uploads_images/${item.imagem_file_path}`} alt={item.nome} />
                        </div>
                        <div className="details">
                          <span className="item-name">{item.nome}</span>
                          <span className="item-additional-info">
                            {item.quantidade} {item.unidademedida}
                          </span>
                        </div>

                      </div>
                      <div className="preco">
                        <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="quantity-controls-container">
                      <button className="remove-btn" onClick={() => deleteProduto(item.id_produto)}>
                        Remover
                      </button>
                      <div className="quantity-control">
                        <button className="decrease-btn" onClick={() => desincrementaProduto(item.id_produto)}>
                          −
                        </button>
                        <span className="quantity">{item.quantidade_lista}</span>
                        <button className="increase-btn" onClick={() => incrementaProduto(item.id_produto)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="empty-list">Carrinho vazio</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparacaoLista
