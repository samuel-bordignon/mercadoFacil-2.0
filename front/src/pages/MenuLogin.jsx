import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EscolhaCadastro.css';
import Cover from '../assets/images/cover.png';
import NavbarLogo from '../components/NavbarLogo';
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem

function EscolhaLogin() {
  const navigate = useNavigate();

  return (
    <div className="containerAzul">

      <div>
        <NavbarLogo />

        <div className="container">
          <img className="direita" src={Cover} alt="Cover" />

          <div className="esquerda login">
            <div className="espacamentoHome">
              <div className="caebecario-cad" >
                <h1 className='poppins-semibold'>Falta pouco para economizar!</h1>
                <button className="btn-cadastro">
                  <img
                    className="botao-voltarCliente"
                    onClick={() => navigate('/')}
                    src={Voltar}
                    alt="Botão voltar"
                  />
                </button>

              </div>
              <p className='paragrafo-verde'>Como deseja continuar?</p>
              <div className='container-buttons'>
                <button className="primary" onClick={() => navigate('/loginParceiro')}>Sou parceiro</button>
                <button className="second" onClick={() => navigate('/loginCliente')}>Sou cliente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EscolhaLogin;
