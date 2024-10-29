import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './AddEndereco.css';

function AddEndereco() {
  // Array de objetos contendo os dados dos endereços
  const [enderecosEdit, setEnderecosEdit] = useState([
    {
      cep: '88010-001',
      complemento: 'Apto 202',
      bairro: 'Centro',
      endereco: 'Rua Felipe Schmidt, 123',
      apelido: 'Minha Casa'
    },
    {
      cep: '88030-200',
      complemento: 'Bloco B',
      bairro: 'Trindade',
      endereco: 'Avenida Madre Benvenuta, 555',
      apelido: 'Escritório'
    },
    {
      cep: '88040-500',
      complemento: 'Casa 1',
      bairro: 'Itacorubi',
      endereco: 'Servidão Rosa, 90',
      apelido: 'Casa de Praia'
    }
  ]);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    cep: '',
    complemento: '',
    bairro: '',
    endereco: '',
    apelido: ''
  });

  // Estado para armazenar o índice do endereço que está sendo editado
  const [editIndex, setEditIndex] = useState(null);

  // Função para preencher o formulário com os dados do endereço selecionado para edição
  const handleEdit = (index) => {
    setFormData(enderecosEdit[index]);
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
      const updatedEnderecos = [...enderecosEdit];
      updatedEnderecos[editIndex] = formData;
      setEnderecosEdit(updatedEnderecos);
      setEditIndex(null); // Reseta o índice de edição
    } else {
      // Adiciona um novo endereço
      setEnderecosEdit([...enderecosEdit, formData]);
    }

    // Limpa o formulário após a submissão
    setFormData({
      cep: '',
      complemento: '',
      bairro: '',
      endereco: '',
      apelido: ''
    });
  };

  // Função para cancelar a edição e limpar o formulário
  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({
      cep: '',
      complemento: '',
      bairro: '',
      endereco: '',
      apelido: ''
    });
  };

  // Função para deletar um endereço
  const handleDelete = () => {
    if (editIndex !== null) {
      const updatedEnderecos = enderecosEdit.filter((_, index) => index !== editIndex);
      setEnderecosEdit(updatedEnderecos);
      setEditIndex(null);
      setFormData({
        cep: '',
        complemento: '',
        bairro: '',
        endereco: '',
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
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="exemplo: Rua XYZ"
                />
              </div>
              <div className="grupo-formulario input-grande">
                <label>Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Apartamento/Bloco/Casa"
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

            <div className="grupo-formulario">
              <label>Apelidar seu endereço</label>
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleChange}
                placeholder="exemplo: Minha casa"
                className="input-grande"
              />
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
            {enderecosEdit.map((endereco, index) => (
              <li key={index}>
                <div className="info-endereco">
                  <span>CEP: {endereco.cep}</span>
                  <p>Complemento: {endereco.complemento}</p>
                  <p>Bairro: {endereco.bairro}</p>
                  <p>Endereço: {endereco.endereco}</p>
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
