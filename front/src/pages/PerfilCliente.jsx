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
  const storageLocal = getLocalStorage('ClienteData')  // Recupera os dados do cliente armazenados no localStorage
  const [activeBtn, setActiveBtn] = useState(null)  // Estado que controla o botão ativo (editar ou salvar)
  const [popPupAtivo, setPopPupAtivo] = useState(false)  // Estado para controlar a exibição do pop-up de exclusão de conta
  const navigate = useNavigate()  // Hook para navegação para outras páginas

  // Validação de dados pessoais usando o Zod
  const validationSchemaPessoal = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
    dataNascimento: z.string().nonempty('Data de nascimento é obrigatória'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
  })

  // Validação de dados de contato usando o Zod
  const validationSchemaContato = z.object({
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o e-mail não mudou, não faz a verificação
        if (storageLocal && storageLocal.email === email) return true

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
    register: registerPessoal,  // Registra os campos do formulário de dados pessoais
    handleSubmit: handleSubmitPessoal,  // Função para lidar com o envio dos dados pessoais
    formState: { errors: errorsPessoal },  // Armazena os erros de validação para dados pessoais
    setValue: setValuePessoal,  // Função para definir valores no formulário de dados pessoais
  } = useForm({
    resolver: zodResolver(validationSchemaPessoal),  // Integra a validação com o react-hook-form
    defaultValues: { nome: '', cpf: '', data_nasc: '', senha: '' },  // Valores iniciais do formulário
  })

  // Configuração do hook useForm para o formulário de dados de contato
  const {
    register: registerContato,  // Registra os campos do formulário de dados de contato
    handleSubmit: handleSubmitContato,  // Função para lidar com o envio dos dados de contato
    formState: { errors: errorsContato },  // Armazena os erros de validação para dados de contato
    setValue: setValueContato,  // Função para definir valores no formulário de dados de contato
  } = useForm({
    resolver: zodResolver(validationSchemaContato),  // Integra a validação com o react-hook-form
    defaultValues: { telefone: '', email: '' },  // Valores iniciais do formulário
  })

  // Hook useEffect para buscar os dados do cliente e preencher o formulário
  useEffect(() => {
    // Chama a função getDataById para buscar os dados do cliente e preenchê-los nos campos do formulário
    getDataById('clientes', idCliente).then((data) => {
      setClientedb(data)  // Armazena os dados do cliente
      if (data) {
        setValuePessoal('nome', data.nome || '')  // Preenche o campo "nome"
        setValuePessoal('cpf', data.cpf || '')  // Preenche o campo "cpf"
        setValuePessoal('data_nasc', data.data_nasc ? data.data_nasc.split('T')[0] : '')  // Preenche o campo "data_nasc"
        setValuePessoal('senha', data.senha || '')  // Preenche o campo "senha"

        setValueContato('telefone', data.telefone || '')  // Preenche o campo "telefone"
        setValueContato('email', data.email || '')  // Preenche o campo "email"
      }
      console.log(data)  // Log para depuração
    })
  }, [idCliente, getDataById, setValuePessoal, setValueContato])  // Dependências para garantir que os dados sejam buscados corretamente

  // Função para enviar dados pessoais para o servidor
  const onSubmitPessoal = async (data) => {
    try {
      await updateData('clientes', idCliente, {  // Atualiza os dados pessoais no banco
        nome: data.nome,
        cpf: data.cpf,
        data_nasc: data.dataNascimento,
        senha: data.senha,
      })
      toast.success('Dados pessoais salvos com sucesso!')  // Exibe notificação de sucesso
    } catch (error) {
      toast.error('Erro ao salvar os dados pessoais.')  // Exibe notificação de erro
    }
  }

  // Função para enviar dados de contato para o servidor
  const onSubmitContato = async (data) => {
    try {
      await updateData('clientes', idCliente, {  // Atualiza os dados de contato no banco
        telefone: data.telefone,
        email: data.email,
      })
      toast.success('Dados de contato salvos com sucesso!')  // Exibe notificação de sucesso
    } catch (error) {
      toast.error('Erro ao salvar os dados de contato.')  // Exibe notificação de erro
    }
  }

  // Função para alternar entre os estados dos botões (Editar/Salvar)
  const trocaBotao = (nomebtn) => {
    setActiveBtn((prev) => (prev === nomebtn ? null : nomebtn))  // Alterna o estado do botão entre "editar" e "salvar"
  }

  // Função para excluir a conta do cliente
  const handleDeleteAccount = async () => {
    try {
      const success = await deleteData('clientes', idCliente)
      const success2 = await deleteData('enderecoclientes', idEndereco)
      if (success && success2) {
        toast.success('Conta excluída com sucesso! Esperamos te ver novamente em breve.')
        // Limpa os dados do localStorage e redireciona para a página inicial
        localStorage.clear()
        navigate('/')
      } else {
        toast.error('Erro ao excluir a conta.')  // Notificação de erro
      }
    } catch (error) {
      toast.error('Erro ao excluir a conta.')  // Notificação de erro
    }
  }

  return (  // Renderiza o JSX do componente
    <div className='tela-usuario'>
      <Navbar />  {/* Exibe o componente Navbar */}
      <div className='cabecario-perfil-usuario'>
        <h1>Informações da Conta</h1>  {/* Título principal */}
      </div>
      <div className='container-info'>
        {/* Formulário de dados pessoais */}
        <form onSubmit={handleSubmitPessoal(onSubmitPessoal)} className='informacoes-detalhadas'>
          <div className='cabecalio-info'>
            <h2>Informações Pessoais</h2>
            {/* Botões para editar ou salvar os dados pessoais */}
            {activeBtn == 'pessoal' ? <button onClick={() => (trocaBotao('pessoal'))} type='submit'>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))}>Editar</button>}
          </div>
          <label htmlFor='nome'>Nome</label><br />
          <input
            type="text"
            id="nome"
            {...registerPessoal('nome')}  // Registra o campo "nome"
            disabled={activeBtn != 'pessoal'}  // Desabilita o campo se não estiver no modo de edição
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }}  // Estilo do campo
          />
          <p className="error">{errorsPessoal.nome?.message}</p>  {/* Exibe mensagem de erro, se houver */}
          <br />
          <hr />
          {/* Repete o processo para os outros campos: CPF, Data de Nascimento, Senha */}
          <label htmlFor='cpf'>CPF</label><br />
          <input
            type="text"
            id="cpf"
            {...registerPessoal('cpf')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" ? "black" : "gray" }}
          />
          <p className="error">{errorsPessoal.cpf?.message}</p>
          <br />
          <hr />
          <label htmlFor='dataNascimento'>Data de Nascimento</label><br />
          <input
            type="text"
            id="data_nasc"
            {...registerPessoal('data_nasc')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" ? "black" : "gray" }}
          />
          <p className="error">{errorsPessoal.data_nasc?.message}</p>
          <br />
          <hr />
          <label htmlFor='senha'>Senha</label><br />
          <input
            type="text"
            id="senha"
            {...registerPessoal('senha')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" ? "black" : "gray" }}
          />
          <p className="error">{errorsPessoal.senha?.message}</p>
          <br />
          <hr />
        </form>

        {/* Formulário de dados de contato */}
        <form onSubmit={handleSubmitContato(onSubmitContato)} className='informacoes-detalhadas'>
          <div className='container-contato'>
            <div className="cabecario-contato">
              <h2>Contato</h2>
              {/* Botões para editar ou salvar os dados de contato */}
              {activeBtn == 'contato' ? <button onClick={() => (trocaBotao('contato'))} type='submit'>Salvar</button> :
                <button onClick={() => (trocaBotao('contato'))}>editar</button>}
            </div>
            <div className='informacoes-detalhadas-contato'>
              {/* Campos para telefone e e-mail */}
              <label htmlFor='telefone'>Telefone</label><br />
              <input
                type="text"
                id="telefone"
                {...registerContato('telefone')}  // Registra o campo "telefone"
                disabled={activeBtn != 'contato'}  // Desabilita o campo se não estiver no modo de edição
                style={{ color: activeBtn == "contato" ? "black" : "gray" }}  // Estilo do campo
              />
              <p className="error">{errorsContato.telefone?.message}</p>  {/* Exibe mensagem de erro, se houver */}
              <br />
              <hr />
              <label htmlFor='email'>Email</label><br />
              <input
                type="text"
                id="email"
                {...registerContato('email')}  // Registra o campo "email"
                disabled={activeBtn != 'contato'}
                style={{ color: activeBtn == "contato" ? "black" : "gray" }}
              />
              <p className="error">{errorsContato.email?.message}</p>
              <br />
              <hr />
            </div>
          </div>
        </form>
      </div>

      {/* Botão para abrir o pop-up de exclusão de conta */}
      <button className='excluirConta-usuario' onClick={() => setPopPupAtivo(!popPupAtivo)}>Excluir conta</button>

      {/* Pop-up de confirmação de exclusão */}
      {popPupAtivo && (
        <div className='overlay-pop' onClick={() => setPopPupAtivo(!popPupAtivo)}>
          <div className='pop-container'>
            <h2>Excluir Conta</h2>
            <p>Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            <button className='botao-excluir' onClick={handleDeleteAccount}>Excluir</button>
            <button className='botao-cancelar' onClick={() => setPopPupAtivo(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerfilCliente  // Exporta o componente para ser utilizado em outras partes da aplicação
