import './Sidebar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import { useContext } from 'react';
import PopUpWelcome from './PopUpWelcome';
import SelectTimeDay from './SelectTimeDay';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null); // Controla qual pop-up está ativo (welcome ou timeDay)
  const navigate = useNavigate();
  const { setLocalStorage, getLocalStorage } = useContext(GlobalContext);

  useEffect(() => {
    // Checar se o cadastro está concluído e se o pop-up já foi visto
    const cadastroConcluido = getLocalStorage('cadastroConcluido');
    const hasSeenWelcome = getLocalStorage('hasSeenWelcome');

    if (cadastroConcluido && !hasSeenWelcome) {
      setCurrentPopup('welcome'); // Exibe o pop-up se ainda não foi visto
    }
  }, []);

  // Fechar o PopUpWelcome e abrir o SelectTimeDay
  const handleWelcomeClose = () => {
    setLocalStorage('hasSeenWelcome', true); // Salva no localStorage que o PopUpWelcome foi visto
    setCurrentPopup('timeDay'); // Troca para o pop-up de horário
  };

  // Fechar o SelectTimeDay
  const closeTimeDayPopup = () => {
    setCurrentPopup(null); // Fecha o pop-up de horário
  };

  // Navegação entre itens do menu
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

  // Função de logout
  const logOut = () => {
    setLocalStorage('id_gerente', null);
    setLocalStorage('mercadoData', null);
    setLocalStorage('gerenteData', null);
    navigate('/');
  };

  return (
    <div id="sidebar-container">
      {/* Renderiza o PopUpWelcome somente se currentPopup for "welcome" */}
      {currentPopup === 'welcome' && <PopUpWelcome closeWelcome={handleWelcomeClose} />}
      {/* Renderiza o SelectTimeDay somente se currentPopup for "timeDay" */}
      {currentPopup === 'timeDay' && <SelectTimeDay closePopup={closeTimeDayPopup} />}

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
            <img src="./logOut.svg" alt="" className="log-out" />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
