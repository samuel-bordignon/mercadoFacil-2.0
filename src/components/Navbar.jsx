import { NavLink, useLocation } from "react-router-dom"
import './Navbar.css'
import SearchBar from "./SearchBar"

function Navbar() {
  // Obtém o caminho atual
  const location = useLocation();

  return (
    <div class="navbar">
      {/* Container Esquerdo */}
      <div id="container-esquerdo-nav">
        <div id="logo-container">
          <img src="logoNome.svg" alt="Logo" class="logo" />
        </div>
        <div id="links-container">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Mercados
          </NavLink>
          <NavLink
            to="/ListaCompras"
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            Lista de Compras
          </NavLink>
        </div>
      </div>

      {/* Container Central */}
      <div id="container-centro-nav">
        {/* Somente renderiza o SearchBar se NÃO estiver na página de Lista de Compras */}
        {location.pathname !== '/ListaCompras' && <SearchBar />}
      </div>

      {/* Container Direito */}
      <div id="container-direito-nav">
        <button id="address-button">
          <div class="address-container">
            <span class="address-text">
              Servidão Nossa Sr. Aparecida, <span class="address-number">84</span>
            </span>
            <img src="flecha.svg" alt="Flecha" class="arrow-icon" />
          </div>
        </button>

        <div id="user-cart-container">
          {/* Botão Usuário */}
          <button class="user-button">
            <img src="User.svg" alt="Usuário" class="user-icon" />
          </button>

          {/* Botão Carrinho */}
          <button class="cart-button">
            <img src="Order.svg" alt="Carrinho de Compras" class="cart-icon" />
            <div className="span-container">
              <span class="cart-total">R$ 00,00</span>
              <span class="cart-items">
                <span class="item-count">0</span> itens
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
