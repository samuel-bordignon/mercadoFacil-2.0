import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';
import './AddEndereco.css';

function AddEndereco() {
  // Acesso ao contexto
  const { enderecosdb, setEnderecosdb } = useContext(GlobalContext);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    numero: '',
    apelido: ''
  });

  // Estado para armazenar o índice do endereço que está sendo editado
  const [editIndex, setEditIndex] = useState(null);

  // Função para preencher o formulário com os dados do endereço selecionado para edição
  const handleEdit = (index) => {
    const endereco = enderecosdb[index];
    setFormData(endereco);
    setEditIndex(index); // Salva o índice do endereço que está sendo editado
  };

  // Função para atualizar o estado do formulário com os valores dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para salvar o endereço (criar novo ou atualizar existente)
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (editIndex !== null) {
      // Atualiza o endereço existente no array
      const updatedEnderecos = [...enderecosdb];
      updatedEnderecos[editIndex] = { ...formData, id: updatedEnderecos[editIndex].id }; // Manter o id
      setEnderecosdb(updatedEnderecos);
      setEditIndex(null); // Reseta o índice de edição
    } else {
      // Atualiza o endereço atual para false antes de adicionar um novo
      const updatedEnderecos = enderecosdb.map((endereco) => {
        return { ...endereco, atual: endereco.atual ? false : endereco.atual };
      });
  
      // Adiciona um novo endereço com atual como true
      setEnderecosdb([...updatedEnderecos, { ...formData, id: updatedEnderecos.length + 1, atual: true }]);
    }
  
    // Limpa o formulário após a submissão
    setFormData({
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
      apelido: ''
    });
  };
  
  // Função para cancelar a edição e limpar o formulário
  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
      apelido: ''
    });
  };

  // Função para deletar um endereço
  const handleDelete = () => {
    if (editIndex !== null) {
      const updatedEnderecos = enderecosdb.filter((_, index) => index !== editIndex);
      setEnderecosdb(updatedEnderecos);
      setEditIndex(null);
      setFormData({
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        numero: '',
        apelido: ''
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="conteiner">
        <div className="secao-formulario">
          <h2>{editIndex !== null ? 'Editar endereço' : 'Adicionar meu endereço'}</h2>
          {editIndex !== null && (
            <button className="botao-deletar" onClick={handleDelete}>
              Deletar
            </button>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="grupo-formulario input-pequeno">
                <label>Número</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="exemplo: XXXX"
                />
              </div>
              <div className="grupo-formulario input-grande">
                <label>Logradouro</label>
                <input
                  type="text"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  placeholder="exemplo: Rua/Av."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="grupo-formulario input-medio">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="XXXXX-XX"
                />
              </div>
              <div className="grupo-formulario input-medio">
                <label>Bairro</label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="grupo-formulario input-medio">
                <label>Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="exemplo: Apartamento"
                />
              </div>
              <div className="grupo-formulario input-medio">
                <label>Apelido</label>
                <input
                  type="text"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleChange}
                  placeholder="exemplo: Minha casa"
                />
              </div>
            </div>

            <div className="botoes-formulario">
              <button type="submit" className="botao-salvar">
                {editIndex !== null ? 'Atualizar endereço' : 'Salvar endereço'}
              </button>
              {editIndex !== null && (
                <button type="button" onClick={handleCancelEdit} className="botao-cancelar">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="enderecos-salvos">
          <h3>Endereços salvos</h3>
          <ul>
            {enderecosdb.map((endereco, index) => (
              
              <li key={index}>
                <div className="info-endereco">
                  <span>CEP: {endereco.cep}</span>
                  <p>Logradouro: {endereco.logradouro}, {endereco.numero}</p>
                  <p>Complemento: {endereco.complemento}</p>
                  <p>Bairro: {endereco.bairro}</p>
                </div>
                <span className="apelido-endereco">{endereco.apelido}</span>
                <button className="botao-editar" onClick={() => handleEdit(index)}>
                  Editar✏️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddEndereco;
