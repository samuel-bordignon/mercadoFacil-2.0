import { Link } from "react-router-dom"
import './Navbar.css'
function Navbar() {
  return (
    <nav class="navbar">
      <div id="logo-container">
        <img src="logo.png" alt="Logo" class="logo" />
      </div>

      <div id="links-container">
        <Link to="/" className="nav-link">Mercados</Link>
        <Link to="/ListaCompras" className="nav-link">Lista de compras</Link>
      </div>

      <div id="search-bar">
        <img src="Search.svg" alt="Buscar" class="search-icon" />
        <input type="text" placeholder="Busque por mercados" class="search-input" />
      </div>

      <button id="address-button">
        <div class="address-container">
          <span class="address-text">Servidão Nossa Sr. Aparecida, <span class="address-number">84</span></span>
          <img src="flecha.svg" alt="Flecha" class="arrow-icon" />
        </div>
      </button>

      <div id="user-cart-container">
        <button class="user-button">
          <img src="User.svg" alt="Usuário" class="user-icon" />
        </button>

        <button class="cart-button">
          <img src="Order.svg" alt="Carrinho de Compras" class="cart-icon" />
          <div className="span-container">
            <span class="cart-total">R$ 00,00</span>
            <span class="cart-items"><span class="item-count">0</span> itens</span>
          </div>
        </button>
      </div>
    </nav>


  )
}

export default Navbar
