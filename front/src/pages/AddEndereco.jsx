import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './AddEndereco.css'
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem
import Casa from '../assets/images/casaIcone.png'  // Corrigido o caminho da imagem
import Cafe from '../assets/images/cafeIcone.png'  // Corrigido o caminho da imagem
import Endereco from '../assets/images/EnderecoIMG.png'  // Corrigido o caminho da imagem


function AddEndereco() {
  const {
    updateData,
    deleteData,
    addData,
    addRelation,
    getDataById,
    getDataByForeignKey,
    getEndereco,
    getLocalStorage,
  } = useContext(GlobalContext)

  const validationSchema = z.object({
    cep: z.string().length(8, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
    logradouro: z.string().nonempty('Logradouro é obrigatório'),
    bairro: z.string().nonempty('Bairro é obrigatório'),
    apelido: z.string().nonempty('Apelido é obrigatório'),
    numero: z.string().optional(),
    complemento: z.string().optional(),
  })

  const {
    register,
    handleSubmit,
    setValue: setValueEndereco,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      cep: '',
      logradouro: '',
      bairro: '',
      apelido: '',
      numero: '',
      complemento: '',
    },
  })

  const [activeBtnDelete, setActiveBtnDelete] = useState(false)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const idCliente = getLocalStorage('id_cliente')
  const cep = watch('cep')
  const [enderecosCliente, setEnderecosCliente] = useState([])
  const [enderecoSendoEditado, setEnderecoSendoEditado] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const tabelaRelacao = await getDataByForeignKey('endereco_cliente_relecao', 'fk_id_cliente', idCliente)
      const enderecosRelacionados = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )
      setEnderecosCliente(enderecosRelacionados)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetFormFields = (values = {}) => {
    Object.entries(values).forEach(([key, value]) => setValueEndereco(key, value || ''))
  }
  useEffect(() => {
    const fetchEndereco = async () => {
      if (cep.length === 8) {
        try {
          const data = await getEndereco(cep)
          if (data) {
            resetFormFields({
              logradouro: data.address,
              bairro: data.district,
              cidade: data.city,
              estado: data.state,
            })
            setLat(data.lat)
            setLng(data.lng)
          }
        } catch (error) {
          console.error('Erro ao buscar o endereço:', error)
        }
      }
    }
    fetchEndereco()
  }, [cep])


  const onSubmit = async (data) => {
    if (enderecoSendoEditado) {
      await updateData('enderecoclientes', enderecoSendoEditado, {
        cep: data.cep,
        bairro: data.bairro,
        logradouro: data.logradouro,
        numero: data.numero,
        latitude: lat,
        longitude: lng,
        apelido: data.apelido,
        complemento: data.complemento,
      })
      setEnderecosCliente(
        enderecosCliente.map((endereco) =>
          endereco.id_enderecocliente === enderecoSendoEditado ? { ...endereco, ...data } : endereco
        )
      )
    } else {
      const newEndereco = await addData('enderecoclientes', {
        cep: data.cep,
        bairro: data.bairro,
        logradouro: data.logradouro,
        numero: data.numero,
        latitude: lat,
        longitude: lng,
        apelido: data.apelido,
        complemento: data.complemento,
      })
      await addRelation('endereco_cliente_relecao', idCliente, newEndereco.id_enderecocliente)
      setEnderecosCliente([...enderecosCliente, newEndereco])
    }

    resetFormFields({
      cep: '',
      logradouro: '',
      bairro: '',
      apelido: '',
      numero: '',
      complemento: '',
    })
    setEnderecoSendoEditado(null)
    window.location.reload()
  }

  const handleEdit = (endereco) => {
    setEnderecoSendoEditado(endereco.id_enderecocliente)
    resetFormFields(endereco)
    setActiveBtnDelete(true)
  }

  const handleCancelEdit = () => {
    setActiveBtnDelete(false)
    resetFormFields({
      cep: '',
      logradouro: '',
      bairro: '',
      apelido: '',
      numero: '',
      complemento: '',
    })
    setEnderecoSendoEditado(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este endereço?')) {
      try {
        await deleteData('enderecoclientes', id)
        setEnderecosCliente(enderecosCliente.filter((endereco) => endereco.id_enderecocliente !== id))
        handleCancelEdit()
      } catch (error) {
        console.error('Erro ao deletar endereço:', error)
      }
    }
  }

  if (loading) {
    return <div className="loading">
      <div className="spinner"></div>
    </div>;
  }


  return (
    <div className='backgroundCinza'>
      <Navbar />

      <div className="container">
        <div className="adicionarEndereco">
          <div className="cabecalhoEndereco">

            <h1 className="letrinhaSafada">Adicionar meu endereço</h1>

            <button className="btn-cadastro">
              <img
                className="botao-voltarCliente3"
                onClick={() => navigate('/criarConta')}
                src={Voltar}
                alt="Botão voltar"
              />
            </button>
          </div>
          <h2 className="letrinhaSafada2">Onde você quer receber seu pedido?</h2>

          <div className="inputs-div">
            <div className="favEndereco">

              {/* Primeira linha (input grande 1 e input pequeno) */}
              <div className="linha">
                <div className="campo">
                  <label className="label-endereco" htmlFor="rua">Rua/Logradouro</label>
                  <input id="rua" className="input-grande1" type="text" {...register("logradouro")} />
                </div>
                <div className="campo">
                  <label className="label-endereco" htmlFor="numero">Número</label>
                  <input id="numero" className="input-pequeno" type="text" {...register("numero")} />
                </div>
              </div>

              {/* Segunda linha (input grande 2) */}
              <div className="linha">
                <div className="campo">
                  <label className="label-endereco" htmlFor="complemento">Complemento</label>
                  <input id="complemento" className="input-grande" type="text" {...register("complemento")} />
                </div>
              </div>

              {/* Terceira linha (dois inputs médios) */}
              <div className="linha">
                <div className="campo">
                  <label className="label-endereco" htmlFor="cep">CEP</label>
                  <InputMask
                    mask="99999-999"
                    id="cep"
                    className="input-medio"
                    {...register("cep")}
                  />
                </div>

                <div className="campo">
                  <label className="label-endereco" htmlFor="bairro">Bairro</label>
                  <input id="bairro" className="input-medio" type="text" {...register("bairro")} />
                </div>
              </div>

              {/* Linha final (input grande 2 novamente) */}
              <div className="linha">
                <div className="campo">
                  <label className="label-endereco" htmlFor="pontoReferencia">Ponto de Referência</label>
                  <input id="pontoReferencia" className="input-grande" type="text" {...register("apelido")} />
                </div>
              </div>
            </div>

            <div className="espacamentobotoes">
              <h3 className="fvEndereco">Favoritar endereço</h3>

              <div className="botoesEndereco">
                <button className="botao-com-icone-cafe">
                  <img src={Casa} alt="ícone de casa" />
                  Casa
                </button>

                <button className="botao-com-icone">
                  <img src={Cafe} alt="ícone de trabalho" />
                  Trabalho
                </button>

              </div>
            </div>
          </div>
        </div>
    <div className="container-direita">
      <img src={Endereco} alt="imagem de endereço" />
    </div>
      </div>
    </div>



    /* </div><div className="conteiner">
            <div className="secao-formulario">
              <h2>{activeBtnDelete ? 'Editar endereço' : 'Adicionar meu endereço'}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="grupo-formulario input-pequeno">
                    <label>Número</label>
                    <input
                      type="text"
                      name="numero"
                      {...register('numero')}
                      placeholder="exemplo: XXXX"
                    />
                    <p className='error'>{errors.numero?.message}</p>
                  </div>
                  <div className="grupo-formulario input-grande">
                    <label>Logradouro</label>
                    <input
                      type="text"
                      name="logradouro"
                      {...register('logradouro')}
                      placeholder="exemplo: Rua/Av."
                    />
                    <p className='error'>{errors.logradouro?.message}</p>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="grupo-formulario input-medio">
                    <label>CEP</label>
                    <input
                      name="cep"
                      {...register('cep')}
                      placeholder="XXXXX-XXX"
                    />
                    <p className='error'>{errors.cep?.message}</p>
                  </div>
                  <div className="grupo-formulario input-medio">
                    <label>Bairro</label>
                    <input
                      type="text"
                      name="bairro"
                      {...register('bairro')}
                      placeholder="Bairro"
                    />
                    <p className='error'>{errors.bairro?.message}</p>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="grupo-formulario input-medio">
                    <label>Complemento</label>
                    <input
                      type="text"
                      name="complemento"
                      {...register('complemento')}
                      placeholder="exemplo: Apartamento"
                    />
                    <p className='error'>{errors.complemento?.message}</p>
                  </div>
                  <div className="grupo-formulario input-medio">
                    <label>Apelido</label>
                    <input
                      type="text"
                      name="apelido"
                      {...register('apelido')}
                      placeholder="exemplo: Minha casa"
                    />
                    <p className='error'>{errors.apelido?.message}</p>
                  </div>
                </div>
  
                <div className="botoes-formulario">
                  <button type="submit" className={botao-salvar}>
                    {activeBtnDelete ? 'Atualizar endereço' : 'Adicionar endereço'}
                  </button>
  
                  {activeBtnDelete && (
                    <button
                      type="button"
                      className="botao-deletar"
                      onClick={() => handleDelete(enderecoSendoEditado)}
                    >
                      Deletar
                    </button>
                  )}
                </div>{activeBtnDelete && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="botao-cancelar"
                  >
                    Cancelar
                  </button>
                )}
              </form>
            </div>
  
            <div className="enderecos-salvos">
              <h3>Endereços salvos</h3>
              <ul>
                {enderecosCliente.map((endereco, index) => (
                  <li key={index}>
                    <div className="info-endereco">
                      <span>CEP: {endereco.cep}</span>
                      <p>Logradouro: {endereco.logradouro}, {endereco.numero || 'Sem número'}</p>
                      <p>Complemento: {endereco.complemento || 'Sem complemento'}</p>
                      <p>Bairro: {endereco.bairro}</p>
                    </div>
                    <span className="apelido-endereco">{endereco.apelido}</span>
                    <button
                      className="botao-editar"
                      onClick={() => handleEdit(endereco)}
                    >
                      Editar✏️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>  */

  )
}

export default AddEndereco;