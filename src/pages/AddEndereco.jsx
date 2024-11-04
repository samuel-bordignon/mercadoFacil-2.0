import React, { useState, useContext } from 'react';
import InputMask from 'react-input-mask'; // Importa o InputMask
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';
import './AddEndereco.css';

function AddEndereco() {
  const { enderecosdb, setEnderecosdb } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    numero: '',
    apelido: ''
  });

  const [editIndex, setEditIndex] = useState(null);
  const [formHeight, setFormHeight] = useState('700px'); // Estado para a altura do formulário

  const handleEdit = (index) => {
    const endereco = enderecosdb[index];
    setFormData(endereco);
    setEditIndex(index);
    setFormHeight('800px'); // Aumenta a altura ao editar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEnderecos = [...enderecosdb];
      updatedEnderecos[editIndex] = { ...formData, id: updatedEnderecos[editIndex].id };
      setEnderecosdb(updatedEnderecos);
      setEditIndex(null);
      setFormHeight('700px'); // Reseta a altura após salvar
    } else {
      const updatedEnderecos = enderecosdb.map((endereco) => {
        return { ...endereco, atual: endereco.atual ? false : endereco.atual };
      });
      setEnderecosdb([...updatedEnderecos, { ...formData, id: updatedEnderecos.length + 1, atual: true }]);
    }
    setFormData({
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
      apelido: ''
    });
  };

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
    setFormHeight('700px'); // Reseta a altura ao cancelar
  };

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
      setFormHeight('700px'); // Reseta a altura após deletar
    }
  };

  return (
    <div>
      <Navbar />
      <div className="conteiner">
        <div className="secao-formulario" style={{ height: formHeight }}>
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
                <InputMask
                  mask="99999-999"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="XXXXX-XXX"
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
