import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import './Cadastrese.css'
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem
import Cover from '../assets/images/cover.png'  // Imagem de capa
import NavbarLogo from '../components/NavbarLogo'  // Logo da navbar

function CadastroCliente1() {
  const navigate = useNavigate()
  const { addData, checkEmailExists, updateData, getLocalStorage, setLocalStorage, chaveClienteData } = useContext(GlobalContext)
  const [showPassword, setShowPassword] = useState(false)
  const storageLocal = getLocalStorage(chaveClienteData)
  const id = getLocalStorage('id_cliente')


  const validationSchema = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o email já está no storage e não mudou, não faz a verificação
        if (storageLocal && storageLocal.email === email) return true;

        // Verifica em cada tabela (clientes, gerentes, mercados)
        const checkCliente = await checkEmailExists('clientes', email);
        if (checkCliente) return false; // Se encontrado, retorna false

        const checkGerente = await checkEmailExists('gerentes', email);
        if (checkGerente) return false; // Se encontrado, retorna false

        const checkMercado = await checkEmailExists('mercados', email);
        return !checkMercado; // Retorna false se encontrado, true se não encontrado
      }, { message: 'E-mail já cadastrado' }),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
    confirmarSenha: z.string().nonempty('Confirmar senha é obrigatório'),
    dataNascimento: z.string().nonempty('Data de nascimento é obrigatória'),
  }).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: storageLocal || { nome: '', email: '', cpf: '', telefone: '', senha: '', confirmarSenha: '', dataNascimento: '' }
  })


  function verificaDadosObjeto(obj) {
    return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
  }

  const onSubmit = async (data) => {
    if (verificaDadosObjeto(storageLocal)) {
      updateData('clientes', id, {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        senha: data.senha,
        data_nasc: data.dataNascimento
      })
    } else {
      addData('clientes', {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        senha: data.senha,
        data_nasc: data.dataNascimento
      })
    }
    setLocalStorage(chaveClienteData, data)
    navigate('/cadastroEnderecoCliente')
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return (
    <div className="containerAzul">
      <NavbarLogo /> {/* Logo da Navbar */}

      <div className="container">
        {/* Imagem de Capa */}
        <img className="direita" src={Cover} alt="Imagem de capa" />

        <div className="cadastrese-containerCliente">
          <div className='cabecalhoCadastroCliente'>
            <h1>Cadastre-se</h1>

            <button className="btn-cadastro">
              <img
                className="botao-voltarCliente"
                onClick={() => navigate('/menuCadastro')}
                src={Voltar}
                alt="Botão voltar"
              />
            </button>
          </div>

          <div className='detalhes-container'>
            <p>Torne sua vida fácil</p>

            <h2 className='etapa1'>1 - Insira seus dados</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-containerClientes">
            <div className="container-inputsClientes1">
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
              <input
                {...register('telefone')}
                type="text"
                className="input"
              />
              <p className='error'>{errors.telefone?.message}</p>
            </div>
            <div className="container-inputsClientes2">
              <label className="label">Data de Nascimento</label>
              <input
                {...register('dataNascimento')}
                type="date"
                className="input"
                max={new Date().toISOString().split("T")[0]}
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
                    right: 55,
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

              <button type="submit" className='acessarCadastroCliente'>Próximo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CadastroCliente1;