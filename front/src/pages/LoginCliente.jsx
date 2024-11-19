import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './AcessoU.css'
import Voltar from '../assets/flechaAzul.svg'
import Cover from '../assets/Cover.png'

function LoginCliente() {
  const { login } = useContext(GlobalContext)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [formLog, setFormLog] = useState({ email: '', senha: '' }) // Correção aqui: removeu "nome"

  // Definindo o esquema de validação com zod
  const validationSchema = z.object({
    email: z
      .string()
      .email('E-mail inválido')
      .refine(async (email) => {
        const response = await login('clientes', email, '')
        if (response.success) return true
        return false
      }, 'E-mail não encontrado'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, senha } = formLog

    const result = await login('clientes', email, 'senha', senha)

    if (result.success) {
        setMessage(result.message)  // Exibe mensagem de sucesso
        // Redirecionar ou atualizar o estado da aplicação após login bem-sucedido
    } else {
        setMessage(result.message)  // Exibe mensagem de erro
    }
}

  return (
    <div className="esquerdaAcesso login">
      <div className="espacamento">
        <div className="cabecalho-acesso">
          <h1 className="poppins-semibold">Acesse Fácil</h1>
          <img className="botao-voltar" src={Voltar} alt="Botão voltar" />
        </div>

        <div className="container-inputsAcesso">
          <form onSubmit={handleLogin}>
          <label htmlFor='email' className='label'>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formLog.email}
                    className='input'
                    onChange={(e) => setFormLog({ ...formLog, email: e.target.value })} // Correção aqui
                    required
                    />
                <br />
                <label htmlFor='senha' className='label'>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    className='input'
                    value={formLog.senha}
                    onChange={(e) => setFormLog({ ...formLog, senha: e.target.value })} // Correção aqui
                    required
                />
                <br />
                {message && <p className='message'>{message}</p>}

            <button className="reset-senha" type="button">Esqueci a senha</button>
            <button className="acessar" type="submit">Acessar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginCliente
