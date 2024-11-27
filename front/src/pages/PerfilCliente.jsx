import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GlobalContext } from '../contexts/GlobalContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './PerfilCliente.css'

function PerfilCliente() {
  const { getDataById, getLocalStorage, updateData, checkEmailExists, deleteData } = useContext(GlobalContext)

  const idCliente = getLocalStorage('id_cliente')
  const idEndereco = getLocalStorage('id_enderecocliente')
  const storageLocal = getLocalStorage('ClienteData')
  const [activeBtn, setActiveBtn] = useState(null)
  const [popPupAtivo, setPopPupAtivo] = useState(false)
  const navigate = useNavigate()

  // Esquema de validação para dados pessoais e contato
  const validationSchemaPessoal = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos').nonempty('CPF é obrigatório'),
    dataNascimento: z.string().nonempty('Data de nascimento é obrigatória'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').nonempty('Senha é obrigatória'),
  })

  const validationSchemaContato = z.object({
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o email já está no storage e não mudou, não faz a verificação
        if (storageLocal && storageLocal.email === email) return true

        // Verifica em cada tabela (clientes, gerentes, mercados)
        const checkCliente = await checkEmailExists('clientes', email)
        if (checkCliente) return false // Se encontrado, retorna false

        const checkGerente = await checkEmailExists('gerentes', email)
        if (checkGerente) return false // Se encontrado, retorna false

        const checkMercado = await checkEmailExists('mercados', email)
        return !checkMercado // Retorna false se encontrado, true se não encontrado
      }, { message: 'E-mail já cadastrado' }),
  })

  // Hooks do react-hook-form para cada seção
  const {
    register: registerPessoal,
    handleSubmit: handleSubmitPessoal,
    formState: { errors: errorsPessoal },
    setValue: setValuePessoal,
  } = useForm({
    resolver: zodResolver(validationSchemaPessoal),
    defaultValues: { nome: '', cpf: '', data_nasc: '', senha: '' },
  })

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
    // Buscar dados do cliente e preencher os valores iniciais
    getDataById('clientes', idCliente).then((data) => {
      setClientedb(data)
      if (data) {
        setValuePessoal('nome', data.nome || '')
        setValuePessoal('cpf', data.cpf || '')
        setValuePessoal('data_nasc', data.data_nasc ? data.data_nasc.split('T')[0] : '')
        setValuePessoal('senha', data.senha || '')

        setValueContato('telefone', data.telefone || '')
        setValueContato('email', data.email || '')
      }
      console.log(data)
    })
  }, [idCliente, getDataById, setValuePessoal, setValueContato])

  const onSubmitPessoal = async (data) => {
    try {
      await updateData('clientes', idCliente, {
        nome: data.nome,
        cpf: data.cpf,
        data_nasc: data.dataNascimento,
        senha: data.senha,
      })
        toast.success('Dados pessoais salvos com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar os dados pessoais.')
    }
  }

  const onSubmitContato = async (data) => {
    try {
      await updateData('clientes', idCliente, {
        telefone: data.telefone,
        email: data.email,
      })
      toast.success('Dados de contato salvos com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar os dados de contato.')
    }
  }

  const trocaBotao = (nomebtn) => {
    setActiveBtn((prev) => (prev === nomebtn ? null : nomebtn))
  }

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
        toast.error('Erro ao excluir a conta.')
      }
    } catch (error) {
      toast.error('Erro ao excluir a conta.')
    }
  }


  return (
    <div className='tela-usuario'>
      <Navbar />
      <div className='cabecario-perfil-usuario'>
        <h1>Informações da Conta</h1>
      </div>
      <div className='container-info'>
        <form onSubmit={handleSubmitPessoal(onSubmitPessoal)} className='informacoes-detalhadas'>
          <div className='cabecalio-info'>
            <h2>Informações Pessoais</h2>
            {activeBtn == 'pessoal' ? <button onClick={() => (trocaBotao('pessoal'))} type='submit'>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))}>Editar</button>}
          </div>
          <label htmlFor='nome'>Nome</label><br />
          <input
            type="text"
            id="nome"
            {...registerPessoal('nome')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }} />
          <p className="error">{errorsPessoal.nome?.message}</p>
          <br />
          <hr />
          <label htmlFor='cpf'>CPF</label><br />
          <input
            type="text"
            id="cpf"
            {...registerPessoal('cpf')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }} />
          <p className="error">{errorsPessoal.cpf?.message}</p>
          <br />
          <hr />
          <label htmlFor='dataNascimento'>Data de Nascimento</label><br />
          <input
            type="text"
            id="data_nasc"
            {...registerPessoal('data_nasc')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }} />
          <p className="error">{errorsPessoal.data_nasc?.message}</p>
          <br />
          <hr />
          <label htmlFor='senha'>Senha</label><br />
          <input
            type="text"
            id="senha"
            {...registerPessoal('senha')}
            disabled={activeBtn != 'pessoal'}
            style={{ color: activeBtn == "pessoal" && activeBtn ? "black" : "gray" }} />
          <p className="error">{errorsPessoal.senha?.message}</p>
          <br />
          <hr />
        </form>

        <form onSubmit={handleSubmitContato(onSubmitContato)} className='informacoes-detalhadas'>
          <div className='container-contato'>
            <div className="cabecario-contato">
              <h2>Contato</h2>
              {activeBtn == 'contato' ? <button onClick={() => (trocaBotao('contato'))} type='submit'>Salvar</button> :
                <button onClick={() => (trocaBotao('contato'))}>editar</button>}
            </div>
            <div className='informacoes-detalhadas-contato'>
              <label htmlFor='telefone'>Telefone</label><br />
              <input
                type="text"
                id="telefone"
                {...registerContato('telefone')}
                disabled={activeBtn != 'contato'}
                style={{ color: activeBtn == "contato" && activeBtn ? "black" : "gray" }} />
              <p className="error">{errorsContato.telefone?.message}</p>
              <br />
              <hr />
              <label htmlFor='email'>Email</label><br />
              <input
                type="text"
                id="email"
                {...registerContato('email')}
                disabled={activeBtn != 'contato'}
                style={{ color: activeBtn == "contato" && activeBtn ? "black" : "gray" }} />
              <p className="error">{errorsContato.email?.message}</p>
              <br />
              <hr />
            </div>
          </div>
        </form>
      </div>
      <button className='excluirConta-usuario' onClick={() => setPopPupAtivo(!popPupAtivo)}>Excluir conta</button>
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

export default PerfilCliente
