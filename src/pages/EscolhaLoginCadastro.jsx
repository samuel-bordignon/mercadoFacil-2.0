import React from 'react'
import { useNavigate } from 'react-router-dom'

function EscolhaLoginCadastro() {
  const navigate = useNavigate()
  
  return (
    <div>
      <div className="esquerda login">
        <div className="espacamento">
          <h1 className='poppins-semibold'>Falta pouco para economizar!</h1>
          <p className='paragrafo-verde'>Como deseja continuar?</p>
          <div className='container-buttons'>
            <button className="primary" onClick={() => navigate('/loginDois')}>Já tem uma conta?</button>
            <button className="second" onClick={() => navigate('/criarConta')}>Criar nova conta</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscolhaLoginCadastro