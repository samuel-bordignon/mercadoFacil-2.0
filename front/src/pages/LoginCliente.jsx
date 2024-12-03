import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cover from '../assets/images/cover.png'; // Certifique-se de que o caminho da imagem está correto
import NavbarLogo from '../components/NavbarLogo';
import SetaBranca from '../assets/images/setaBranca.png';
import Voltar from '../assets/images/Voltar.png'; // Importando a imagem corretamente
import './AcessoU.css';

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

    const result = await login('clientes', 'email', email, senha)

    if (result.success) {
      setMessage(result.message)  // Exibe mensagem de sucesso
      navigate('/mercados')// Redirecionar ou atualizar o estado da aplicação após login bem-sucedido
    } else {
      setMessage(result.message)  // Exibe mensagem de erro
    }
  }

  return (
    <div>
      <div className="sujismundoDois">

        <NavbarLogo />

        <div className="container">
          {/* Imagem de Capa */}
          <img className="direita" src={Cover} alt="Imagem de capa" />

          <div className="esquerdaAcesso login">
            <div className="espacamento">
              <div className="cabecalho-acesso">
                <h1 className="poppins-semibold">Acesse Fácil</h1>
                {/* Botão Voltar */}
                <img
                  className="botao-voltar"
                  src={Voltar} // Aqui estamos usando a variável Voltar que já foi importada corretamente
                  alt="Botão voltar"
                  onClick={() => navigate(-1)} // Função de navegação para voltar à página anterior
                />
              </div>

              <div className="container-inputsLoginCliente">
                <label className="label">CPF</label>
                <input type="text" className="input-LoginCliente" />

                <label className="label">Senha</label>
                <input type="password" className="input-LoginCliente" />

                <span className="Span">A senha precisa ter 8 ou mais caracteres.</span>

                <button className="reset-senha">Esqueci a senha</button>
                <button className="acessar" onClick={() => navigate('/mercados')}>
                  Acessar
                  <img className='seta' src={SetaBranca} alt="Seta branca apontando para direita" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCliente;

