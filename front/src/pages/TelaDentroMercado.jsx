import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState } from 'react'

function TelaDentroMercado() {
  const { getLocalStorage, chaveMercadoLocal, mercadosdb, enderecoMercadodb } = useContext(GlobalContext)

  const idMercado = getLocalStorage(chaveMercadoLocal)

  const mercadoAtual = mercadosdb.find((mercado) => mercado.id === idMercado)
  const enderecoAtual = enderecoMercadodb.find((endereco) => endereco.idMercado === idMercado)
  enderecoMercadodb.forEach((element) => console.log(element.idMercado));
  mercadosdb.forEach((element) => console.log(element.cnpj));

  function uuu() {
    console.log(mercadoAtual.cnpj)
    console.log(idMercado)
    console.log(enderecoAtual)
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
            {/* <h5>{mercadosdb.find((endereco) => endereco.idMercado === idMercadoAtivo)}</h5> */}
            <p>Informações sobre o endereço do mercado</p>
            <p>{enderecoAtual.cep}</p>
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
            <p>Telefone: +{mercadoAtual.telefone}</p>
            <p>Email: {mercadoAtual.email}</p>
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
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
          </div>
           {/* segunda sessão */}
           <div className="topico-produtos">
            <h4>Enlatados</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
          <div className="sessao-produtos-container">
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
            </div>
            <div className="card-produto">
              <div className="espaco-colocar-img">
                <img className="imagem-produto" src="acucar.png" alt="" />
                <button className="botaoAdd" onClick=''>
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                </button>
              </div>
              <p className="preco-produto">R$ 00,00</p>
              <p className="descricao-produto">Áçucar refinado União Pacote  1 kilo</p>
              
            </div>
          </div>

        </div>
      </div>
      {/* <button onClick={uuu}>isso ai</button> */}
    </div>
  )
}

export default TelaDentroMercado
