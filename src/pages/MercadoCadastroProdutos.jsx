import React, { useState, useContext } from 'react';
// import Select from 'react-select';
import Sidebar from '../components/Sidebar';
import './MercadoCadastroProdutos.css';
import { GlobalContext } from '../contexts/GlobalContext';

function MercadoCadastroProdutos() {
  const { categoryOptions } = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(''); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleDivClick = () => {
    document.getElementById('file-input').click();
  };

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = (Number(value) / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = `R$ ${value}`;
    setPrice(value);
  };

  return (
    <div>
      <Sidebar />
      <div className='container-CadastroProdutos'>
        <div className='titulo'>
          <h1>Novo Produto</h1>
        </div>
        <div className="container-formulario">
          <div className="container-vitrine">
            <div className="container-image" onClick={handleDivClick}> 
              <div className='imagemProduto'>
                {image ? (
                  <img
                    src={image} 
                    alt="Imagem carregada"
                    style={{ maxWidth: '100%' }}
                  />
                ) : (
                  <p>Clique para adicionar uma imagem</p>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
              />
            </div>

            <h2 className='titulo-vitrine'>Vitrine</h2>
            <p>Nome do Produto</p>
            <input type="text" placeholder="Ex: Banana Prata" />
            <p>Descrição</p>
            <input type="text" placeholder="Ex: 10 Litros" />
            <p>Preço de venda</p>
            <input
              type="text"
              placeholder="Preço de Venda"
              value={price} 
              onChange={handlePriceChange} 
            />
          </div>

          <div className="container-detalhes">
            <h2>Detalhes</h2>
            <p>Código do Produto</p>
            <input type="text" placeholder="Ex: 12345-67890" />

            <p>Categoria</p>
            <Select
              options={categoryOptions}               
              isMulti                                  
              placeholder="Buscar por palavra-chave"
              onChange={(selected) => setSelectedCategories(selected)}
              value={selectedCategories}               
              className="select-category"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 160, 
                  overflowY: 'auto',
                }),
              }}
            />

            <p>Estoque</p>
            <input type="text" placeholder="Ex: 12345-67890" />
            <div className='borda-botoes'>
              <div className="botoes">
                <button className="salvar">Salvar Alterações</button>
                <button className="cancelar">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MercadoCadastroProdutos;
