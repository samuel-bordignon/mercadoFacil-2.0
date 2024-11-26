import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUpWelcome from './PopUpWelcome'; // Importe o componente PopUpWelcome

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true); // Estado para controlar a exibição do pop-up
  const navigate = useNavigate();

  // Função para fechar o pop-up de boas-vindas
  const closeWelcomePopup = () => {
    setShowWelcome(false); // Altera o estado para fechar o pop-up
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
          <button id="logout_btn">
            <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
