import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useHotkeys } from 'react-hotkeys-hook'
import { ToastContainer, toast } from 'react-toastify'
import SearchBar from "./SearchBar"
import 'react-toastify/dist/ReactToastify.css'
import './Navbar.css'
import './PopUpListaCompras.css'
import './PopUpEnderecos.css'
import AddEndereco from "../pages/AddEndereco"
import { p } from "framer-motion/client"


function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { produtosdb, setProdutosdb, enderecosdb, setEnderecosdb, mercadosdb, setMercadosdb, clientedb, setUsuariodb } = useContext(GlobalContext)

  // Estado único para controlar qual pop-up está aberto
  const [activePopup, setActivePopup] = useState(null)
  const [enderecoAtivo, setEnderecoAtivo] = useState(null)
  const [prontaEnviar, setProntaEnviar] = useState(false)

  const [listaComprasNavdb, setListaComprasNavdb] = useState(
    { id: 1, nome: "Lista 1", produtos: produtosdb },
  )

  useHotkeys('ctrl+l', (event) => {
    event.preventDefault() // Previne o comportamento padrão do navegador
    togglePopup('list') // Abre o pop-up da lista de compras
  })
  // Função para exibir mensagens de erro/validação
  const showErrorToast = () => {
    toast.error("Erro ao carregar dados do usuário!")
  }
  // Função para exibir mensagens de sucesso
  const showValidationToast = () => {
    toast.success("Item adicionado ao carrinho!")
  }
  // Função para exibir um toast customizado
  const customImageToast = () => {
    toast("Pedido confirmado!", {
      position: "bottom-center",
      autoClose: 4000,
      closeOnClick: true,
      draggable: true,
      icon: <img src="checkmark.svg" alt="Confirmado" style={{ width: '20px' }} />,  // Ícone como imagem
      style: {
        backgroundColor: '#00BFFF',
        color: '#fff',
      }
    })
  }
  // Função para abrir/fechar pop-ups
  const togglePopup = (popupName) => {
    if (activePopup === popupName) {
      setActivePopup(null)
    } else {
      setActivePopup(popupName)
    }

    if (popupName == 'list') {
      if (listaEnderecos) {
        setListaEnderecos(false)
      } else {
        setListaEnderecos(true)
      }
    }
  }
  // Função para definir o endereço ativo
  const toggleAdderess = (cep) => {
    if (enderecoAtivo === cep) {
      return
    } else {
      setEnderecoAtivo(cep)
      setAdderessAtual(cep)
    }
  }
  // Função para definir o endereço atual e atualizar o array de endereços
  const setAdderessAtual = (cep) => {
    const updatedEnderecos = enderecosdb.map((endereco) => {
      return { ...endereco, atual: endereco.cep === cep }
    })
    setEnderecosdb(updatedEnderecos) // Atualiza o estado com os endereços atualizados
  }
  // Função para incrementar a quantidade de um produto
  const incrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id === idProduto) {
        return { ...item, quantidade: item.quantidade + 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
  }
  // Função para decrementar a quantidade de um produto
  const desincrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id === idProduto && item.quantidade > 1) {
        return { ...item, quantidade: item.quantidade - 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
  }
  // Função para remover um produto do carrinho
  const deleteProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.filter((item) => item.id != idProduto)
    setProdutosdb(updatedprodutosdb)
  }
  // Função para calcular o total da compra
  const calcularTotal = () => {
    return produtosdb.reduce((total, item) => total + (item.preco * item.quantidade), 0).toFixed(2)
  }
  // Função para atualizar a lista de compras e abilitar o envio
  const atualizarListaCompras = () => {
    setListaComprasNavdb({ ...listaComprasNavdb, produtos: produtosdb })
    setProntaEnviar(true)
  }
  // Função para concatenar os nomes e quantidades dos produtos da lista de compras
  function concatenaProdutos() {
    return (listaComprasNavdb.produtos.map((item) => `${item.nome} - ${item.quantidade} un`).join('\n'))
  }
  // Função para enviar a mensagem para o WhatsApp
  useEffect(() => {
    if (prontaEnviar) {
      const mensagem = `Olá! Gostaria de fazer um pedido com os seguintes itens:\n\n${concatenaProdutos()}\n\n*Endereço de entrega:* ${enderecosdb.find(e => e.atual === true)?.endereco}, ${enderecosdb.find(e => e.atual === true)?.numero}\n\n*Total* ${calcularTotal()}\n\nAtenciosamente, ${clientedb.nome}`
      const numero = mercadosdb.find(mercado => mercado.atual === true).celular
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
      setProntaEnviar(false)
    }

  }, [produtosdb, listaComprasNavdb, prontaEnviar, enderecosdb])


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
          location.pathname !== '/perfilCliente' && <SearchBar data={['maca', 'banana', 'maçã']} />}
      </div>

      {/* Container Direito */}
      <div id="container-direito-nav">
        {/* Botão Endereço - Pop-up */}
        <button id="endereco-button" onClick={() => togglePopup('endereco')}>
          <div className="endereco-container">
            <span className="endereco-text">
              {enderecosdb.find(e => e.atual === true)?.logradouro ? `${enderecosdb.find(e => e.atual === true).logradouro}, ` : "Selecione um endereço"}
              <span className="endereco-number">
                {enderecosdb.find(e => e.atual === true)?.numero || ""}
              </span>
            </span>
            <img src="flecha.svg" alt="Flecha" className="arrow-icon" />
          </div>
        </button>
        {/*popup do endereço*/}
        {activePopup === 'endereco' && (
          <div onClick={() => { setActivePopup(null) }} className="overlay">
            <div id="popup-endereco" onClick={(e) => e.stopPropagation()}>
              <div className="btn-popup-container">
                <button
                  className="btn-popup"
                  onClick={() => { setActivePopup(null) }}
                >
                  <img src="XisVerde.svg" alt="X" />
                </button>
              </div>
              <button className="add-endereco" onClick={() => navigate("/addEndereco")}>
                <div>
                  <img src="adicionarIcon.svg" alt="Adicionar" />
                </div>
                <span className="add-text">Adicionar Endereço</span>
              </button>
              {enderecosdb.map((endereco) => (
                <button
                  key={endereco.id}
                  className={enderecoAtivo === endereco.cep || endereco.atual ? 'adderess-atual' : 'adderess'}
                  onClick={() => toggleAdderess(endereco.cep)}
                >
                  <span className="cep-text-pop">{endereco.apelido}</span>
                  <span className="adderess-text-pop">{endereco.endereco}{endereco.cep}</span>
                </button>
              ))}
            </div>
          </div>)}
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
                  {mercadosdb.map((mercado) => {
                    if (mercado.atual) {
                      return <div key={mercado.id} className="market-list">
                        <div className="logo-name">
                          <img src={mercado.logo} alt="Logo do mercado" className="logo-mercado" />
                          <span className="market-name">{mercado.nome}</span>
                        </div>
                        <NavLink to="/mercado" className="visitar-mercado">Ver Catálogo</NavLink>
                      </div>
                    }
                  })}
                  <div className="list-itens">
                    {produtosdb.length > 0 ? (
                      produtosdb.map((item) => (
                        <div key={item.id} className="list-item">
                          <div className="item-info">
                            <div className="img-detaisl">
                              <div className="item-image">
                                <img src={item.imagem} alt={item.nome} />
                              </div>
                              <div className="details">
                                <span className="item-name">{item.nome}</span>
                                <span className="item-additional-info">
                                  {item.informacaoAdicional.peso} {item.informacaoAdicional.unidade}
                                </span>
                              </div>

                            </div>
                            <div className="preco">
                              <span className="item-preco">R$ {item.preco.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="quantity-controls-container">
                            <button className="remove-btn" onClick={() => deleteProduto(item.id)}>
                              Remover
                            </button>
                            <div className="quantity-control">
                              <button className="decrease-btn" onClick={() => desincrementaProduto(item.id)}>
                                −
                              </button>
                              <span className="quantity">{item.quantidade}</span>
                              <button className="increase-btn" onClick={() => incrementaProduto(item.id)}>
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
                      <button className="comparar-btn" onClick={() => navigate('/comparacaoListas')}>
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