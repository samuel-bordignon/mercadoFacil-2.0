import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import './CadastroM.css'  // Usando o CSS antigo
import './Cadastrese.css'  // Usando o CSS antigo
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem
import Cover from '../assets/images/cover.png'  // Imagem de capa
import EtapasContador1 from '../assets/images/EtapasContador.png'  // Imagem de capa
import NavbarLogo from '../components/NavbarLogo'  // Logo da navbar
// import User from '../assets/user_default.webp'

function CadastroParceiro2() {
  const navigate = useNavigate()
  const { addData, checkEmailExists, updateData, getLocalStorage, setLocalStorage, chaveMercadoData, chaveGerenteData } = useContext(GlobalContext)
  const [showPassword, setShowPassword] = useState(false)
  const storageLocal = getLocalStorage(chaveMercadoData)
  const storageGerenteLocal = getLocalStorage(chaveGerenteData)
  const id = getLocalStorage('id_mercados')


  const validationSchema = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o email já está no storage e não mudou, não faz a verificação
        if (storageLocal && storageLocal.email === email) return true

        //se o email cadastrado for igual ao email do gerente, retorna true
        if (storageGerenteLocal && storageGerenteLocal.email === email) return true

        // Verifica em cada tabela (clientes, gerentes, mercados)
        const checkCliente = await checkEmailExists('clientes', email)
        if (checkCliente) return false // Se encontrado, retorna false

        const checkMercado = await checkEmailExists('mercados', email)
        return !checkMercado // Retorna false se encontrado, true se não encontrado
      }, { message: 'E-mail já cadastrado' }),
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    cnpj: z.string().length(14, 'CNPJ deve ter 14 dígitos').nonempty('CNPJ é obrigatório'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: storageLocal || { nome: '', email: '', cnpj: '', telefone: '' }
  })

  function verificaDadosObjeto(obj) {
    return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined)
  }

  const onSubmit = async (data) => {
    if (verificaDadosObjeto(storageLocal)) {
      updateData('mercados', id, {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cnpj: data.cnpj,
        fk_id_gerente: getLocalStorage('id_gerente'),
        logo: User
      })
    } else {
      addData('mercados', {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cnpj: data.cnpj,
        fk_id_gerente: getLocalStorage('id_gerente'),
        logo: User
      })
    }
    setLocalStorage(chaveMercadoData, data)
    navigate('/criarConta/CadastroParceiro3')
  }

  return (
    <div className="containerAzul">
      <NavbarLogo /> {/* Logo da Navbar */}

      <div className="container">
        {/* Imagem de Capa */}
        <img className="direita" src={Cover} alt="Imagem de capa" />

        <div className="container-cadastro-parceiro">

          <div className="esquerda-cadastrese">
            <div className='espacamentoCM'>
              <div className='cabecalho-formulario-cadastro'>
                <h4 className='cabecalho-cadastroMercado'>Segunda Etapa do Cadastro</h4>
                <button className="btn-cadastro">
                  <img
                    className="botao-voltar"
                    onClick={() => navigate('/criarConta')}
                    src={Voltar}
                    alt="Botão voltar"
                  />
                </button>
              </div>
              <h2 className='dados-cadastroMercado'>Insira os dados do mercado</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="form-containerCM" id='form-endereco'>
                <div className='form-endereco-cliente'>

                  <div className="container-inputs">
                    <label className="labelCM">Nome do estabelecimento</label>
                    <input
                      {...register('nome')}
                      type="text"
                      className="input"
                    />
                    <p className='error'>{errors.nome?.message}</p>


                    <label className="labelCM">
                      E-mail do Mercado (empresarial)
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input"
                    />
                    <p className='error'>{errors.email?.message}</p>

                    <img className='contador' src={EtapasContador1} alt="Etapa Contador" />

                  </div>
                  <div className="container-inputs">
                    <label className="labelCM">
                      Telefone do Mercado 
                    </label>
                    <input
                      {...register('telefone')}
                      type="text"
                      className="input"
                    />
                    <p className='error'>{errors.telefone?.message}</p>

                    <label className="labelCM">CNPJ</label>
                    <input
                      {...register('cnpj')}
                      type="number"
                      className="input"
                    />
                    <p className='error'>{errors.cnpj?.message}</p>
                                
                <button type="submit" className='acessarCadastro2'>
                  Próximo
                </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CadastroParceiro2;
