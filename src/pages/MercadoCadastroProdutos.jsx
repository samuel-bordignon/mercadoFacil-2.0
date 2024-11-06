import React from 'react';
import Sidebar from '../components/Sidebar';
import './MercadoCadastroProdutos.css';

function MercadoCadastroProdutos() {
  return (
    <div>
      <Sidebar />
      <div className='container-CadastroProdutos'>
        <div className='titulo'>
          <h1>Novo Produto</h1>
        </div>
        <div className="container-formulario">
          <div className="container-vitrine">
            
            <div className="container-image">
                <div className='imagemProduto'>
                    <img src="" alt="" />
                </div>
            </div>
            <h2 className='titulo-vitrine'>Vitrine</h2>
            <p>Nome do Produto</p>
            <input type="text" placeholder="Ex: Banana Prata" />
            <p>Descrição</p>
            <input type="text" placeholder="Ex: 10 Litros" />
            <p>Preço de venda</p>
            <input type="text" placeholder="Preço de Venda" />
          </div>

          <div className="container-detalhes">
            <h2>Detalhes</h2>
            <input type="text" placeholder="Código do Produto" />
            <input type="text" placeholder="Categoria" />
            <input type="text" placeholder="Estoque" />
            <div className="botoes">
              <button className="salvar">Salvar Alterações</button>
              <button className="cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MercadoCadastroProdutos;
