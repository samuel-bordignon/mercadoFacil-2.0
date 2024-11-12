import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './PerfilCliente.css'
import { GlobalContext } from '../contexts/GlobalContext'

function PerfilCliente() {
  const { clientedb, setClientedb} = useContext(GlobalContext)
  const [inputNome, setInputNome] = useState(clientedb.nome)
  const [inputCpf, setInputCpf] = useState(clientedb.cpf)
  const [inputDataNascimento, setInputDataNascimento] = useState(clientedb.dataNascimento)
  const [inputSenha, setInputSenha] = useState(clientedb.senha)
  const [inputTelefone, setInputTelefone] = useState(clientedb.telefone)
  const [inputEmail, setInputEmail] = useState(clientedb.email)
  const [activeBtn, setActiveBtn] = useState(null)

  console.log(clientedb)  
  const trocaBotao = (nomebtn) => {
    if (activeBtn === nomebtn) {
      setActiveBtn(null)
      //atualizaDados()
    } else {
      setActiveBtn(nomebtn)
    }
  }

  const atualizaDados = () => {
    if (activeBtn === 'pessoal') {
      setClientedb({
        ...clientedb,
        nome: inputNome,
        cpf: inputCpf,
        dataNascimento: inputDataNascimento,
        senha: inputSenha,
      })
    } else if (activeBtn === 'contato') {
      setClientedb({
        ...clientedb,
        telefone: inputTelefone,
        email: inputEmail,
      })
    } else if (activeBtn === 'endereco') {
      setClientedb({
        ...clientedb,
        endereco: {
          cep: inputCep,
          bairro: inputBairro,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento
        }
      })
    }
  }



  return (
    <div className='tela-usuario'>
      <Navbar />
      <div className='cabecario-perfil-usuario'>
        <h1>Informações da Conta</h1>
      </div>
      <div className='container-info'>
        <div className='cabecalio-info'>
          <h2>Informações Pessoais</h2>
          {activeBtn == 'pessoal' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
            <button onClick={() => (trocaBotao('pessoal'))}>editar</button>}
        </div>
        <div className='informacoes-detalhadas'>
          <label htmlFor='nome'>Nome</label><br />
          <input
            type="text"
            id="nome"
            value={inputNome}
            onChange={(e) => setInputNome(e.target.value)}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }}
          /><br />
          <hr />
          <label htmlFor='cpf'>CPF</label><br />
          <input
            type="text"
            id="cpf"
            value={inputCpf}
            onChange={(e) => setInputCpf(e.target.value)}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }}
          /><br />
          <hr />
          <label htmlFor='dataNascimento'>Data de Nascimento</label><br />
          <input
            type="date"
            id="dataNascimento"
            value={inputDataNascimento}
            onChange={(e) => setInputDataNascimento(e.target.value)}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }}
          /><br />
          <hr />
          <label htmlFor='senha'>Senha</label><br />
          <input
            type="password"
            id="senha"
            value={inputSenha}
            onChange={(e) => setInputSenha(e.target.value)}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }}
          /><br />
          <hr />
        </div>

        <div className='container-contato'>
          <div className="cabecario-contato">
            <h2>Contato</h2>
            {activeBtn == 'contato' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
              <button onClick={() => (trocaBotao('contato'))}>editar</button>}
          </div>
          <div className='informacoes-detalhadas-contato'>
            <label htmlFor='telefone'>Telefone</label><br />
            <input
              type="text"
              id="telefone"
              value={inputTelefone}
              onChange={(e) => setInputTelefone(e.target.value)}
              disabled={activeBtn != 'contato'}
              style={{ color: activeBtn == "contato" && activeBtn ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='email'>Email</label><br />
            <input
              type="email"
              id="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              disabled={activeBtn != 'contato'}
              style={{ color: activeBtn == "contato" && activeBtn ? "black" : "gray" }}
            /><br />
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilCliente
