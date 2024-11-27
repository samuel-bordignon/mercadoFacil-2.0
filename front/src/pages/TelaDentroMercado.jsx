import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState, useEffect } from 'react'

function TelaDentroMercado() {
  const { getLocalStorage, getDataById, getDataByForeignKey} = useContext(GlobalContext)

  const [mercadoAtual, setMercadoAtual] = useState({})
  const [enderecoMercadoAtual, setEnderecoMercadoAtual] = useState({})

  const idMercado = getLocalStorage('id_mercado')

  useEffect(() => {
    getDataById('mercados', idMercado).then((data) => {
    setMercadoAtual(data)
    }).catch((error) => {
      console.error('Erro ao buscar mercado:', error)
    })
    getDataByForeignKey('enderecomercados', 'fk_id_mercado', idMercado).then((data) => {
      setEnderecoMercadoAtual(data)
    }).catch((error) => {
      console.error('Erro ao buscar endereço:', error)
      })
  }, [])


  function uuu() {
    console.log(mercadoAtual.cnpj)
    console.log(idMercado)
    console.log(enderecoMercadoAtual)
  }

  return (
    <div className="tudo">
      <Navbar />
      <div className="tela-dentro-mercado">
        <div className="sideBar-dentro-mercado">
          <div className="nome-mercado-container">

            <h5>{mercadoAtual.nome}</h5>
          </div>
          <div className="endereco-cnpj-container">
            <p className="sub-titulo-verde">Sobre</p>
            {/* <h5>{mercados.find((endereco) => endereco.idMercado === idMercadoAtivo)}</h5> */}
            <p>Informações sobre o endereço do mercado</p>
            <p>{enderecoMercadoAtual.cep}</p>
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
            <p>+{mercadoAtual.telefone}</p>
            <p>{mercadoAtual.email}</p>
          </div>
        </div>

        <div className="todos-produtos-container">
          <div className="topico-produtos">
            <h4>Confeitaria</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
          <div className="sessao-produtos-container">
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
          </div>
          {/* segunda sessão */}
          <div className="topico-produtos">
            <h4>Almoço</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
          <div className="sessao-produtos-container">
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="oleo.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Óleo de Soja Lisa 2 Litros</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="skol.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Fardo de cerveja Skoll 12 latinhas de 269 ml</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="arroz.png" alt="" />
                <button className="botaoAdd" onClick={AlteraIcon}>
                  {icon === 'Mais' ? (
                    <img className="iconsvgMais" src="IconMais.svg" alt="" />
                  ) : (
                    <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                  )}
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>

            </div>
          </div>

        </div>
      </div>
      {/* <button onClick={uuu}>isso ai</button> */}
    </div>
  )
}

export default TelaDentroMercado