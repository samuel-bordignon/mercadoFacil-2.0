import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState, useEffect } from 'react'

function TelaDentroMercado() {
  const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey, listaDefoutAtual, setListaDefoutAtual,} = useContext(GlobalContext)
  const [mercadoAtual, setMercadoAtual] = useState([])
  const [enderecoMercadoAtual, setEnderecoMercadoAtual] = useState([])
  const [produtos, setProdutos] = useState([])
  const [icon, setIcon] = useState('Mais')
  const idMercado = getLocalStorage('id_mercado')
  const listaDefout = getLocalStorage('listaDefout')


  useEffect(() => {
    const fetchMercado = async () => {
      try {
        const mercadoAtual = await getDataById('mercados', idMercado);
        setMercadoAtual(mercadoAtual);
      } catch (error) {
        console.error('Erro ao buscar mercado:', error);
      }
    };

    fetchMercado();
  }, [idMercado]);
  useEffect(() => {
    const fetchProdutosEEnderecos = async () => {
      if (mercadoAtual) {
        try {
          const [enderecosMercados, produtos] = await Promise.all([
            getDataByForeignKey('enderecomercados', 'fk_id_mercado', mercadoAtual.id_mercado),
            getDataByForeignKey('produtos', 'fk_id_mercado', mercadoAtual.id_mercado),
          ]);

          setEnderecoMercadoAtual(...enderecosMercados);
          setProdutos(produtos);
        } catch (error) {
          console.error('Erro ao buscar dados dependentes:', error);
        }
      }
    };

    fetchProdutosEEnderecos();
  }, [mercadoAtual]); // Depende de mercadoAtual



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

  const abreInfoProduto = () => { }

  return (
    <div className="tudo">
      <Navbar />
      <div className="tela-dentro-mercado">
        <div className="sideBar-dentro-mercado">
          <div className="cabecalio-mercado-container">
            <div className="logo-container-mercado">
              <img className="logo-mercado" src={`${mercadoAtual.logo}`} alt="" />
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
            {/* <p>+{mercadoAtual.telefone}</p>
            <p>{mercadoAtual.email}</p> */}
          </div>
        </div>

        <div className="todos-produtos-container">
          <div className="topico-produtos">
            <h4>Confeitaria</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
          <div className="sessao-produtos-container">
            {produtos.map((produto) => (
              <div
                className="card-produto"
                onClick={() => abreInfoProduto()}
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
                <p className="preco-produto">R${produto.preco}</p>
                <div className="detalhes-produto-container">
                  <p className="descricao-produto">{produto.nome}</p>
                </div>
              </div>

            ))}
          </div>
          {/* segunda sessão */}
          <div className="topico-produtos">
            <h4>Almoço</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelaDentroMercado
