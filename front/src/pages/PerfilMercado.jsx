import React, { useContext, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { GlobalContext } from '../contexts/GlobalContext'
import './PerfilMercado.css'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import 'react-toastify/dist/ReactToastify.css'

function PerfilMercado() {
  // Garantir que mercadosdb tenha um valor padrão (fallback)
  const { getDataByForeignKey, getLocalStorage, updateData, uploadImage, checkEmailExists, getDataById } = useContext(GlobalContext)
  const [IdenderecoMercado, setIdEnderecoMercado] = useState({})
  const [activeBtn, setActiveBtn] = useState(null)
  const idGerente = getLocalStorage('id_gerente')
  const [mercado, setMercado] = useState({})
  const [gerente, setGerente] = useState({})
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const validationSchemaMercado = z.object({
    nome: z.string().nonempty('Nome é obrigatório').regex(/^[A-Za-zÀ-ÿ ]+$/, 'Nome não pode conter caracteres especiais'),
    cnpj: z.string().length(14, 'CNPJ deve ter 14 dígitos').nonempty('CNPJ é obrigatório'),
  })
  const validationSchemaContato = z.object({
    telefone: z.string().length(11, 'Telefone deve ter 11 dígitos').nonempty('Telefone é obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório')
      .refine(async (email) => {
        // Se o email já está no storage e não mudou, não faz a verificação
        if (mercado && mercado.email === email) return true

        //se o email cadastrado for igual ao email do gerente, retorna true
        if (gerente && gerente.email === email) return true

        // Verifica em cada tabela (clientes, gerentes, mercados)
        const checkCliente = await checkEmailExists('clientes', email)
        if (checkCliente) return false // Se encontrado, retorna false

        const checkMercado = await checkEmailExists('mercados', email)
        return !checkMercado // Retorna false se encontrado, true se não encontrado
      }, { message: 'E-mail já cadastrado' }),
  })
  const validationSchemaEndereco = z.object({
    cep: z.string().length(8, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
    bairro: z.string().nonempty('Bairro é obrigatório'),
    logradouro: z.string().nonempty('Logradouro é obrigatório'),
    numero: z.string().nonempty('Número é obrigatório'),
    complemento: z.string(),
  })

  // Configuração do hook useForm para o formulário de dados pessoais
  const {
    register: registerMercado,
    handleSubmit: handleSubmitMercado,
    formState: { errors: errorsMercado },
    setValue: setValueMercado,
  } = useForm({
    resolver: zodResolver(validationSchemaMercado),
    defaultValues: { nome: '', cnpj: '' },
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

  // Configuração do hook useForm para o formulário de dados de contato
  const {
    register: registerEndereco,
    handleSubmit: handleSubmitEndereco,
    formState: { errors: errorsEndereco },
    setValue: setValueEndereco,
  } = useForm({
    resolver: zodResolver(validationSchemaEndereco),
    defaultValues: { cep: '', bairro: '', logradouro: '', numero: '', complemento: '' },
  })


  const fetchData = async () => {
    if (!idGerente) return // Verifica idGerente antes
    try {
      const gerente = await getDataById("gerentes", idGerente)
      const mercado = await getDataByForeignKey("mercados", "fk_id_gerente", idGerente)
      const enderecoMercado = await getDataByForeignKey("enderecomercados", "fk_id_mercado", mercado[0].id_mercado)
      setGerente(gerente)
      setMercado(...mercado)
      setIdEnderecoMercado(...enderecoMercado)
    } catch (error) {
      console.error("Erro:", error)
    }
  }


  useEffect(() => {
    if (!idGerente) return // Verifica idGerente antes
    try {
      getDataByForeignKey("mercados", "fk_id_gerente", idGerente).then((mercado) => {
        setImage(mercado[0].logo)
        setValueMercado('nome', mercado[0].nome)
        setValueMercado('cnpj', mercado[0].cnpj)
        setValueMercado('logo', mercado[0].logo)
        setValueContato('telefone', mercado[0].telefone)
        setValueContato('email', mercado[0].email)
        getDataByForeignKey("enderecomercados", "fk_id_mercado", mercado[0].id_mercado).then((enderecoMercado) => {
          setValueEndereco('cep', enderecoMercado[0].cep)
          setValueEndereco('bairro', enderecoMercado[0].bairro)
          setValueEndereco('logradouro', enderecoMercado[0].logradouro)
          setValueEndereco('numero', enderecoMercado[0].numero)
          setValueEndereco('complemento', enderecoMercado[0].complemento)
        })

      })
      fetchData()
    } catch (error) {
      console.error("Erro:", error)
    }
  }, [])

  const onsubmitMercado = async (data) => {
    try {
      const result = await updateData('mercados', mercado.id_mercado, {
        nome: data.nome,
        cnpj: data.cnpj,
      })
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      toast.error('Ocorreu um erro ao atualizar os dados.')
    }
  }

  const onSubmitContato = async (data) => {
    try {
      const result = await updateData('mercados', mercado.id_mercado, {
        telefone: data.telefone,
        email: data.email,
      })
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      toast.error('Ocorreu um erro ao atualizar os dados.')
    }
  }

  const onSubmitEndereco = async (data) => {
    try {
      const result = await updateData('enderecomercados', IdenderecoMercado.id_enderecomercado, {
        cep: data.cep,
        bairro: data.bairro,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
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

  const handleDivClick = () => {
    document.getElementById('file-input').click()
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result
        setImage(base64String)
        const filePath = await uploadImage(base64String)
        updateData('mercados', mercado.id_mercado, { logo: filePath })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Sidebar />
      <div className='tela-mercado'>
        <div className='cabecario-perfil-mercado'>
          <div className="foto-mercado">
            {image ? (
              <img
                src={`/uploads_images/${image}` || '/src/assets/user_default.webp'}
                alt="Imagem carregada"
                className="foto"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <p>Clique para adicionar uma imagem</p>
            )}
          </div>
          <div className="icon-logo" onClick={handleDivClick}>
            <input
              type="file"
              accept="image/*"
              {...registerMercado("logo")}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-input"
            />
            <i class="bi bi-plus-circle"></i>
          </div>
          <h1>Perfil Mercado</h1>
        </div>
        <form onSubmit={handleSubmitMercado(onsubmitMercado)} className='container-info-mercado'>
          <div className='cabecalio-info-mercado'>
            <h2>Dados do mercado</h2>
            {activeBtn == 'pessoal' ? <button onClick={() => (trocaBotao('pessoal'))} type='button'>Salvar</button> :
              <button onClick={() => (trocaBotao('pessoal'))} type='submit' ><i class="bi bi-pencil-square"></i>editar</button>}
          </div>
          <div className='informacoes-detalhadas-mercado'>
            <label htmlFor='nome'>Nome do Mercado</label><br />
            <input
              type="text"
              id="nome"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerMercado('nome')}
            />
            {errorsMercado.nome && <p className='error'>{errorsMercado.nome.message}</p>}
            <br />
            <hr />
            <label htmlFor='cnpj'>CNPJ</label><br />
            <input
              type="text"
              id="cnpj"
              disabled={activeBtn !== 'pessoal'}
              style={{ color: activeBtn === "pessoal" ? "black" : "gray" }}
              {...registerMercado('cnpj')}
            />
            {errorsMercado.cnpj && <p className='error'>{errorsMercado.cnpj.message}</p>}
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
        <form onSubmit={handleSubmitEndereco(onSubmitEndereco)} className='container-info-mercado'>
          <div className='cabecalio-info-mercado'>
            <h2>Endereço</h2>
            {activeBtn == 'endereco' ? <button onClick={() => (trocaBotao('endereco'))} type='button'>Salvar</button> :
              <button onClick={() => (trocaBotao('endereco'))} type='submit' ><i class="bi bi-pencil-square"></i>editar</button>}
          </div>
          <div className='informacoes-detalhadas-mercado'>
            <label htmlFor='cep'>CEP</label><br />
            <input
              type="text"
              id="cep"
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
              {...registerEndereco('cep')}
            />
            {errorsEndereco.cep && <p className='error'>{errorsEndereco.cep.message}</p>}
            <br />
            <hr />
            <label htmlFor='bairro'>Bairro</label><br />
            <input
              type="text"
              id="bairro"
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
              {...registerEndereco('bairro')}
            />
            {errorsEndereco.bairro && <p className='error'>{errorsEndereco.bairro.message}</p>}
            <br />
            <hr />
            <label htmlFor='logradouro'>Logradouro</label><br />
            <input
              type="text"
              id="logradouro"
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
              {...registerEndereco('logradouro')}
            />
            {errorsEndereco.logradouro && <p className='error'>{errorsEndereco.logradouro.message}</p>}
            <br />
            <hr />
            <label htmlFor='numero'>Número</label><br />
            <input
              type="text"
              id="numero"
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
              {...registerEndereco('numero')}
            />
            {errorsEndereco.numero && <p className='error'>{errorsEndereco.numero.message}</p>}
            <br />
            <hr />
            <label htmlFor='complemento'>Complemento</label><br />
            <input
              type="text"
              id="complemento"
              disabled={activeBtn !== 'endereco'}
              style={{ color: activeBtn === "endereco" ? "black" : "gray" }}
              {...registerEndereco('complemento')}
            />
            {errorsEndereco.complemento && <p className='error'>{errorsEndereco.complemento.message}</p>}
            <br />
            <hr />
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"  // Posição dos toasts
        autoClose={5000}      // Tempo de fechamento automático (ms)
        hideProgressBar={false} // Exibir a barra de progresso
        newestOnTop={true}    // Toast mais novo no topo
        closeOnClick          // Fechar o toast ao clicar
        rtl={false}           // Direção do texto (esquerda-direita)
        pauseOnFocusLoss      // Pausar auto-close ao perder foco
        draggable             // Tornar o toast "arrastável"
        pauseOnHover          // Pausar auto-close ao passar o mouse
        theme="colored"       // Tema padrão colorido
      />
    </div>
  )
}

export default PerfilMercado
