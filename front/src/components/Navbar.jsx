import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useHotkeys } from 'react-hotkeys-hook'
import SearchBar from "./SearchBar"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Navbar.css'
import './PopUpListaCompras.css'
import './PopUpEnderecos.css'


function Navbar({produtosdb}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [enderecosCliente, setEnderecosCliente] = useState([])
  const [cliente, setCliente] = useState()
  const [mercadoAtual, setMercadoAtual] = useState()
  const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey, updateData, getData } = useContext(GlobalContext)
  const idCliente = getLocalStorage('id_cliente')
  const idMercado = getLocalStorage('id_mercado')
  const [activePopup, setActivePopup] = useState(null)
  const [prontaEnviar, setProntaEnviar] = useState(false)
  const [mercadosEmGeral, setMercadosEmGeral] = useState([])

  const [listaComprasNavdb, setListaComprasNavdb] = useState([])

  const fetchData = async () => {
    if (!idCliente) return
    try {
      const [cliente, tabelaRelacao, mercadoAtual, mercados] = await Promise.all([
        getDataById('clientes', idCliente),
        getDataByForeignKey('endereco_cliente_relecao', 'fk_id_cliente', idCliente),
        getDataById('mercados', idMercado),
        getData('mercados')

      ])
      const enderecosRelacionados = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )
      if (enderecosRelacionados.length === 0) {
        throw new Error('Nenhum endereço relacionado encontrado para o cliente atual.')
      }

      setCliente(cliente)
      setEnderecosCliente(enderecosRelacionados)
      setMercadoAtual(mercadoAtual)
      setMercadosEmGeral(mercados)

    } catch (error) {
      console.error("Erro:", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  // Define o ID do endereço atual e salva no localStorage
  const setEnderecoAtual = async (id) => {
    try {
      // Atualiza o campo `isatual` no banco de dados
      await updateData("enderecoclientes", id, { isatual: true })

      // Opcional: Revertendo o campo `isatual` de outros endereços para `false`
      const otherAddresses = enderecosCliente.filter((endereco) => endereco.id_enderecocliente !== id)
      await Promise.all(
        otherAddresses.map((endereco) => updateData("enderecoclientes", endereco.id_enderecocliente, { isatual: false }))
      )

      // Atualiza o estado local
      toast.success("Endereço atual definido com sucesso!")
      fetchData() // Recarrega a lista de endereços para refletir as mudanças
    } catch (error) {
      toast.error("Erro ao definir o endereço atual.")
      console.error(error)
    }
  }
  const togglePopup = (popupName) => {
    setActivePopup((prev) => (prev === popupName ? null : popupName))
  }
  useHotkeys('ctrl+l', (event) => {
    event.preventDefault() // Previne o comportamento padrão do navegador
    togglePopup('list') // Abre o pop-up da lista de compras
  })
  // Função para incrementar a quantidade de um produto
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
  // Função para atualizar a lista de compras e abilitar o envio
  const atualizarListaCompras = () => {
    setListaComprasNavdb({ ...listaComprasNavdb, produtos: produtosdb })
    setProntaEnviar(true)
  }
  // Função para concatenar os nomes e quantidades dos produtos da lista de compras
  function concatenaProdutos() {
    return (listaComprasNavdb.produtos.map((item) => `${item.nome} - ${item.quantidade_lista} un`).join('\n'))
  }
  // Função para enviar a mensagem para o WhatsApp
  useEffect(() => {
    if (prontaEnviar) {
      const enderecoAtual = enderecosCliente.find((endereco) => endereco.isatual)
      const mensagem = `
  Olá! Gostaria de fazer um pedido com os seguintes itens:
  ${concatenaProdutos()}
  *Endereço de entrega:* ${enderecoAtual?.logradouro}, ${enderecoAtual?.numero}
  *Total*: R$ ${calcularTotal()}
  Atenciosamente, ${cliente?.nome}
`

      const numero = mercadoAtual.telefone
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
      setProntaEnviar(false)
    }

  }, [produtosdb, listaComprasNavdb, prontaEnviar, enderecosCliente])

  return (
    <div className="navbar">
      {/* Container Esquerdo */}
      <div id="container-esquerdo-nav">
        <div id="logo-container">
          <img src="logoNome.svg" alt="Logo" className="logo" />
        </div>
        <div id="links-container">
          <NavLink
            to="/mercados"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Mercados
          </NavLink>
          <NavLink
            to="/listaCompras"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Lista de Compras
          </NavLink>
        </div>
      </div>
      {/* Container Central - SearchBar */}
      <div id="container-centro-nav">
        {location.pathname !== '/listaCompras' &&
          location.pathname !== '/perfilCliente' && <SearchBar data={location.pathname === '/mercados' ? mercadosEmGeral.map((mercado) => mercado.nome) : produtosdb.map((produto) => produto.nome)} />}
      </div>
      {/* Container Direito */}
      <div id="container-direito-nav">
        {/* Botão Endereço - Pop-up */}
        <button id="endereco-button" onClick={() => togglePopup("endereco")}>
          <div className="endereco-container">
            <span className="endereco-text">
              {enderecosCliente.find((endereco) => endereco.isatual)?.logradouro || "Selecione um endereço"}
            </span>


            <img src="flecha.svg" alt="Flecha" className="arrow-icon" />
          </div>
        </button>
        {/*popup do endereço*/}
        {activePopup === "endereco" && (
          <div onClick={() => setActivePopup(null)} className="overlay">
            <div id="popup-endereco" onClick={(e) => e.stopPropagation()}>
              <div className="btn-popup-container">
                <button className="btn-popup" onClick={() => setActivePopup(null)}>
                  <img src="XisVerde.svg" alt="Fechar" />
                </button>
              </div>
              <button className="add-endereco" onClick={() => navigate("/addEndereco")}>
                <div>
                  <img src="adicionarIcon.svg" alt="Adicionar" />
                </div>
                <span className="add-text">Adicionar Endereço</span>
              </button>
              {enderecosCliente.map((endereco) => (
                <button
                  key={endereco.id_enderecocliente}
                  className={endereco.isatual ? "adderess-atual" : "adderess"}
                  onClick={() => setEnderecoAtual(endereco.id_enderecocliente)}
                >
                  <span className="cep-text-pop">{endereco.apelido}</span>
                  <span className="adderess-text-pop">
                    {endereco.logradouro} {endereco.numero ? `, ${endereco.numero}` : ''}
                  </span>
                </button>
              ))}

            </div>
          </div>
        )}
        <div id="user-list-container">
          {/* Botão Usuário - Pop-up */}
          <button className="user-button" onClick={() => navigate('/perfilCliente')}>
            <img src="User.svg" alt="Usuário" className="user-icon" />
          </button>
          {/* Botão Lista de compras - Pop-up */}
          <button className="list-button" onClick={() => togglePopup('list')}>
            <img src="Order.svg" alt="Carrinho de Compras" className="list-icon" />
            <div className="span-container">
              <span className="list-total">R$ {calcularTotal()}</span>
              <span className="list-items">
                <span className="item-count">{produtosdb.length}</span> itens
              </span>
            </div>
          </button>
          {activePopup === 'list' && (
            <div onClick={() => { setActivePopup(null) }} className="overlay-list">
              <div id="popup-list" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-popup-x"
                  onClick={() => { setActivePopup(null) }}
                >
                  <img src="XisVerde.svg" alt="X" />
                </button>
                <div className="shopping-list">
                  <div className="market-list">
                    <div className="logo-name">
                      <img src={mercadoAtual.logo} alt="Logo do mercado" className="logo-mercado-list" />
                      <span className="market-name">{mercadoAtual.nome}</span>
                    </div>
                    <NavLink to="/telaDentroMercado" className="visitar-mercado">Ver Catálogo</NavLink>
                  </div>

                  <div className="list-itens">
                    {produtosdb.length > 0 ? (
                      produtosdb.map((item) => (
                        <div key={item.id_produto} className="list-item">
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
                  <div className="total-container">
                    <div className="total-details">
                      <span className="total-text">Total</span>
                      <span className="total-preco">R$ {calcularTotal()}</span>
                    </div>
                    <div className="total-btns">
                      <button className="comparar-btn" onClick={() => navigate('/comparacaoLista')}>
                        Comparar Preços
                      </button>
                      <button className="enviar-btn" onClick={() => atualizarListaCompras()}>
                        Enviar Lista
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-left"  // Posição dos toasts
        autoClose={5000}      // Tempo de fechamento automático (ms)
        hideProgressBar={false} // Exibir a barra de progresso
        newestOnTop={true}    // Toast mais novo no topo
        closeOnClick          // Fechar o toast ao clicar
        rtl={false}           // Direção do texto (esquerda-direita)
        pauseOnFocusLoss      // Pausar auto-close ao perder foco
        draggable             // Tornar o toast "arrastável"
        pauseOnHover          // Pausar auto-close ao passar o mouse
        theme="colored"       // Tema padrão colorido
      />
    </div>
  )
}

export default Navbar