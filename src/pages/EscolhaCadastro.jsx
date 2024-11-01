import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Global.css'


function EscolhaCadastro() {
  const navigate = useNavigate()

  return (
    <div className="esquerda login">
      <div className="espacamento">
        <h1 className='poppins-semibold'>Falta pouco para economizar!</h1>
        <p className='paragrafo-verde'>Como deseja continuar?</p>
        <div className='container-buttons'>
          <button className="primary" onClick={() => navigate('/criarConta/CadastroParceiro1')}>Quero ser parceiro</button>
          <button className="second" onClick={() => navigate('/criarConta/CadastroCliente')}>Quero ser cliente</button>
          <button className='visitante'>Entrar como visitante</button>
        </div>
      </div>
    </div>
  )
}

export default EscolhaCadastro
