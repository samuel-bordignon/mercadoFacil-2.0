import './AcessoM.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginParceiro() {
    const navigate = useNavigate()
    const [paginaAtual, setPaginaAtual] = useState('loginParceiro')

    return (
        <div>
            {paginaAtual === 'loginParceiro' &&
                <div className="esquerda login">
                    <div className='espacamento-acessoM'>
                        <div className='cabecalho-acessoM'>
                            <h1 className='acesso-h1'>Acesse Fácil</h1>
                            <img className='botao-voltar' src="Voltar.png" alt="Botão voltar" />
                        </div>
                        <div className="container-inputs">
                            <label className="informacao">Qual informação você quer usar?</label>
                            <select className="input-select">
                                <option value="" disabled selected>Selecione</option>
                                <option value="cpf">CPF</option>
                                <option value="cnpj">CNPJ</option>
                                <option value="mei">MEI</option>
                                <option value="email">Email</option>
                            </select>

                            <span className='Span'>Selecione uma informação</span>

                            <div className="container-botoes">
                                <button className='continuar' onClick={() => setPaginaAtual('loginParceiro2')}>Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {paginaAtual === 'loginParceiro2' &&
                <div className="esquerdaAcesso loginM">
                    <div className='espacamento'>
                        <div className='cabecalho-acesso'>
                            <h1 className='poppins-semibold'>Acesse Fácil</h1>
                            <img className='botao-voltar' src='Voltar.png' alt="Botão voltar" />
                        </div>

                        <div className="container-inputsM">
                            <label className="label">CPF</label>
                            <input type="text" className="input" />

                            <label className="label">Senha</label>
                            <input type="password" className="input" />

                            <span className='Span'>A senha precisa ter 8 ou mais caracteres.</span>
                            <button className='reset-senha'>Esqueci a senha</button>
                            <button className='acessar' onClick={() => navigate('/mercados')}>Acessar</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default LoginParceiro
