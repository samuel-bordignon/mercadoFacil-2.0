import React, { useContext, useEffect, useState } from 'react'  // Importa o React e hooks necessários como useContext, useEffect, e useState
import { NavLink, useLocation, useNavigate } from "react-router-dom"  // Importa componentes do React Router para navegação
import Navbar from '../components/Navbar'  // Importa o componente de navegação do sistema
import { useForm } from 'react-hook-form'  // Importa o hook useForm para facilitar o controle de formulários
import { z } from 'zod'  // Importa a biblioteca Zod para validação de dados
import { zodResolver } from '@hookform/resolvers/zod'  // Importa o resolver do Zod para integrar com o react-hook-form
import { GlobalContext } from '../contexts/GlobalContext'  // Importa o contexto global para acesso aos dados e funções compartilhadas
import { ToastContainer, toast } from 'react-toastify'  // Importa o componente de notificação de erro/sucesso
import 'react-toastify/dist/ReactToastify.css'  // Importa o CSS necessário para o Toastify
import './PerfilCliente.css'  // Importa o CSS do componente de perfil de cliente

function PerfilCliente() {  // Função que define o componente PerfilCliente
  const { getDataById, getLocalStorage, updateData, checkEmailExists, deleteData } = useContext(GlobalContext)  // Desestrutura funções do contexto GlobalContext

  const idCliente = getLocalStorage('id_cliente')  // Recupera o ID do cliente do localStorage
  const [emailCliente, setEmailCliente] = useState('')  // Estado para armazenar o e-mail do cliente
  const [activeBtn, setActiveBtn] = useState(null)  // Estado que controla o botão ativo (editar ou salvar)
  const [popPupAtivo, setPopPupAtivo] = useState(false)  // Estado para controlar a exibição do pop-up de exclusão de conta
  const navigate = useNavigate()  // Hook para navegação para outras páginas
  const listaCompras = getLocalStorage('listaDefout')  // Recupera a lista de compras do localStorage
  const [produtosdb, setProdutosdb] = useState([])  // Estado para armazenar os produtos do banco de dados
  // Validação de dados pessoais usando o Zod
  const validationSchemaPessoal = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
    data_nasc: z.string().nonempty('Data de nascimento é obrigatória'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
  })

  // Validação de dados de contato usando o Zod
  const validationSchemaContato = z.object({
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o e-mail não mudou, não faz a verificação
        if (email === emailCliente) return true
        // Verifica se o e-mail já está cadastrado em outras tabelas
        const checkCliente = await checkEmailExists('clientes', email)
        if (checkCliente) return false  // Se o e-mail já estiver cadastrado, retorna false

        const checkGerente = await checkEmailExists('gerentes', email)
        if (checkGerente) return false  // Se o e-mail já estiver cadastrado, retorna false

        const checkMercado = await checkEmailExists('mercados', email)
        return !checkMercado  // Se o e-mail não estiver cadastrado, retorna true
      }, { message: 'E-mail já cadastrado' }),
  })

  // Configuração do hook useForm para o formulário de dados pessoais
  const {
    register: registerPessoal,
    handleSubmit: handleSubmitPessoal,
    formState: { errors: errorsPessoal },
    setValue: setValuePessoal,
  } = useForm({
    resolver: zodResolver(validationSchemaPessoal),
    defaultValues: { nome: '', cpf: '', data_nasc: '', senha: '' },
  })

  // Configuração do hook useForm para o formulário de dados de contato
  const {
    register: registerContato,
    handleSubmit: handleSubmitContato,
    formState: { errors: errorsContato },
    setValue: setValueContato,
  } = useForm({
    resolver: zodResolver(validationSchemaContato),
    defaultValues: { telefone: '', email: '' },
  })

  useEffect(() => {
    console.log('idCliente:', idCliente)
    if (!idCliente) return // Verifica idCliente antes
    try {
      getDataById("clientes", idCliente).then((data) => {
        // Formata a data para 'YYYY-MM-DD'
        const dataNascimentoFormatada = data.data_nasc ? data.data_nasc.split('T')[0] : ''

        console.log('Dados do gerente:', data)

        setEmailCliente(data.email)  // Preenche o estado com o e-mail do cliente

        setValuePessoal('nome', data.nome || '')  // Preenche o campo "nome"
        setValuePessoal('cpf', data.cpf || '')  // Preenche o campo "cpf"
        setValuePessoal('data_nasc', dataNascimentoFormatada)  // Preenche o campo "data_nasc"
        setValuePessoal('senha', data.senha || '')  // Preenche o campo "senha"
        setValueContato('telefone', data.telefone || '')  // Preenche o campo "telefone"
        setValueContato('email', data.email || '')  // Preenche o campo "email"
      })
    } catch (error) {
      console.error("Erro:", error)
    }
  }, [])

  const onsubmitPessoal = async (data) => {
    try {
      const result = await updateData('clientes', idCliente, {
        nome: data.nome,
        cpf: data.cpf,
        data_nasc: data.data_nasc,
        senha: data.senha,
      })
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      toast.error('Ocorreu um erro ao atualizar os dados.')
    }
  }

  const onSubmitContato = async (data) => {
    try {
      const result = await updateData('clientes', idCliente, {
        telefone: data.telefone,
        email: data.email,
      })
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      toast.error('Ocorreu um erro ao atualizar os dados.')
    }
  }

  const trocaBotao = (nomebtn) => {
    if (activeBtn === nomebtn) {
      setActiveBtn(null)
    } else {
      setActiveBtn(nomebtn)
    }
  }

  const handleDelete = async (id) => {
    // Exibe o modal do SweetAlert2 com botões personalizados
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita.\nDeseja mesmo excluir sua conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deletar conta',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-confirm-mercado',
        cancelButton: 'btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData('mercados', id)
        setLocalStorage('id_gerente', null)
        setLocalStorage('mercadoData', null)
        setLocalStorage('gerenteData', null)
        navigate('/')

      } else {
        console.log('Usuário optou por não excluir a conta');
      }
    })
  }

  return (
    <div >
      <Navbar listaCompras={listaCompras} produtosdb={[]} setProdutosdb={setProdutosdb} />
      <div className='tela-mercado' id='perfil-cliente'>
        <form onSubmit={handleSubmitPessoal(onsubmitPessoal)} className='container-info-mercado'>
          <div className='cabecalio-info-mercado'>
            <h2>Dados do mercado</h2>
            {activeBtn == 'pessoal' ? <button onClick={() => (trocaBotao('pessoal'))} type='button'>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))} type='submit' ><i class="bi bi-pencil-square"></i>editar</button>}
          </div>
          <div className='informacoes-detalhadas-mercado'>
            <label htmlFor='nome'>Nome</label><br />
            <input
              type="text"
              id="nome"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerPessoal('nome')}
            />
            {errorsPessoal.nome && <p className='error'>{errorsPessoal.nome.message}</p>}
            <br />
            <hr />
            <label htmlFor='cpf'>CPF</label><br />
            <input
              type="text"
              id="cpf"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerPessoal('cpf')}
            />
            {errorsPessoal.cpf && <p className='error'>{errorsPessoal.cpf.message}</p>}
            <br />
            <hr />
            <label htmlFor='data_nasc'>Data de Nascimento</label><br />
            <input
              type="date"
              id="data_nasc"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerPessoal('data_nasc')}
            />
            {errorsPessoal.data_nasc && <p className='error'>{errorsPessoal.data_nasc.message}</p>}
            <br />
            <hr />
            <label htmlFor='senha'>Senha</label><br />
            <input
              type="text"
              id="senha"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerPessoal('senha')}
            />
            {errorsPessoal.senha && <p className='error'>{errorsPessoal.senha.message}</p>}
            <br />
            <hr />

          </div>
        </form>
        <form onSubmit={handleSubmitContato(onSubmitContato)} className='container-info-mercado'>
          <div className="cabecalio-info-mercado">
            <h2>Contato</h2>
            {activeBtn == 'contato' ? <button onClick={() => (trocaBotao('contato'))} type='button'>Salvar</button> :
              <button onClick={() => (trocaBotao('contato'))} type='submit' ><i class="bi bi-pencil-square"></i>editar</button>}
          </div>
          <div className='informacoes-detalhadas-mercado'>
            <label htmlFor='telefone'>Telefone</label><br />
            <input
              type="text"
              id="telefone"
              disabled={activeBtn !== 'contato'}
              style={{ color: activeBtn === "contato" ? "black" : "gray" }}
              {...registerContato('telefone')}
            />
            {errorsContato.telefone && <p className='error'>{errorsContato.telefone.message}</p>}
            <br />
            <hr />
            <label htmlFor='email'>E-mail Empresarial</label><br />
            <input
              type="email"
              id="email"
              disabled={activeBtn !== 'contato'}
              style={{ color: activeBtn === "contato" ? "black" : "gray" }}
              {...registerContato('email')}
            />
            {errorsContato.email && <p className='error'>{errorsContato.email.message}</p>}
            <br />
            <hr />
          </div>
        </form>
        <button className='excluirConta-mercado' onClick={() => (handleDelete(idCliente))}>Excluir conta</button>
      </div>
    </div>
  )
}

export default PerfilCliente  // Exporta o componente para ser utilizado em outras partes da aplicação
