import './AcessoM.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'

function LoginParceiro() {
    const navigate = useNavigate()
    const [paginaAtual, setPaginaAtual] = useState('loginParceiro')
    const [selectedOption, setSelectedOption] = useState('')
    const [submittedValue, setSubmittedValue] = useState(null)
    const [formLog, setFormLog] = useState({ identificador: '', senha: '' }) // Correção aqui: removeu "nome"

    const { login } = useContext(GlobalContext)

    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!selectedOption) {
            alert('Por favor, selecione uma informação antes de continuar.')
            return
        }
        setSubmittedValue(selectedOption)
        console.log(selectedOption) // Use o valor diretamente
        setPaginaAtual('loginParceiro2')
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // const { email, senha } = formLog

        const result = await login('parceiros', selectedOption, 'senha', 'senha')

        if (result.success) {
            // setMessage(result.message)  // Exibe mensagem de sucesso
            // Redirecionar ou atualizar o estado da aplicação após login bem-sucedido
            navigate('/mercados')
        } else {
            // setMessage(result.message)  // Exibe mensagem de erro
        }

    }
    

    return (
        <div>
            {paginaAtual === 'loginParceiro' && (
                <div className="esquerda login">
                    <div className='espacamento-acessoM'>
                        <div className='cabecalho-acessoM'>
                            <h1 className='acesso-h1'>Acesse Fácil</h1>
                            <img 
                              className='botao-voltar' 
                              src="Voltar.png" 
                              alt="Botão voltar" 
                              onClick={() => navigate(-1)} 
                              style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <form className="container-inputs" onSubmit={handleSubmit}>
                            <label className="informacao">Qual informação você quer usar?</label>
                            <select 
                                className="input-select" 
                                value={selectedOption} 
                                onChange={handleChange}
                            >
                                <option value="" disabled>Selecione</option>
                                <option value="cpf">CPF</option>
                                <option value="cnpj">CNPJ</option>
                                <option value="mei">MEI</option>
                                <option value="email">Email</option>
                            </select>

                            <span className='Span'>Selecione uma informação</span>

                            <div className="container-botoes">
                                <button className='continuar' type='submit'>Continuar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {paginaAtual === 'loginParceiro2' && (
                <div className="esquerdaAcesso loginM">
                    <div className='espacamento'>
                        <div className='cabecalho-acesso'>
                            <h1 className='poppins-semibold'>Acesse Fácil</h1>
                            <img 
                              className='botao-voltar' 
                              src='Voltar.png' 
                              alt="Botão voltar" 
                              onClick={() => setPaginaAtual('loginParceiro')} 
                              style={{ cursor: 'pointer' }}
                            />
                        </div>

                        <form className="container-inputsM" onClick={handleLogin}>
                            <label className="label">{submittedValue}</label>
                            <input type="text" className="input" />

                            <label className="label">Senha</label>
                            <input type="password" className="input" />

                            <span className='Span'>A senha precisa ter 8 ou mais caracteres.</span>
                            <button className='reset-senha'>Esqueci a senha</button>
                            <button className='acessar' onClick={() => navigate('/mercados')}>Acessar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginParceiro
