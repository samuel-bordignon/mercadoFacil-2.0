import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './AddEndereco.css'
import Voltar from '../assets/images/Voltar.png';
import Casa from '../assets/images/casaIcone.png';
import Cafe from '../assets/images/cafeIcone.png';
import Endereco from '../assets/images/EnderecoIMG.png';
import Localizacao from '../assets/images/Localizacao.png';
import SetaVerde from '../assets/images/setaVerde.png';


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

  const listaCompras = getLocalStorage('listaDefout')
  const [produtosdb, setProdutosdb] = useState([])

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
    <div>
      <Navbar listaCompras={listaCompras} produtosdb={[]} setProdutosdb={setProdutosdb} />
      <div className="backgroundCinza">
        <div className="containerEnderecos">
          <div className="adicionarEndereco">
            <div className="cabecalhoEndereco">
              <div className="container-detalhes-endereco">

                <h1 className="letrinhaSafada">Adicionar meu endereço</h1>
                <h2 className="letrinhaSafada2">Onde você quer receber seu pedido?</h2>
              </div>
              <button className="btn-cadastro">
                <img
                  className="botao-voltarCliente3"
                  src={Voltar}
                  alt="Botão voltar"
                />
              </button>
            </div>
            <div className="divTotalEsqDir">
              <div className="ladoEsquerdo">
                <div className="inputs-div">
                  <div className="favEndereco">
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

                    <div className="linha">
                      <div className="campo">
                        <label className="label-endereco" htmlFor="complemento">Complemento</label>
                        <input id="complemento" className="input-grande" type="text" {...register("complemento")} />
                      </div>
                    </div>

                    <div className="linha">
                      <div className="campo">
                        <label className="label-endereco" htmlFor="cep">CEP</label>
                        <InputMask mask="99999-999" id="cep" className="input-medio" {...register("cep")} />
                      </div>
                      <div className="campo">
                        <label className="label-endereco" htmlFor="bairro">Bairro</label>
                        <input id="bairro" className="input-medio" type="text" {...register("bairro")} />
                      </div>
                    </div>

                    <div className="linha">
                      <div className="campo">
                        <label className="label-endereco" htmlFor="pontoReferencia">Ponto de Referência</label>
                        <input id="pontoReferencia" className="input-grande" type="text" {...register("apelido")} />
                      </div>
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
              <div className="ladoDireito">
                <img className='bonequinha' src={Endereco} alt="imagem de endereço" />
                <div className="alinhamentoBotoes">
                  <button
                    className="btn-salvar"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Salvar Endereço
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="enderecosSalvos">
            <div className="quadradinhoBranco">
              <div className="cabecalhoEnd">
                <h2 className="EndSalvos">Endereços Salvos</h2>
                <hr  className='linha'/>
              </div>
              {/* Mapeando os endereços */}
              <div className="enderecos-lista">
                {enderecosCliente.map((endereco) => (
                  <div key={endereco.id_enderecocliente} className="loc">
                    <div className="info-endereco">
                      <span className="apelido">{endereco.apelido}</span>
                      <p>{endereco.logradouro}, {endereco.numero}</p>
                      <p>{endereco.bairro}</p>
                      <p>{endereco.complemento}</p>
                    </div>
                    <div className="acoes-endereco">
                      <button onClick={() => handleEdit(endereco)}>Editar</button>
                      <button onClick={() => handleDelete(endereco.id_enderecocliente)}>Deletar</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEndereco;