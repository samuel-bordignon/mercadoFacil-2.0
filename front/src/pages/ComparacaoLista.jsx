import './ComparacaoLista.css'
import { NavLink, } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext, useState, useEffect } from 'react'


function ComparacaoLista() {

  const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey, compararListaDeCompras } = useContext(GlobalContext)
  const [produtosNaoEncontrados, setProdutosNaoEncontrados] = useState([])
  const [listaOrdenadaMercados, setListaOrdenadaMercados] = useState([])
  const [produtosEncontrados, setProdutosEncontrados] = useState([])
  const [enderecoCliente, setEnderecoCliente] = useState({})
  const mercadosProximos = getLocalStorage('mercadosDentro')
  const [rotasMercados, setRotasMercados] = useState({})
  const [produtosdb, setProdutosdb] = useState([])
  const idCliente = getLocalStorage('id_cliente')
  const idMercado = getLocalStorage('id_mercado')
  const produtos = getLocalStorage('listaDefout')
  const [profile, setProfile] = useState('walk')
  const [cliente, setCliente] = useState({})
  const [loading, setLoading] = useState(false)
  const [prontaEnviar, setProntaEnviar] = useState(false)


  const trocaIdMercado = (id) => {
    setLocalStorage('id_mercado', id)
    handleComparacao(id)
    ordenarMercados()
  }

  const trocarPerfil = (novoPerfil) => {
    setProfile(novoPerfil)
  }

  const calcularDistanciaRota = async (endereco1, endereco2, profile) => {
    if (endereco1?.longitude && endereco1?.latitude && endereco2?.longitude && endereco2?.latitude && profile) {
      const startPoint = [endereco1.longitude, endereco1.latitude] // Longitude e Latitude do primeiro endereço
      const endPoint = [endereco2.longitude, endereco2.latitude] // Longitude e Latitude do segundo endereço

      // Velocidades médias em m/s
      const veloCaminhada = 3.78
      const veloBicicleta = 4.7
      const veloCarro = 7.88

      const url = `http://router.project-osrm.org/route/v1/car/${startPoint.join(',')};${endPoint.join(',')}?overview=false&geometries=polyline`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`)
        }


        const data = await response.json()
        const route = data.routes?.[0]

        if (!route) {
          throw new Error('Nenhuma rota encontrada entre os pontos especificados.')
        }

        const distanceInMeters = route.distance // Distância em metros
        const distanceInKm = (distanceInMeters / 1000).toFixed(2) // Distância em km

        // Escolher velocidade baseada no perfil
        let velocidadeEscolhida
        switch (profile) {
          case 'walk':
            velocidadeEscolhida = veloCaminhada
            break
          case 'bike':
            velocidadeEscolhida = veloBicicleta
            break
          case 'car':
            velocidadeEscolhida = veloCarro
            console.log('escolheu carro')
            break
          default:
            velocidadeEscolhida = veloCaminhada
            break
        }

        // Calcular duração em horas
        const durationInMin = (distanceInMeters / velocidadeEscolhida / 60)

        const formataMinutos =
          durationInMin >= 60
            ? `${Math.floor(durationInMin / 60)}h ${durationInMin % 60}min`
            : `${durationInMin.toFixed(0)}min`


        return { distanceInKm, formataMinutos }
      } catch (error) {
        console.error('Erro ao calcular a rota:', error.message)
      }
    } else {
      console.error('Os endereços ou perfil não foram fornecidos corretamente.')
    }
  }

  const ordenarMercados = async (mercados, produtos) => {
    if (!mercados || mercados.length === 0) return // Validação de dados
    if (!idMercado) return // Validação de mercado atual

    const mercadoAtual = mercados.find((mercado) => mercado.id_mercado === idMercado)
    const outrosMercados = mercados.filter((mercado) => mercado.id_mercado !== idMercado).slice(0, 3)

    // Lista inicial ordenada
    const listaOrdenada = mercadoAtual ? [mercadoAtual, ...outrosMercados] : outrosMercados

    try {
      // Busca os dados e calcula o total
      const mercadosComProdutos = await Promise.all(
        listaOrdenada.map(async (mercado) => {
          const response = await compararListaDeCompras(mercado.id_mercado, produtos)
          return {
            ...mercado,
            produtosEncontrados: response.produtosEncontrados,
            produtosNaoEncontrados: response.produtosNaoEncontrados,
          }
        })
      )
      setListaOrdenadaMercados(mercadosComProdutos)
    } catch (error) {
      console.error("Erro ao ordenar mercados:", error)
    }
  }

  const fetchData = async () => {
    if (!idCliente) return
    try {
      setLoading(true)
      const [cliente, tabelaRelacao] = await Promise.all([
        getDataById('clientes', idCliente),
        getDataByForeignKey('endereco_cliente_relecao', 'fk_id_cliente', idCliente),
      ])
      const enderecosRelacionadosCliente = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )
      const enderecoAtualCliente = enderecosRelacionadosCliente.find((endereco) => endereco.isatual)

      const produtos = getLocalStorage('listaDefout')

      const mercadoAtual = listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)

      setEnderecoCliente(enderecoAtualCliente)
      setProdutosdb(produtos)
      setCliente(cliente)

    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleComparacao = async (id) => {
    const res = await compararListaDeCompras(id, produtos)
    setProdutosNaoEncontrados(res.produtosNaoEncontrados)
    setProdutosEncontrados(res.produtosEncontrados)
  }

  // Função para incrementar a quantidade de um produto
  const incrementaProduto = (produto) => {
    const updatedProdutosdb = produtosEncontrados.map((item) => {
      if (item.id_produto === produto.id_produto) {
        return { ...item, quantidade_lista: (item.quantidade_lista || 0) + 1 };
      }
      return item;
    });
    const updatedProdutosOriginais = produtosdb.map((item) => {
      if (item.id_produto === produto.id_produto_original) {
        return { ...item, quantidade_lista: (item.quantidade_lista || 0) + 1 };
      }
      return item
    })
    ordenarMercados(mercadosProximos, updatedProdutosOriginais)
    handleComparacao(produto.id_mercado)
    setProdutosEncontrados(updatedProdutosdb)
    setProdutosdb(updatedProdutosOriginais);
    setLocalStorage('listaDefout', updatedProdutosOriginais);
  }
  // Função para decrementar a quantidade de um produto
  const desincrementaProduto = (produto) => {
    const updatedProdutosdb = produtosEncontrados.map((item) => {
      if (item.id_produto === produto.id_produto) {
        const novaQuantidade = (item.quantidade_lista || 1) - 1;
        // Garantir que não seja menor que 1
        return { ...item, quantidade_lista: novaQuantidade > 0 ? novaQuantidade : 1 };
      }
      return item;
    });
    const updatedProdutosOriginais = produtosdb.map((item) => {
      if (item.id_produto === produto.id_produto_original) {
        const novaQuantidade = (item.quantidade_lista || 1) - 1;
        // Garantir que não seja menor que 1
        return { ...item, quantidade_lista: novaQuantidade > 0 ? novaQuantidade : 1 };
      }
      return item;
    })
    ordenarMercados(mercadosProximos, updatedProdutosOriginais)
    setProdutosEncontrados(updatedProdutosdb)
    setProdutosdb(updatedProdutosOriginais)
    setLocalStorage('listaDefout', updatedProdutosOriginais)
  }
  // Função para remover um produto da lista
  const deleteProduto = (produto) => {
    const updatedProdutosdb = produtosEncontrados.filter((item) => item.id_produto !== produto.id_produto)
    const updatedProdutosOriginais = produtosdb.filter((item) => item.id_produto !== produto.id_produto_original) 
    ordenarMercados(mercadosProximos, updatedProdutosOriginais)
    setProdutosEncontrados(updatedProdutosdb)
    setProdutosdb(updatedProdutosOriginais);
    setLocalStorage('listaDefout', updatedProdutosOriginais);
  }
  // Função para calcular o total da compra
  const calcularTotalPorMercado = (mercado) => {
    return mercado.produtosEncontrados.reduce((total, produto) => {
      return total + produto.preco * produto.quantidade_lista
    }, 0).toFixed(2) // Formatar o total para 2 casas decimais
  }
  //Função para validar se um objeto contém alguma informação
  function verificaDadosObjeto(obj) {
    return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
  }
  //função para calcular as rotas para todos os mercados
  const calcularRotasParaTodosMercados = async () => {
    try {
      const novasRotas = await Promise.all(
        listaOrdenadaMercados?.map(async (mercado) => {
          const rota = await calcularDistanciaRota(
            enderecoCliente,
            mercado?.enderecoMercado,
            profile)
          return { id_mercado: mercado.id_mercado, rota }
        })
      )
      setRotasMercados(novasRotas.reduce((acumulador, rota) => {
        acumulador[rota.id_mercado] = rota.rota
        return acumulador
      }, {}))
    } catch (error) {
      console.error("Erro ao calcular rotas:", error)
    }
  }
  // Função para concatenar os nomes e quantidades dos produtos da lista de compras
  function concatenaProdutos() {
    return (produtosEncontrados.map((item) => `${item.nome} - ${item.quantidade_lista} un`).join('\n'))
  }
  useEffect(() => {
    if (listaOrdenadaMercados.length > 0 && verificaDadosObjeto(enderecoCliente) && profile) {
      calcularRotasParaTodosMercados()
    }
  }, [listaOrdenadaMercados, enderecoCliente, profile])
  useEffect(() => {
    ordenarMercados(mercadosProximos, produtos)
    fetchData()
    handleComparacao(idMercado)
  }, [])
  useEffect(() => {
    if (prontaEnviar) {
      const enderecoAtual = enderecoCliente
      const mercadoAtual = listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)
      const mensagem = `
  Olá! Gostaria de fazer um pedido com os seguintes itens:
  ${concatenaProdutos()}
  *Endereço de entrega:* ${enderecoAtual?.logradouro}, ${enderecoAtual?.numero}
  *Total*: R$ ${calcularTotalPorMercado(mercadoAtual)}
  Atenciosamente, ${cliente?.nome}
`
      const numero = mercadoAtual.telefone
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
      setProntaEnviar(false)
    }

  }, [produtos, prontaEnviar, enderecoCliente])

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
            <i className={profile === 'bike' ? "bi bi-bicycle active" : "bi bi-bicycle"} onClick={() => trocarPerfil('bike')} style={{ fontSize: '46px' }}></i>
            <i className={profile === 'car' ? "bi bi-car-front active" : "bi bi-car-front"} onClick={() => trocarPerfil('car')}></i>
            <i className={profile === 'walk' ? "bi bi-person-walking active" : "bi bi-person-walking"} onClick={() => trocarPerfil('walk')}></i>
          </div>
          <div className='info-localizacao'>
            <img src="/public/mapa.png" alt="" />
            <div className='text-loc'>
              <h3>{listaOrdenadaMercados.length > 0 && listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)?.enderecoMercado.logradouro}</h3>
              <h4>{listaOrdenadaMercados.length > 0 && listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)?.enderecoMercado.complemento}</h4>
            </div>
          </div>

          <div className='horario-atendimento'>
            <h3>
              {rotasMercados[idMercado]
                ? (rotasMercados[idMercado].formataMinutos)
                : 'Carregando...'}
            </h3>
          </div>

          <div className='container-card-mer'>
            {listaOrdenadaMercados.map((mercado) => (
              <div
                className={`card-mer-2 ${idMercado === mercado.id_mercado ? 'ativo' : ''}`}
                key={mercado.id_mercado}
                onClick={() => trocaIdMercado(mercado.id_mercado)}>
                <div className='cabecario-mer'>
                  <div >
                    <img className='logo-mercado-compara-lista'src={`/uploads_images/${mercado.logo}`} alt="Logo do mercado" />
                  </div>
                  <h3 className='nome-mercado'>{mercado.nome}</h3>
                </div>
                <h4 className='distancia-mer'>{mercado.distancia} Km</h4>
                <h4 className='preco-total'>R$ {calcularTotalPorMercado(mercado)}</h4>
              </div>
            ))}
          </div>

          <div className='bot-enviar-lista'>
            <button onClick={()=>setProntaEnviar(true)}>Enviar Lista</button>
          </div>
        </div>
        {loading === true ?
          <div id="popup-list-comparacao">
            <div className="loading">
              <div className="spinner"></div>
            </div>
          </div>
          : (
            <div id="popup-list-comparacao" onClick={(e) => e.stopPropagation()}>
              <div className="market-list">
                <div className="logo-name">
                  <img src={`/uploads_images/${listaOrdenadaMercados.length > 0 && listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)?.logo}`} alt="Logo do mercado" className="logo-mercado-list-comparacao" />
                  <span className="market-name-comparacao">{listaOrdenadaMercados.length > 0 && listaOrdenadaMercados.find((mercado) => mercado.id_mercado === idMercado)?.nome}</span>
                </div>
                <hr />
              </div>
              <div className="shopping-list">
                <div className="list-itens-encontrados">
                  {produtosEncontrados.length > 0 ? (
                    produtosEncontrados.map((item) => (
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
                          <button className="remove-btn" onClick={() => deleteProduto(item)}>
                            Remover
                          </button>
                          <div className="quantity-control">
                            <button className="decrease-btn" onClick={() => desincrementaProduto(item)}>
                              −
                            </button>
                            <span className="quantity">{item.quantidade_lista}</span>
                            <button className="increase-btn" onClick={() => incrementaProduto(item)}>
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
          )}
      </div>
    </div >
  )
}

export default ComparacaoLista
