import React, { useState, useContext } from 'react';
import Select from 'react-select';
import Sidebar from '../components/Sidebar';
import './MercadoCadastroProdutos.css';
import { GlobalContext } from '../contexts/GlobalContext';
import InputMask from 'react-input-mask';

function MercadoCadastroProdutos() {
  const { categoryOptions, produtosdb, setProdutosdb, unidadeOptions, } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    informacaoAdicional: '',
    quantidade: '',
    unidade: '', // Adicionado campo de unidade
    imagem: '',
    codigoProduto: '',
    categoria: []
  });

  const [image, setImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  // Lista de opções de unidades de medida

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          imagem: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    document.getElementById('file-input').click();
  };

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value) {
      value = (Number(value) / 100).toFixed(2);
    }
    setPrice(value);
    setFormData((prevData) => ({
      ...prevData,
      preco: value ? Number(value) : '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFormData((prevData) => ({
      ...prevData,
      categoria: selected.map((cat) => cat.value),
    }));
  };

  const handleUnidadeChange = (selected) => {
    setFormData((prevData) => ({
      ...prevData,
      unidade: selected.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.preco) newErrors.preco = 'Preço é obrigatório';
    if (!formData.codigoProduto) newErrors.codigoProduto = 'Código do produto é obrigatório';
    if (!formData.categoria.length) newErrors.categoria = 'Selecione ao menos uma categoria';
    if (!formData.quantidade) newErrors.quantidade = 'Estoque é obrigatório';
    if (!formData.unidade) newErrors.unidade = 'Unidade é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (editIndex !== null) {
      const updatedProdutos = [...produtosdb];
      updatedProdutos[editIndex] = { ...formData, id: updatedProdutos[editIndex].id };
      setProdutosdb(updatedProdutos);
      setEditIndex(null);
    } else {
      const newProduct = {
        ...formData,
        id: produtosdb.length + 1,
      };
      setProdutosdb([...produtosdb, newProduct]);
    }

    setFormData({
      nome: '',
      preco: '',
      informacaoAdicional: '',
      quantidade: '',
      unidade: '',
      imagem: '',
      codigoProduto: '',
      categoria: []
    });
    setSelectedCategories([]);
    setImage(null);
    setPrice('');
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({
      nome: '',
      preco: '',
      informacaoAdicional: '',
      quantidade: '',
      unidade: '',
      imagem: '',
      codigoProduto: '',
      categoria: []
    });
    setSelectedCategories([]);
    setImage(null);
    setPrice('');
    setErrors({});
  };

  return (
    <div>
      <Sidebar />
      <div className='container-CadastroProdutos'>
        <div className='titulo'>
          <h1>{editIndex !== null ? 'Editar Produto' : 'Novo Produto'}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="container-formulario">
            <div className="container-vitrine">
              <div className="container-image" onClick={handleDivClick}>
                <div className='imagemProduto'>
                  {image ? (
                    <img src={image} alt="Imagem carregada" style={{ maxWidth: '100%' }} />
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
              <input
                type="text"
                name="nome"
                placeholder="Ex: Banana Prata"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''} />
              {errors.nome && <span className="error">{errors.nome}</span>}

              <p>Descrição</p>
              <input
                type="text"
                name="informacaoAdicional"
                placeholder="Ex: 500g"
                value={formData.informacaoAdicional}
                onChange={handleChange}
              />

              <p>Preço de venda</p>
              <input
                type="text"
                placeholder="Preço de Venda"
                value={price ? `R$ ${price.replace('.', ',')}` : ''}
                onChange={handlePriceChange}
                className={errors.preco ? 'error' : ''} />
              {errors.preco && <span className="error">{errors.preco}</span>}
            </div>

            <div className="container-detalhes">
              <h2>Detalhes</h2>
              <p>Código do Produto</p>
              <InputMask
                mask="9999999999999"
                type="text"
                name="codigoProduto"
                placeholder="Ex: 1234567890"
                value={formData.codigoProduto}
                onChange={handleChange}
                className={errors.codigoProduto ? 'error' : ''} />
              {errors.codigoProduto && <span className="error">{errors.codigoProduto}</span>}

              <p>Categoria</p>
              <Select
                options={categoryOptions}
                isMulti
                placeholder="Buscar por palavra-chave"
                onChange={handleCategoryChange}
                value={selectedCategories}
                className="select-category"
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: 160,
                    overflowY: 'auto',
                  }),
                }} />
              {errors.categoria && <span className="error">{errors.categoria}</span>}

              <p>Estoque</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="text"
                  name="quantidade"
                  placeholder="Quantidade em estoque"
                  value={formData.quantidade}
                  onChange={handleChange}
                  className={errors.quantidade ? 'error' : ''} />
              </div>
              {errors.quantidade && <span className="error">{errors.quantidade}</span>}

              <p>Unidade de medida</p>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>

                <input 
                  type="text"
                  name="valorUnidade"
                  placeholder="Valor"
                  value={formData.valorUnidade}
                  onChange={handleChange}
                  className={errors.valorUnidade ? 'error' : ''} />

                <Select
                options={unidadeOptions}
                placeholder="Unidade"
                onChange={handleUnidadeChange}
                value={unidadeOptions.find((option) => option.value === formData.unidade)}
                className="select-unidade"
                style={{ minWidth: '150px', width: 'auto' }}/>
                </div>
            

              {errors.unidade && <span className="error">{errors.unidade}</span>}

              <div className='borda-botoes'>
                <div className="botoes">
                  <button type="submit" className="salvar">Salvar Alterações</button>
                  <button type="button" className="cancelar" onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MercadoCadastroProdutos;
