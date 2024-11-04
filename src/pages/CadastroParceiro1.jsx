import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import './Cadastrese.css'
import Voltar from '../assets/flechaAzul.svg'
import Cover from '../assets/Cover.png'

const validationSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
  email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
  telefone: z.string().length(15, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
  confirmarSenha: z.string().nonempty('Confirmar senha é obrigatório'),
  dataNascimento: z.string().nonempty('Data de nascimento é obrigatória'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"]
})

function CadastroPerceiro1() {
  const navigate = useNavigate()
  const { gerentedb, setGerentedb } = useContext(GlobalContext)

  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: gerentedb
  })

  const onSubmitPessoal = (data) => {
    const cpfLimpo = data.cpf.replace(/\D/g, '')
    const telefoneLimpo = data.telefone.replace(/\D/g, '')

    const dadosLimpos = {
      ...data,
      cpf: cpfLimpo,
      telefone: telefoneLimpo,
      
    }

    setGerentedb(dadosLimpos)
    
    // navigate('/cadastroEnderecoCliente')
  }

  useEffect(() => {
    console.log(gerentedb)

  }, [gerentedb])

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  return (
    <div className='background-cadastro'>
      <div className='image-container'>
        <img src={Cover} alt="" />
      </div>
      <div className="cadastrese-container">
        <div className='cabecalho-cadastro'>
          <h1>Cadastre-se</h1>
          <button className='btn-cadastro'>
            <img className='botao-voltar' onClick={() => (navigate('/criarConta'))} src={Voltar} alt="Botão voltar" />
          </button>
        </div>
        <div className='detalhes-container'>
          <p>Torne sua vida fácil</p>
          <h2 className='etapa1'>Informações pessoais</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmitPessoal)} className="form-container">
          <div className="container-inputs">
            <label className="label">Nome Completo</label>
            <input
              {...register('nome')}
              type="text"
              className="input"
            />
            <p className='error'>{errors.nome?.message}</p>

            <label className="label">CPF</label>
            <input
              {...register('cpf')}
              type="text"
              className="input"
            />
            <p className='error'>{errors.cpf?.message}</p>

            <label className="label">E-mail</label>
            <input
              {...register('email')}
              type="email"
              className="input"
            />
            <p className='error'>{errors.email?.message}</p>

            <label className="label">Telefone</label>
            <InputMask
              {...register('telefone')}
              mask="(99) 99999-9999"
              type="text"
              className="input"
            />
            <p className='error'>{errors.telefone?.message}</p>
          </div>
          <div className="container-inputs">
            <label className="label">Data de Nascimento</label>
            <input
              {...register('dataNascimento')}
              type="date"
              className="input"
            />
            <p className='error'>{errors.dataNascimento?.message}</p>

            <label className="label">Senha</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                {...register('senha')}
                type={showPassword ? 'text' : 'password'}
                className="input"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <i id='icone-olho' className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: '23px' }}></i>
              </button>
            </div>
            <p className='error'>{errors.senha?.message}</p>

            <label className="label">Confirmar Senha</label>
            <input
              {...register('confirmarSenha')}
              type={showPassword ? 'text' : 'password'}
              className="input"
            />
            <p className='error'>{errors.confirmarSenha?.message}</p>

            <button type="submit" className='acessarCadastro'>Próximo</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CadastroPerceiro1
