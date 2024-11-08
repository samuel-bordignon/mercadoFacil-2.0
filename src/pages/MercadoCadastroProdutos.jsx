import React, { useState, useContext } from 'react';
import Select from 'react-select';
import Sidebar from '../components/Sidebar';
import './MercadoCadastroProdutos.css';
import { GlobalContext } from '../contexts/GlobalContext';

function MercadoCadastroProdutos() {
  // Acessa o contexto global para obter categorias e produtos, e a função para atualizar produtos
  const { categoryOptions, produtosdb, setProdutosdb } = useContext(GlobalContext);

  // Define estados iniciais para dados do formulário, imagem, categorias, índice de edição e preço formatado
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    informacaoAdicional: '',
    quantidade: '',
    imagem: '',
    codigoProduto: '',
    categoria: []
  });

  const [image, setImage] = useState(null); // Armazena a imagem carregada
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const [price, setPrice] = useState(''); 

  // Função para manipular o upload da imagem
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtém o arquivo selecionado
    if (file) {
      const reader = new FileReader(); // Cria um leitor de arquivos
      reader.onloadend = () => {
        setImage(reader.result); // Define a imagem para exibição
        setFormData((prevData) => ({
          ...prevData,
          imagem: reader.result, 
        }));
      };
      reader.readAsDataURL(file); // Converte o arquivo em uma URL base64
    }
  };

  // Simula o clique no input de arquivo para abrir o seletor de arquivos
  const handleDivClick = () => {
    document.getElementById('file-input').click(); // Abre o seletor de arquivos
  };

  // Função para formatar e atualizar o preço ao digitar
  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = (Number(value) / 100).toFixed(2) + ''; // Converte para formato de moeda com duas casas decimais
    value = value.replace('.', ','); // Substitui ponto por vírgula
    value = `R$ ${value}`; 
    setPrice(value); 
    setFormData((prevData) => ({
      ...prevData,
      preco: value, 
    }));
  };

  // Função para atualizar o estado formData com o valor do campo alterado
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Atualiza o campo correspondente em formData
    }));
  };

  // Função para manipular a seleção de categorias
  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFormData((prevData) => ({
      ...prevData,
      categoria: selected.map((cat) => cat.value), // Atualiza o campo 'categoria' em formData com os valores selecionados
    }));
  };

  // Função para salvar ou atualizar o produto ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página ao enviar o formulário
    if (editIndex !== null) {
      const updatedProdutos = [...produtosdb]; // Cria uma cópia do banco de dados de produtos
      updatedProdutos[editIndex] = { ...formData, id: updatedProdutos[editIndex].id }; 
      setProdutosdb(updatedProdutos); 
      setEditIndex(null); 
    } else {
      // Se não estiver editando, cria um novo produto
      const newProduct = {
        ...formData,
        id: produtosdb.length + 1, // Gera um novo ID com base no tamanho da lista
      };
      setProdutosdb([...produtosdb, newProduct]); // Adiciona o novo produto ao banco de dados
    }
    // Reseta o formulário para os valores iniciais
    setFormData({
      nome: '',
      preco: '',
      informacaoAdicional: '',
      quantidade: '',
      imagem: '',
      codigoProduto: '',
      categoria: []
    });
    setSelectedCategories([]); 
    setImage(null); 
    setPrice(''); 
  };

  // Função para cancelar a edição de um produto e limpar o formulário
  const handleCancelEdit = () => {
    setEditIndex(null); // Reseta o índice de edição para modo de novo produto
    setFormData({
      nome: '',
      preco: '',
      informacaoAdicional: '',
      quantidade: '',
      imagem: '',
      codigoProduto: '',
      categoria: []
    });
    setSelectedCategories([]); // Limpa as categorias selecionadas
    setImage(null); // Remove a imagem
    setPrice(''); // Limpa o preço formatado
  };

  return (
    <div>
      <Sidebar />
      <div className='container-CadastroProdutos'>
        <div className='titulo'>
          <h1>{editIndex !== null ? 'Editar Produto' : 'Novo Produto'}</h1> {/* Exibe título de acordo com o modo */}
        </div>
        <form onSubmit={handleSubmit}> {/* Formulário para salvar/atualizar produto */}
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
              />
              <p>Descrição</p>
              <input
                type="text"
                name="informacaoAdicional"
                placeholder="Ex: 10 Litros"
                value={formData.informacaoAdicional}
                onChange={handleChange}
              />
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
              <input
                type="text"
                name="codigoProduto"
                placeholder="Ex: 12345-67890"
                value={formData.codigoProduto}
                onChange={handleChange}
              />

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
                }}
              />

              <p>Estoque</p>
              <input
                type="text"
                name="quantidade"
                placeholder="Quantidade em estoque"
                value={formData.quantidade}
                onChange={handleChange}
              />
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
