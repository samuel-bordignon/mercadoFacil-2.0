import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <nav id="sidebar">
            <div id="sidebar_content">
                <ul id="side_items">
                    <div className="icon-Top">
                        <img className="icon-mercado" src="iconsidebar.svg" alt="" />
                    </div>
                    <li
                        className={`side-item ${activeItem === 'Estoque' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Estoque')}
                    >
                        <i className="bi bi-box-seam fa-2x"></i>
                        <span>Estoque</span>
                    </li>
                    <li
                        className={`side-item ${activeItem === 'Mercado' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Mercado')}
                    >
                        <i className="bi bi-shop fa-2x"></i>
                        <span>Mercado</span>
                    </li>
                    <li
                        className={`side-item ${activeItem === 'Gerente' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Gerente')}
                    >
                        <i className="bi bi-person-circle fa-2x"></i>
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
    );
};

export default Sidebar;
