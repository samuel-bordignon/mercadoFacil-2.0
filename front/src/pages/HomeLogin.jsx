import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EscolhaCadastro.css'
import Cover from '../assets/images/cover.png';
import NavbarLogo from '../components/NavbarLogo';

function EscolhaLoginCadastro() {
  const navigate = useNavigate()

  return (
    <div className="containerAzul">
      <div>
        <NavbarLogo />

        <div className="container">
          <img className="direita" src={Cover} alt="" />

          <div className="esquerda login">
            <div className="espacamentoHome">
              <h1 className='poppins-semibold'>Falta pouco para economizar!</h1>
              <p className='paragrafo-verde'>Como deseja continuar?</p>
              <div className='container-buttons'>
                <button className="primary" onClick={() => navigate('/menuLogin')}>Já tem uma conta?</button>
                <button className="second" onClick={() => navigate('/menuCadastro')}>Criar nova conta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscolhaLoginCadastro