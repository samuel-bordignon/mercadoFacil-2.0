import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import './CadastroM.css'

function CadastroPerceiro1() {
  const {clientedb, setClientedb} = useContext(GlobalContext)
  const [nomeInput, setNomeInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [senhaInput, setSenhaInput] = useState('')
  const [cpfInput, setCpfInput] = useState('')
  const [celularInput, setCelularInput] = useState('')
  const [dataNascimentoInput, setDataNascimentoInput] = useState('')

  const salvarDados = () => {
    const novoCliente = {
      id: 1,
      nome: nomeInput,
      cpf: cpfInput,
      dataNascimento: dataNascimentoInput,
      senha: senhaInput,
      telefone: celularInput,
      email: emailInput,
      endereco: {
          cep: "88058089",
          bairro: "Ingleses",
          logradouro: "Rua do Ingleses",
          numero: "23",
          complemento: "Apto 101"
      }
    }
    setClientedb(novoCliente)
    navigate('/criarConta/cadastroParceiro2')
  }

  const navigate = useNavigate()
  return (
    <div className="esquerda-cadastrese">
            <div className='espacamento'>
              <div className='cabecalho-cadastroM'>
                <h1 className='cabecalho'>Primeira Etapa do Cadastro</h1>
                <img className='botao-voltar' src="Voltar.png" alt="Botão voltar" />
              </div>
              <h2 className='dados'>Insira os dados do gerente</h2>

              <div className="container-cadastrese">
                <div className="container-inputs">
                  <label className="label">CPF</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={cpfInput}
                    onChange={(e) => setCpfInput(e.target.value)}
                    />

                  <label className="label">Nome Completo</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={nomeInput}
                    onChange={(e) => setNomeInput(e.target.value)}
                  />

                  <label className="label">E-mail</label>
                  <input 
                    type="email" 
                    className="input" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    />
                </div>

                <div className="container-inputs2">
                  <label className="label">Celular</label>
                  <input 
                  type="number" 
                  className="input" 
                  value={celularInput}
                  onChange={(e) => setCelularInput(e.target.value)}
                  />

                  <label className="label">Data de Nascimento</label>
                  <input 
                  type="date" 
                  className="input" 
                  value={dataNascimentoInput}
                  onChange={(e) => setDataNascimentoInput(e.target.value)}
                  />

                  <label className="label">Senha</label>
                  <input 
                  type="password" 
                  className="input" 
                  value={senhaInput}
                  onChange={(e) => setSenhaInput(e.target.value)}
                  />

                  <button className='etapas' onClick={() => salvarDados() }>Próxima etapa</button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default CadastroPerceiro1
