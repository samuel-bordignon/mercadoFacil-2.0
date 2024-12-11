import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"
import "../components/PopUpInfoProduto.css"


import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { p } from "framer-motion/client"

function TelaDentroMercado() {
  const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey } = useContext(GlobalContext)
  const [mercadoAtual, setMercadoAtual] = useState([])
  const [enderecoMercadoAtual, setEnderecoMercadoAtual] = useState([])
  const [idProduto, setIdProduto] = useState('')
  const [produtos, setProdutos] = useState([])
  const [icon, setIcon] = useState('Mais')
  const idMercado = getLocalStorage('id_mercado')
  const listaDefout = getLocalStorage('listaDefout')
  const [produtosSessaoFeira, setProdutosSessaoFeira] = useState([])
  const [loading, setLoading] = useState(false)
  const [produtosdb, setProdutosdb] = useState([])
  const navigate = useNavigate()
  const [listaDefoutAtual, setListaDefoutAtual] = useState([])


  useEffect(() => {
    const fetchMercado = async () => {
      try {
        const mercadoAtual = await getDataById('mercados', idMercado);
        console.log(mercadoAtual)
        setMercadoAtual(mercadoAtual);
      } catch (error) {
        console.error('Erro ao buscar mercado:', error);
      }
    };

    fetchMercado();
  }, [idMercado]);

  async function criarSessao(nomeSessao, categorias, produtos) {
    const produtosSessao = produtos.filter(produto =>
      categorias.includes(produto.categoria)
    );

    return {
      nomeSessao,
      produtos: produtosSessao
    };
  }

  const fetchProdutosEEnderecos = async () => {
    if (mercadoAtual) {
      try {
        setLoading(true);
        const [enderecosMercados, produtos,] = await Promise.all([
          getDataByForeignKey('enderecomercados', 'fk_id_mercado', mercadoAtual.id_mercado),
          getDataByForeignKey('produtos', 'fk_id_mercado', mercadoAtual.id_mercado),
        ]);

        console.log('Endereços:', enderecosMercados);


        setEnderecoMercadoAtual(...enderecosMercados);


        const produtosComPalavraChave = await Promise.all(
          produtos.map(async (produto) => {
            const palavraRelacao = await getDataByForeignKey('palavrachave_produto_relacao', 'fk_id_produto', produto.id_produto);
            if (palavraRelacao.length > 0) {
              const palavraChave = await getDataById('palavrachave', palavraRelacao[0].fk_id_palavrachave);
              return { ...produto, palavraChave: palavraChave.nome_palavra, categoria: palavraChave.categoria };
            }
            return { ...produto, palavraChave: null }; // Se não encontrar palavra-chave
          })
        )
        console.log('Produtos:', produtosComPalavraChave);

        // Criando a sessão de feira
        const sessaoFeira = await criarSessao('Feira', ['Frutas', 'Verduras', 'Legumes'], produtosComPalavraChave);
        const sessaoAcougue = await criarSessao('Açougue', ['Aves', 'Peixes', 'Suínos', 'Bovinos'], produtosComPalavraChave);
        console.log('Sessão de feira:', sessaoFeira);

        // Atualizando o estado com a sessão criada
        setProdutosSessaoFeira([sessaoFeira, sessaoAcougue]);
        setProdutos(produtosComPalavraChave || []);
      } catch (error) {
        console.error('Erro ao buscar dados dependentes:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  //Função para validar se um objeto contém alguma informação
  function verificaDadosObjeto(obj) {
    return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
  }
  useEffect(() => {
    if (verificaDadosObjeto(mercadoAtual)) {
      fetchProdutosEEnderecos()
    }
  }, [mercadoAtual]); // Depende de mercadoAtual

  const [popUpAtivo, setPopUpAtivo] = useState(false) // Estado para controlar a exibição do pop-up

  const adicionaLista = (produto) => {
    // Verifica se o produto já está na lista
    const produtoJaNaLista = listaDefout.some(item => item.id_produto === produto.id_produto);

    if (produtoJaNaLista) {
      const novaLista = listaDefout.filter(item => item.id_produto !== produto.id_produto);
      setListaDefoutAtual(novaLista)
      setLocalStorage('listaDefout', novaLista.map((produto) => ({ ...produto, quantidade_lista: 1 })))
    } else {
      const novaLista = [...listaDefout, produto]
      setListaDefoutAtual(novaLista)
      setLocalStorage('listaDefout', novaLista.map((produto) => ({ ...produto, quantidade_lista: 1 })))
    }
  }
  const verTodos = (listaProdutos) => {
    console.log(listaProdutos)
    setLocalStorage('listaProdutosVerTodos', listaProdutos)
    navigate('/verTodos')

  }

  if (loading) {
    return <div className="loading">
      <div className="spinner"></div>
    </div>;
  }

  return (
    <div className="tudo">
      <Navbar listaCompras={listaDefout} produtosdb={produtos} setProdutosdb={setProdutosdb} />
      <div className="tela-dentro-mercado">
        <div className="sideBar-dentro-mercado">
          <div className="cabecalio-mercado-container">
            <div className="logo-container-mercado">
              <img className="logo-mercado" src={`/uploads_images/${mercadoAtual.logo}`} alt="" />
            </div>
            <div className="nome-mercado-container">
              <h5>{mercadoAtual.nome}</h5>

            </div>
          </div>
          <div className="endereco-cnpj-container">
            <p className="sub-titulo-verde">Sobre</p>
            <h5 className="titulo-outras-info">Endereço</h5>
            <p>{enderecoMercadoAtual.logradouro}</p>
            <p>CEP: {enderecoMercadoAtual.cep}</p>
            <h5 className="titulo-outras-info">Outras informações</h5>
            <p>CNPJ: {mercadoAtual.cnpj}</p>
          </div>
          <div className="horario-container">
            <div className="dias-funcion-container">
              <p className="sub-titulo-verde">Horário</p>
              <p>Domingo</p>
              <p>Segunda-feira</p>
              <p>Terça-feira</p>
              <p>Quarta-feira</p>
              <p>Quinta-feira</p>
              <p>Sexta-feira</p>
              <p>Sábado</p>
            </div>
            <div className="horarios-funcion-container">
              <p>Não Abre</p>
              <p>08:00 - 22:00</p>
              <p>08:00 - 22:00</p>
              <p>08:00 - 22:00</p>
              <p>08:00 - 22:00</p>
              <p>08:00 - 22:00</p>
              <p>08:00 - 22:00</p>
            </div>
          </div>
          <div className="contato-container">
            <p className="sub-titulo-verde">Contato</p>
            <p>{mercadoAtual.telefone}</p>
            <p>{mercadoAtual.email}</p>
          </div>
        </div>
        <div className="container-sessoes">
          {produtosSessaoFeira.length > 0 && produtosSessaoFeira.map((sessao, index) => (
            sessao.produtos.length > 0 && (
              <div className="todos-produtos-container" key={index}>
                <div className="topico-produtos">
                  <h4>{sessao.nomeSessao}</h4>
                  <button
                    className="sub-titulo-verde"
                    style={{ background: "none", border: "none" }}
                    onClick={() => { verTodos(sessao.produtos) }}
                  >
                    Ver todos
                  </button>
                </div>
                <div className="sessao-produtos-container">
                  {sessao.produtos.slice(0, 10).map((produto) => (
                    <div
                      className="card-produto"
                      onClick={() => { setPopUpAtivo(!popUpAtivo), setIdProduto(produto.id_produto) }}
                      key={produto.id_produto}
                    >
                      <div className="espaco-colocar-img">
                        <img
                          className="imagem-produto"
                          src={`/uploads_images/${produto.imagem_file_path}`}
                          alt=""
                        />
                        <button
                          className="botaoAdd"
                          onClick={(e) => {
                            e.stopPropagation(); // Impede que o clique no botão acione o onClick do pai
                            adicionaLista(produto);
                          }}
                        >
                          {/* Exibe o ícone baseado na presença do produto na lista */}
                          {listaDefout.some(item => item.id_produto === produto.id_produto) ? (
                            <img className="iconsvgMais" src="CheckMark.svg" alt="Check" />
                          ) : (
                            <img className="iconsvgMais" src="IconMais.svg" alt="Mais" />
                          )}
                        </button>
                      </div>
                      <div className="detalhes-produto-container">
                        <p className="preco-produto">R${produto.preco}</p>
                        <p className="descricao-produto">{produto.nome}</p>
                      </div>
                    </div>
                  ))}

                  {popUpAtivo && (
                    <div className="popUp-overlay" onClick={() => setPopUpAtivo(false)} >
                      <div className="popUp-infoProd-container"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="espaco-img-prod-popUp-container">
                          <div className="fundo-img-popUp">
                            <img src={`/uploads_images/${produtos.find((produto) => produto.id_produto === idProduto).imagem_file_path}`} alt="" />
                          </div>
                        </div>
                        <div className="infos-produto-popUp-container">
                          <div className="parte-superior-popUp">
                            <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                              <img src="CloseIcon.svg" alt="" />
                            </button>
                            <h1 className="categoria-info-produto">Padaria</h1>
                            <h1 className="nome-info-produto">{produtos.find((produto) => produto.id_produto === idProduto).nome}</h1>
                            <p className="descricao-info-produto">{produtos.find((produto) => produto.id_produto === idProduto).descricao}</p>
                          </div>
                          <div className="parte-inferior-popUp">
                            <p className="preco-info-produto">R${produtos.find((produto) => produto.id_produto === idProduto).preco}</p>
                            <hr />
                            <button
                              onClick={() => adicionaLista(produtos.find((produto) => produto.id_produto === idProduto))}
                              className={listaDefout.some(item => item.id_produto === idProduto) ? "bttn-add-lista-remover" : "bttn-add-lista-adicionar"}
                            >
                              {listaDefout.some(item => item.id_produto === idProduto) ? (
                                <p>Remover da lista</p>
                              ) : (
                                <p>Adicionar á lista</p>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )))}
        </div>
      </div>
    </div>
  )
}

export default TelaDentroMercado
