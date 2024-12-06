import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import './CadastroM.css'  // Usando o CSS antigo
import './Cadastrese.css'  // Usando o CSS antigo
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem
import Cover from '../assets/images/cover.png'  // Imagem de capa
import NavbarLogo from '../components/NavbarLogo'  // Logo da navbar

// Validação com Zod
function CadastroParceiro1() {
  const navigate = useNavigate()
  const { addData, checkEmailExists, updateData, getLocalStorage, setLocalStorage, chaveGerenteData } = useContext(GlobalContext)
  const [showPassword, setShowPassword] = useState(false)
  const storageLocal = getLocalStorage(chaveGerenteData)
  const id = getLocalStorage('id_gerente')


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
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
    confirmarSenha: z.string().nonempty('Confirmar senha é obrigatório'),
    mei: z.string().optional(),
    dataNascimento: z.string().nonempty('Data de nascimento é obrigatória'),
  }).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: storageLocal || { nome: '', email: '', cpf: '', telefone: '', senha: '', confirmarSenha: '', dataNascimento: '' }
  })
  console.log(errors)


  function verificaDadosObjeto(obj) {
    return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
  }

  const onSubmit = async (data) => {

    if (verificaDadosObjeto(storageLocal)) {
      try {
        updateData('gerentes', id, {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          senha: data.senha,
          data_nasc: data.dataNascimento
        })
        setLocalStorage(chaveGerenteData, data)
        navigate('/criarConta/CadastroParceiro2')
        console.log('Gerente atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar gerente:', error)
      }
    } else {
      try {
        addData('gerentes', {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          senha: data.senha,
          data_nasc: data.dataNascimento
        })
        setLocalStorage(chaveGerenteData, data)
        navigate('/criarConta/CadastroParceiro2')
        console.log('Gerente adicionado com sucesso!')
      } catch (error) {
        console.error('Erro ao adicionar gerente:', error)
      }
    }
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

        <div className="container-cadastro-parceiro">
          <div className='espacamentoCM'>
            <div className='cabecalho-formulario-cadastro'>
              <h4 className='cabecalho-cadastroMercado'>Primeira Etapa do Cadastro</h4>
              <button className="btn-cadastro">
                <img
                  className="botao-voltar"
                  onClick={() => navigate('/criarConta')}
                  src={Voltar}
                  alt="Botão voltar"
                />
              </button>
            </div>
            <h2 className='dados-cadastroMercado'>Insira os dados do gerente</h2>

            <div className="container-cadastrese">
              <form onSubmit={handleSubmit(onSubmit)} className="form-containerCM">
                <div className="inputs-cadastro-parceiro">
                  <label className="labelCM">Nome Completo</label>
                  <input
                    {...register('nome')}
                    type="text"
                    className="input"
                    placeholder='Nome Completo'
                  />
                  <p className="error">{errors.nome?.message}</p>

                  <label className="labelCM">CPF</label>
                  <input
                    {...register('cpf')}
                    type="text"
                    className="input"
                    placeholder='xxx.xxx.xxx-xx'
                  />
                  <p className="error">{errors.cpf?.message}</p>

                  <label className="labelCM">E-mail</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="input"
                    placeholder='exemplo@dominio.com'
                  />
                  <p className='error'>{errors.email?.message}</p>
                  <label className="labelCM">Telefone</label>
                  <input
                    {...register('telefone')}
                    type="text"
                    className="input"
                    placeholder='(xx) xxxxx-xxxx'
                  />
                  <p className="error">{errors.telefone?.message}</p>
                </div>

                <div className="inputs-cadastro-parceiro">
                  <label className="labelCM">Data de Nascimento</label>
                  <input
                    {...register('dataNascimento')}
                    type="date"
                    className="input"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <p className='error'>{errors.dataNascimento?.message}</p>

                  <label className="labelCM">Senha</label>
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
                        right: 15,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <i
                        id="icone-olho"
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                        style={{ fontSize: '23px' }}
                      ></i>
                    </button>
                  </div>
                  <p className="p error">{errors.senha?.message}</p>

                  <label className="labelCM">Confirmar Senha</label>
                  <input
                    {...register('confirmarSenha')}
                    type={showPassword ? 'text' : 'password'}
                    className="input"
                  />
                  <p className="error">{errors.confirmarSenha?.message}</p>

                  <label className="labelCM">Mei</label>
                  <input
                    {...register('mei')}
                    type="number"
                    className="input"
                    placeholder='Opcional'
                  />
                  <p className='error'>{errors.mei?.message}</p>
                  <button type="submit" className="botao-proximo-cadastro">
                    Próximo
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroParceiro1;
