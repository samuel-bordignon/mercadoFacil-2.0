import React from 'react'
import './Perfilgerente.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'

function PerfilGerente() {
    const { gerentedb, setGerentedb, enderecosdb, setEnderecosdb, } = useContext(GlobalContext)
    const [inputNome, setInputNome] = useState(gerentedb.nome)
    const [inputCpf, setInputCpf] = useState(gerentedb.cpf)
    const [inputDataNascimento, setInputDataNascimento] = useState(gerentedb.dataNascimento)
    const [inputSenha, setInputSenha] = useState(gerentedb.senha)
    const [inputTelefone, setInputTelefone] = useState(gerentedb.telefone)
    const [inputEmail, setInputEmail] = useState(gerentedb.email)
    const [activeBtn, setActiveBtn] = useState(null)
    const [popPupAtivo, setPopPupAtivo] = useState(false)
  
    console.log(gerentedb)  
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
        setGerentedb({
          ...gerentedb,
          nome: inputNome,
          cpf: inputCpf,
          dataNascimento: inputDataNascimento,
          senha: inputSenha,
        })
      } else if (activeBtn === 'contato') {
        setGerentedb({
          ...gerentedb,
          telefone: inputTelefone,
          email: inputEmail,
        })
      }
    }
  

  return (
    <div>
    <Sidebar />
        <div className='tela-gerente'>

        <div className='cabecario-perfil-gerente'>
          <h1>Perfil Mercado</h1>
        </div>
        <div className='container-info-gerente'>
          <div className='cabecalio-info-gerente'>
            <h2>Informações Mercado</h2>
            {activeBtn == 'pessoal' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))}>editar</button>}
          </div>
          <div className='informacoes-detalhadas-gerente'>
            <label htmlFor='nome'>Nome do Mercado</label><br />
            <input
              type="text"
              id="nome"
              value={inputNome}
              onChange={(e) => setInputNome(e.target.value)}
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='cpf'>CPF</label><br />
            <input
              type="text"
              id="cpf"
              value={inputCpf}
              onChange={(e) => setInputCpf(e.target.value)}
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='senha'>Senha</label><br />
            <input
              type="password"
              id="senha"
              value={inputSenha}
              onChange={(e) => setInputSenha(e.target.value)}
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
            /><br />
            <hr />
          </div>
        </div>


        <div className='container-contato-gerente'>
          <div className="cabecario-contato-gerente">
            <h2>Contato</h2>
            {activeBtn == 'contato' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
              <button onClick={() => (trocaBotao('contato'))}>editar</button>}
          </div>
          <div className='informacoes-detalhadas-contato-gerente'>
            <label htmlFor='telefone'>Telefone</label><br />
            <input
              type="text"
              id="telefone"
              value={inputTelefone}
              onChange={(e) => setInputTelefone(e.target.value)}
              disabled={activeBtn !== 'contato'}
              style={{ color: activeBtn === "contato" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='email'>E-mail Empresarial</label><br />
            <input
              type="email"
              id="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              disabled={activeBtn !== 'contato'}
              style={{ color: activeBtn === "contato" ? "black" : "gray" }}
              /><br />
              <hr />
            </div>
          </div>
        </div>
        <button className='excluirConta-gerente' onClick={()=>( setPopPupAtivo(!popPupAtivo))}>Excluir conta</button>
      {popPupAtivo && <div className='overlay-pop' onClick={()=>( setPopPupAtivo(!popPupAtivo))}>
        <div className='pop-container-ger'>
          <i class="bi bi-chevron-left"></i>
          <h2>Excluir Conta</h2>
          <p>Você tem certeza que deseja excluir sua conta? </p>
          <button className='botao-excluir-ger'>Excluir</button>
          <button className='botao-cancelar-ger'>Cancelar</button>
          </div>
          </div>}
      </div>
  )
}

export default PerfilGerente
