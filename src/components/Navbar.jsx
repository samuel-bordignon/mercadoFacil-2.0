import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import SearchBar from "./SearchBar"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Navbar.css'
import './PopUpListaCompras.css'
import './PopUpEnderecos.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Estado único para controlar qual pop-up está aberto
  const [activePopup, setActivePopup] = useState(null)
  const [enderecoAtivo, setEnderecoAtivo] = useState(null)
  const [prontaEnviar, setProntaEnviar] = useState(false)
  const [enderecosdb, setEnderecosdb] = useState([
    { id: 1, endereco: "Endereço 1", numero: "84", cep: "88058089", atual: true },
    { id: 2, endereco: "Endereço 2", numero: "72", cep: "88058080", atual: false },
    { id: 3, endereco: "Endereço 3", numero: "91", cep: "88058087", atual: false },
  ])
  const [produtosdb, setProdutosdb] = useState([
    {
      id: 1,
      nome: "Arroz Branco",
      preco: 10.00,
      quantidade: 1,
      imagem: "arroz.png",
      descricao: "Pacote de arroz branco de alta qualidade.",
      informacaoAdicional: { peso: "5kg", unidade: "1" }
    },
    {
      id: 2,
      nome: "Fardo Skol",
      preco: 5.50,
      quantidade: 1,
      imagem: "skol.png",
      descricao: "Fardo com 12 latas",
      informacaoAdicional: { peso: "350ml", unidade: "12" }
    },
    {
      id: 3,
      nome: "Farinha de Trigo",
      preco: 4.20,
      quantidade: 1,
      imagem: "farinha.png",
      descricao: "Farinha de trigo enriquecida com ferro.",
      informacaoAdicional: { peso: "1kg", unidade: "1" }
    },
    {
      id: 4,
      nome: "Óleo de Soja",
      preco: 7.00,
      quantidade: 1,
      imagem: "oleo.png",
      descricao: "Óleo de soja 100% natural.",
      informacaoAdicional: { peso: "1L", unidade: "1" }
    },
    {
      id: 5,
      nome: "Açúcar Refinado",
      preco: 3.80,
      quantidade: 1,
      imagem: "acucar.png",
      descricao: "Açúcar refinado branco de alta pureza.",
      informacaoAdicional: { peso: "1kg", unidade: "1" }
    }
  ])
  const [listaComprasNavdb, setListaComprasNavdb] = useState({
    id: 1, nome: "Lista 1", produtos: produtosdb },
  )
  const [mercadosdb, setMercadosdb] = useState([
    { id: 1, nome: "Mercado do João", endereco: "Rua das Flores, 123", cep: "88058089", logo: "1.png", atual: false, celular: '554899749819' },
    { id: 2, nome: "Mercado do José", endereco: "Rua das Palmeiras, 456", cep: "88058080", logo: "2.png", atual: true, celular: '554899749819' },
    { id: 3, nome: "Mercado do Pedro", endereco: "Rua das Oliveiras, 789", cep: "88058087", logo: "3.png", atual: false, celular: '554899749819' },
  ])
  const[usuario, setUsuario] = useState({
    id: 1,
    nome: "Palhaço Caçarola",
    email: "caçarola@palhaço.com",
  })
  
  // Função para exibir mensagens de erro/validação
  const showErrorToast = () => {
    toast.error("Erro ao carregar dados do usuário!")
  }

  const showValidationToast = () => {
    toast.success("Item adicionado ao carrinho!")
  }
  // Função para abrir/fechar pop-ups
  const togglePopup = (popupName) => {
    if (activePopup === popupName) {
      setActivePopup(null)
    } else {
      setActivePopup(popupName)
    }
  }

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

  const incrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id === idProduto) {
        return { ...item, quantidade: item.quantidade + 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
  }

  const desincrementaProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.map((item) => {
      if (item.id === idProduto && item.quantidade > 1) {
        return { ...item, quantidade: item.quantidade - 1 }
      }
      return item
    })
    setProdutosdb(updatedprodutosdb)
  }

  const deleteProduto = (idProduto) => {
    const updatedprodutosdb = produtosdb.filter((item) => item.id != idProduto)
    setProdutosdb(updatedprodutosdb)
  }

  const calcularTotal = () => {
    return produtosdb.reduce((total, item) => total + (item.preco * item.quantidade), 0).toFixed(2);
  }

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

  const atualizarListaCompras = () => {
    setListaComprasNavdb({ ...listaComprasNavdb, produtos: produtosdb });
    setProntaEnviar(true)
  }

  function concatenaProdutos() {
    return (listaComprasNavdb.produtos.map((item) => `${item.nome} - ${item.quantidade} un`).join('\n'))
  }

  useEffect(() => {
    if (prontaEnviar) {
      const mensagem = `Olá! Gostaria de fazer um pedido com os seguintes itens:\n\n${concatenaProdutos()}\n\n*Endereço de entrega:* ${enderecosdb.find(e => e.atual === true)?.endereco}, ${enderecosdb.find(e => e.atual === true)?.numero}\n\n*Total* ${calcularTotal()}\n\nAtenciosamente, ${usuario.nome}`
      const numero = mercadosdb.find(m => m.atual === true).celular
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
            to="/"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Mercados
          </NavLink>
          <NavLink
            to="/produtosdb"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Lista de Compras
          </NavLink>
        </div>
      </div>

      {/* Container Central - SearchBar */}
      <div id="container-centro-nav">
        {location.pathname !== '/produtosdb' &&
          location.pathname !== '/perfilCliente' && <SearchBar />}
      </div>

      {/* Container Direito */}
      <div id="container-direito-nav">
        {/* Botão Endereço - Pop-up */}
        <button id="endereco-button" onClick={() => togglePopup('endereco')}>
          <div className="endereco-container">
            <span className="endereco-text">
              {enderecosdb.find(e => e.atual === true)?.endereco ? `${enderecosdb.find(e => e.atual === true).endereco}, ` : "Selecione um endereço"}
              <span className="endereco-number">
                {enderecosdb.find(e => e.atual === true)?.numero || ""}
              </span>
            </span>

            <img src="flecha.svg" alt="Flecha" className="arrow-icon" />
          </div>
        </button>

        {activePopup === 'endereco' && (
          <div onClick={() => { setActivePopup(null) }} className="overlay">
            <div id="popup-endereco" onClick={(e) => e.stopPropagation()}>
              <div className="btn-popup-container">
                <button
                  className="btn-popup"
                  onClick={() => { setActivePopup(null) }}
                >
                  <img src="Xverde.svg" alt="X" />
                </button>
              </div>
              <button className="add-endereco">
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
                  <span className="cep-text-pop">{endereco.cep}</span>
                  <span className="adderess-text-pop">{endereco.endereco}{endereco.numero}</span>
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
                  className="btn-popup"
                  onClick={() => { setActivePopup(null) }}
                >
                  <img src="Xverde.svg" alt="X" />
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
                </div>
                <div className="total-container">
                  <div className="total-details">
                    <span className="total-text">Total</span>
                    <span className="total-price">R$ {calcularTotal()}</span>
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