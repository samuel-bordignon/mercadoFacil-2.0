import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState } from 'react'

function TelaDentroMercado() {
  const {getLocalStorage, chaveMercadoLocal , mercadosdb} = useContext(GlobalContext)

  const idMercado = getLocalStorage(chaveMercadoLocal)

  const mercadoAtual = mercadosdb.find((mercado) => mercado.id === idMercado)

  function uuu(){
    console.log(mercadoAtual)
    console.log(idMercado)
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
            <p>CEP</p> {/*digitar o cep */}
            <h5 className="titulo-outras-info">Outras informações</h5>
            <p>CNPJ</p>
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
        <button onClick={()=>(uuu())}>fkhsdf</button>
      </div>

    </div>
  )
}

export default TelaDentroMercado
