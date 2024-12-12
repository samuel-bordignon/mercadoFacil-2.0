import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"

function EscolhaLogin() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="containerAzul">

      <div className="esquerda login">
        <div className="espacamento">
          <h1 className='poppins-semibold'>Falta pouco para economizar!</h1>
          <p className='paragrafo-verde' style={{marginTop: '200px'}}>Como deseja continuar?</p>
          <div className='container-buttons'>
            <button className="primary" onClick={() => navigate('/loginParceiro')}>Sou parceiro</button>
            <button className="second" onClick={() => navigate('/loginCliente')}>Sou cliente</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscolhaLogin
