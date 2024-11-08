import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState } from 'react'

function TelaDentroMercado() {
  const {getLocalStorage, chaveMercadoLocal , mercadosdb, enderecoMercadodb} = useContext(GlobalContext)

  const idMercado = getLocalStorage(chaveMercadoLocal)

  const mercadoAtual = mercadosdb.find((mercado) => mercado.id === idMercado)
  const enderecoAtual = enderecoMercadodb.find((endereco) => endereco.idMercado === idMercado)
  enderecoMercadodb.forEach((element) => console.log(element.cnpj));
  enderecoMercadodb.forEach((element) => console.log(element.idMercado));

  function uuu(){
    console.log(mercadoAtual)
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
            <p className="sub-titulo-sideBar-mercado">Sobre</p>
            {/* <h5>{mercadosdb.find((endereco) => endereco.idMercado === idMercadoAtivo)}</h5> */}
            <p>informações sobre o endereço do mercado</p>
            <p>{enderecoAtual.cep}</p>
            <h5 className="titulo-outras-info">Outras informações</h5>
            <p>{enderecoAtual.cpnj}</p>
          </div>
          <div className="horario-container">
            <div className="dias-funcion-container">
              <p className="sub-titulo-sideBar-mercado">Horário</p>
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
            <p className="sub-titulo-sideBar-mercado">Contato</p>
            <p>Telefone</p>
            <p>Email</p>
          </div>
        </div>
      </div>
<button onClick={uuu}>isso ai</button>
    </div>
  )
}

export default TelaDentroMercado
