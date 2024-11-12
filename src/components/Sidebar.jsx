import './Sidebar.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate()

    //Faz a navegação para outras paginas pela sidebar
    const handleItemClick = (item) => {
        setActiveItem(item);
        if(item == 'gerente'){
            navigate('/cadastroProdutos')
        }else if(item == 'mercado'){
            navigate('/cadastroProdutos')
        }else if(item == 'estoque'){
            navigate('/mercadoEstoque')
            
        }
    };

    return (

        <nav id="sidebar">
            <div id="sidebar_content">
                <ul id="side_items">
                    <div className="icon-Top">
                        <img className="icon-mercado" src="iconsidebar.svg" alt="" />
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
