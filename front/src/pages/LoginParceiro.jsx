import './LoginMercado.css'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import Voltar from '../assets/flechaAzul.svg'
import Select from 'react-select'

function LoginParceiro() {
    const options = [
        { value: 'cpf', label: 'CPF' },
        { value: 'cnpj', label: 'CNPJ' },
        { value: 'mei', label: 'MEI' },
        { value: 'email', label: 'Email' }
    ]

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: state.isFocused ? '#00C677' : ' rgba(150, 150, 150, 0.39)',
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {
                borderColor: '#0C194E',
            },
            borderRadius: 'var(--Corner-Extra-small, 4px)',
            padding: '7px 5px',
            width: '111px', // Corrigido para ocupar todo o espaço disponível
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'gray',
            fontSize: '14px',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#0C194E',
            fontWeight: '600',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#00C677',
            '&:hover': {
                color: '#00C677',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%', // Alinha o dropdown com o controle
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(0, 123, 255, 0.1)' : 'white',
            color: state.isSelected ? '#0C194E' : 'black',
            fontWeight: state.isSelected ? '600' : '400',
            padding: '10px',
            '&:active': {
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
            },
        }),
    }

    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(options[3]) // Email como default
    const [formLog, setFormLog] = useState({ identificador: '', senha: '' }) // Captura dados do login
    const [message, setMessage] = useState('') // Exibe mensagens de sucesso/erro

    const { login } = useContext(GlobalContext)


    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormLog((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const { identificador, senha } = formLog
        if (!identificador || !senha) {
            setMessage('Por favor, preencha todos os campos.')
            return
        }

        const identificadorNome = selectedOption.value
        const table = identificadorNome === 'cnpj' ? 'mercados' : 'gerentes'

        const result = await login(table, identificadorNome, identificador, senha)

        if (result.success) {
            setMessage(result.message) // Exibe mensagem de sucesso
            navigate('/mercados') // Redirecionar após login bem-sucedido
        } else {
            setMessage(result.message) // Exibe mensagem de erro
        }
    }

    return (
        <div className="login-container">
            <div className='cabecalho-login'>
                <h1 className='poppins-semibold'>Acesse Fácil</h1>
                <img
                    className='botao-voltar'
                    src={Voltar}
                    alt="Botão voltar"
                    onClick={() => navigate('/loginDois')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className="detalhes-container-login">
                <p>Escolha como quer logar</p>
            </div>

            <form className="form-container-login" onSubmit={handleLogin}>
                <div className="inputs-conainer-login">

                    <label className="label">{selectedOption.label}</label>
                    <div className='identificador-container'>
                        <input
                            type="text"
                            className="input-login"
                            name="identificador"
                            value={formLog.identificador}
                            onChange={handleInputChange}
                            placeholder={`Digite seu ${selectedOption.label}`}
                        />
                        <Select
                            options={options}
                            value={selectedOption}
                            onChange={handleChange}
                            placeholder="Escolha uma opção"
                            isClearable={false}
                            styles={customStyles}
                        />
                    </div>
                    <label className="label">Senha</label>
                    <input
                        type="password"
                        className="input-login"
                        name="senha"
                        value={formLog.senha}
                        onChange={handleInputChange}
                        placeholder="Digite sua senha"
                    />
                    {message && <p className="message">{message}</p>}
                </div>

                <div className="btn-container-login">
                    <button type="submit" className='btn-acessar-login'>Acessar</button>
                </div>

            </form>
        </div>
    )
}

export default LoginParceiro
