import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './PerfilCliente.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { div } from 'framer-motion/client'

function PerfilCliente() {
  const { usuariodb, setUsuariodb } = useContext(GlobalContext)
  const [inputNome, setInputNome] = useState(usuariodb.nome)
  const [inputCpf, setInputCpf] = useState(usuariodb.cpf)
  const [inputDataNascimento, setInputDataNascimento] = useState(usuariodb.dataNascimento)
  const [inputSenha, setInputSenha] = useState(usuariodb.senha)
  const [inputTelefone, setInputTelefone] = useState(usuariodb.telefone)
  const [inputEmail, setInputEmail] = useState(usuariodb.email)
  const [inputCep, setInputCep] = useState(usuariodb.endereco.cep)
  const [inputBairro, setInputBairro] = useState(usuariodb.endereco.bairro)
  const [inputLogradouro, setInputLogradouro] = useState(usuariodb.endereco.logradouro)
  const [inputNumero, setInputNumero] = useState(usuariodb.endereco.numero)
  const [inputComplemento, setInputComplemento] = useState(usuariodb.endereco.complemento)
  const [activeBtn, setActiveBtn] = useState(null)

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
      setUsuariodb({
        ...usuariodb,
        nome: inputNome,
        cpf: inputCpf,
        dataNascimento: inputDataNascimento,
        senha: inputSenha,
      })
    } else if (activeBtn === 'contato') {
      setUsuariodb({
        ...usuariodb,
        telefone: inputTelefone,
        email: inputEmail,
      })
    } else if (activeBtn === 'endereco') {
      setUsuariodb({
        ...usuariodb,
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

          <div className='container-endereco'>
            <div className='cabecario-endereco'>
              <h2>Endereço</h2>
              {activeBtn == 'endereco' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
                <button onClick={() => (trocaBotao('endereco'))}>editar</button>}
            </div>
            <div className='informacoes-detalhadas-endereco'>
              <label htmlFor='cep'>CEP</label><br />
              <input
                type="text"
                id="cep"
                value={inputCep}
                onChange={(e) => setInputCep(e.target.value)}
                disabled={activeBtn != 'endereco'}
                style={{ color: activeBtn == "endereco" && activeBtn ? "black" : "gray" }}
              /><br />
              <hr />
              <label htmlFor='bairro'>Bairro</label><br />
              <input
                type="text"
                id="bairro"
                value={inputBairro}
                onChange={(e) => setInputBairro(e.target.value)}
                disabled={activeBtn != 'endereco'}
                style={{ color: activeBtn == "endereco" && activeBtn ? "black" : "gray" }}
              /><br />
              <hr />
              <label htmlFor='logradouro'>Logradouro</label><br />
              <input
                type="text"
                id="logradouro"
                value={inputLogradouro}
                onChange={(e) => setInputLogradouro(e.target.value)}
                disabled={activeBtn != 'endereco'}
                style={{ color: activeBtn == "endereco" && activeBtn ? "black" : "gray" }}
              /><br />
              <hr />
              <label htmlFor='numero'>Número</label><br />
              <input
                type="text"
                id="numero"
                value={inputNumero}
                onChange={(e) => setInputNumero(e.target.value)}
                disabled={activeBtn != 'endereco'}
                style={{ color: activeBtn == "endereco" && activeBtn ? "black" : "gray" }}
              /><br />
              <hr />
              <label htmlFor='complemento'>Complemento</label><br />
              <input
                type="text"
                id="complemento"
                value={inputComplemento}
                onChange={(e) => setInputComplemento(e.target.value)}
                disabled={activeBtn != 'endereco'}
                style={{ color: activeBtn == "endereco" && activeBtn ? "black" : "gray" }}
              /><br />
              <hr />
            </div>
          </div>
        </div>
      </div>
      <button className='excluir-conta-usuario'>Excluir conta</button>
      {
        // <div>
        //   <h1>{usuariodb.nome}</h1>
        //   <p>{usuariodb.cpf}</p>
        //   <p>{usuariodb.dataNascimento}</p>
        //   <p>{usuariodb.senha}</p>
        //   <p>{usuariodb.telefone}</p>
        //   <p>{usuariodb.email}</p>
        //   <p>{usuariodb.endereco.cep}</p>
        //   <p>{usuariodb.endereco.bairro}</p>
        //   <p>{usuariodb.endereco.logradouro}</p>
        //   <p>{usuariodb.endereco.numero}</p>
        //   <p>{usuariodb.endereco.complemento}</p>
        // </div>
      }
    </div>
  )
}

export default PerfilCliente
