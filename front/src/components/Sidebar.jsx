import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import { useContext } from 'react';
import PopUpWelcome from './PopUpWelcome'; // Importe o componente PopUpWelcome

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false); // Estado inicial como falso
  const navigate = useNavigate();
  const { setLocalStorage, getLocalStorage } = useContext(GlobalContext);

  useEffect(() => {
    // Verifica no localStorage se o pop-up já foi exibido ou se o cadastro foi concluído
    
    const cadastroConcluido = getLocalStorage('cadastroConcluido');
    const hasSeenWelcome = getLocalStorage('hasSeenWelcome');
    if (hasSeenWelcome && cadastroConcluido) {
      setShowWelcome(true); // Exibe o pop-up se o cadastro foi concluído e o pop-up ainda não foi visto
      console.log('mstrou o pop-up');
    }
  }, []);

  // Função para fechar o pop-up de boas-vindas
  const closeWelcomePopup = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'false'); // Salva no localStorage que o pop-up já foi exibido
  };



  // Função para navegação
  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === 'gerente') {
      navigate('/perfilGerente');
    } else if (item === 'mercado') {
      navigate('/perfilMercado');
    } else if (item === 'estoque') {
      navigate('/mercadoEstoque');
    }
  };

  const logOut = () => {
    setLocalStorage('id_gerente', null)
    setLocalStorage('MercadoData', null)
    setLocalStorage('GerenteData', null)
    setLocalStorage('EnderecoMercadoData', null)

    navigate('/');
  }

  return (
    <div id="sidebar-container">
      {showWelcome && <PopUpWelcome closeWelcome={closeWelcomePopup} />} {/* Renderiza o PopUpWelcome se showWelcome for true */}

      <nav id="sidebar">
        <div id="sidebar_content">
          <ul id="side_items">
            <div className="icon-Top">
              <img className="icon-mercado" src="iconsidebar.svg" alt="Ícone Sidebar" />
            </div>
            <li
              className={`side-item ${activeItem === 'estoque' ? 'active' : ''}`}
              onClick={() => handleItemClick('estoque')}
            >
              <i className="bi bi-box-seam fa-2x"></i>
              <span>Estoque</span>
            </li>
            <li
              className={`side-item ${activeItem === 'mercado' ? 'active' : ''}`}
              onClick={() => handleItemClick('mercado')}
            >
              <i className="bi bi-shop fa-2x"></i>
              <span>Mercado</span>
            </li>
            <li
              className={`side-item ${activeItem === 'gerente' ? 'active' : ''}`}
              onClick={() => handleItemClick('gerente')}
            >
              <i className="bi bi-person fa-2x"></i>
              <span>Gerente</span>
            </li>
          </ul>
        </div>

        <div id="logout">
          <button id="logout_btn" onClick={() => logOut()}>
            <img src="./logOut.svg" alt="" className='log-out' />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
