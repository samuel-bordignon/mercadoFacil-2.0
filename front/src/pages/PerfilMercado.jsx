import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { GlobalContext } from '../contexts/GlobalContext'
import './PerfilMercado.css'

function PerfilMercado() {
  // Garantir que mercadosdb tenha um valor padrão (fallback)
  const { mercadosdb, setMercadosdb, enderecosdb, setEnderecosdb } = useContext(GlobalContext)

  const [inputNome, setInputNome] = useState(mercadosdb[0].nome)
  const [inputCnpj, setInputCnpj] = useState(mercadosdb[0].cnpj)
  const [inputSenha, setInputSenha] = useState(mercadosdb[0].senha)
  const [inputTelefone, setInputTelefone] = useState(mercadosdb[0].telefone)
  const [inputEmail, setInputEmail] = useState(mercadosdb[0].email)

  // Trabalhando com o endereço
  const [objetoEndereco, setObjetoEndereco] = useState(enderecosdb?.find(endereco => endereco.atual === true) || {})
  const [inputCep, setInputCep] = useState(objetoEndereco?.cep || '')
  const [inputBairro, setInputBairro] = useState(objetoEndereco?.bairro || '')
  const [inputLogradouro, setInputLogradouro] = useState(objetoEndereco?.logradouro || '')
  const [inputNumero, setInputNumero] = useState(objetoEndereco?.numero || '')
  const [inputComplemento, setInputComplemento] = useState(objetoEndereco?.complemento || '')
  const [activeBtn, setActiveBtn] = useState(null)
  const [popPupAtivo, setPopPupAtivo] = useState(false)

  const trocaBotao = (nomebtn) => {
    if (activeBtn === nomebtn) {
      setActiveBtn(null)
    } else {
      setActiveBtn(nomebtn)
    }
  }

  const atualizaDados = () => {
    if (activeBtn === 'pessoal') {
      setMercadosdb({
        ...mercadosdb,
        nome: inputNome,
        cnpj: inputCnpj,
        senha: inputSenha,
      })
    } else if (activeBtn === 'contato') {
      setMercadosdb({
        ...mercadosdb,
        telefone: inputTelefone,
        email: inputEmail,
      })
    } else if (activeBtn === 'endereco') {
      setMercadosdb({
        ...mercadosdb,
        endereco: {
          cep: inputCep,
          bairro: inputBairro,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento,
        },
      })
    }
  }

  return (
    <div>
    <Sidebar />
        <div className='tela-mercado'>

        <div className='cabecario-perfil-mercado'>
          <h1>Perfil Mercado</h1>
        </div>
        <div className='container-info-mercado'>
          <div className='cabecalio-info-mercado'>
            <h2>Informações Mercado</h2>
            {activeBtn == 'pessoal' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))}>editar</button>}
          </div>
          <div className='informacoes-detalhadas-mercado'>
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
            <label htmlFor='cnpj'>CNPJ</label><br />
            <input
              type="text"
              id="cnpj"
              value={inputCnpj}
              onChange={(e) => setInputCnpj(e.target.value)}
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


        <div className='container-contato-mercado'>
          <div className="cabecario-contato-mercado">
            <h2>Contato</h2>
            {activeBtn == 'contato' ? <button onClick={() => (atualizaDados(), trocaBotao())}>Salvar</button> :
              <button onClick={() => (trocaBotao('contato'))}>editar</button>}
          </div>
          <div className='informacoes-detalhadas-contato-mercado'>
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
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='bairro'>Bairro</label><br />
            <input
              type="text"
              id="bairro"
              value={inputBairro}
              onChange={(e) => setInputBairro(e.target.value)}
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='logradouro'>Logradouro</label><br />
            <input
              type="text"
              id="logradouro"
              value={inputLogradouro}
              onChange={(e) => setInputLogradouro(e.target.value)}
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='numero'>Número</label><br />
            <input
              type="text"
              id="numero"
              value={inputNumero}
              onChange={(e) => setInputNumero(e.target.value)}
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
            /><br />
            <hr />
            <label htmlFor='complemento'>Complemento</label><br />
            <input
              type="text"
              id="complemento"
              value={inputComplemento}
              onChange={(e) => setInputComplemento(e.target.value)}
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
            /><br />
            <hr />
          </div>
        </div>
        <button className='excluirConta-mercado' onClick={()=>( setPopPupAtivo(!popPupAtivo))}>Excluir conta</button>
      {popPupAtivo && <div className='overlay-pop' onClick={()=>( setPopPupAtivo(!popPupAtivo))}>
        <div className='pop-container-mer'>
          <i class="bi bi-chevron-left"></i>
          <h2>Excluir Conta</h2>
          <p>Você tem certeza que deseja excluir sua conta? </p>
          <button className='botao-excluir-mer'>Excluir</button>
          <button className='botao-cancelar-mer'>Cancelar</button>
          </div>
          </div>}
      </div>
    </div>
  )
}

export default PerfilMercado
