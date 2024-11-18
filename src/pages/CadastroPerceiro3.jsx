import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import './Cadastrese.css'
import Voltar from '../assets/flechaAzul.svg'
import Cover from '../assets/Cover.png'

function CadastroPerceiro3() {
  const { addData, updateData, getLocalStorage, setLocalStorage, chaveEnderecoMercadoLocal, getEndereco } = useContext(GlobalContext)
    
  const navigate = useNavigate()
  const id = getLocalStorage('id_enderecomercado')
  const storageLocal = getLocalStorage(chaveEnderecoMercadoLocal)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const validationSchema = z.object({
      cep: z.string().length(8, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
      logradouro: z.string().nonempty('Logradouro é obrigatório'),
      bairro: z.string().nonempty('Bairro é obrigatório'),
      numero: z.string().optional(),
  })
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
      resolver: zodResolver(validationSchema),
      defaultValues: storageLocal || { cep: '', logradouro: '', bairro: '', apelido: '', numero: '', complemento: '' }
  })
  const cep = watch('cep')

  useEffect(() => {
      const fetchEndereco = async () => {
          if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
              const data = await getEndereco(cep)
              if (data) {
                  // Preenche os campos automaticamente
                  setValue('logradouro', data.address)
                  setValue('bairro', data.district)
                  // Obter as coordenadas (latitude e longitude)
                  setLat(data.lat) 
                  setLng(data.lng)
              }
          }
      }
      // Chama a função somente se o CEP tiver 8 caracteres
      if (cep) {
          fetchEndereco()
      }
  }, [cep, setValue, getEndereco])

  const onSubmit = async (data) => {

      if (verificaDadosObjeto(storageLocal)) {
          updateData('enderecomercados', id, {
              cep: data.cep,
              bairro: data.bairro,
              logradouro: data.logradouro,
              numero: data.numero,
              latitude: lat,
              longitude: lng,
              fk_id_mercado: getLocalStorage('id_mercado')
              
            })
          } else {
          addData('enderecomercados', {
              cep: data.cep,
              bairro: data.bairro,
              logradouro: data.logradouro,
              numero: data.numero,
              latitude: lat,
              longitude: lng,
              fk_id_mercado: getLocalStorage('id_mercado')
            })
      }
      setLocalStorage(chaveEnderecoMercadoLocal, data)
      navigate('/mercados')
  }

  // Verificar se o objeto tem dados válidos
  function verificaDadosObjeto(obj) {
      return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
  }

  return (
    <div className='background-cadastro'>
            <div className='image-container'>
                <img src={Cover} alt="Imagem de capa" />
            </div>
            <div className="cadastrese-container">
                <div className='cabecalho-cadastro'>
                    <h1>Cadastre-se</h1>
                    <img className='botao-voltar' src={Voltar} alt="Botão voltar" onClick={() => navigate('/criarConta/CadastroCliente')} />
                </div>
                <div className='detalhes-container'>
                    <p>Torne sua vida fácil</p>
                    <h2 className='etapa1'>Endereço</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container" id='form-endereco'>
                    <div className='form-endereco-cliente'>
                        <div className="container-inputs">
                            <label className="label">CEP</label>
                            <input
                                className="input"
                                {...register('cep')}
                            />
                            <p className='error'>{errors.cep?.message}</p>

                            <label className="label">Bairro</label>
                            <input
                                type='text'
                                className="input"
                                {...register('bairro')}
                            />
                            <p className='error'>{errors.bairro?.message}</p>

                        </div>
                        <div className="container-inputs">
                            <label className="label">Logradouro</label>
                            <input
                                type='text'
                                className="input"
                                {...register('logradouro')}
                            />
                            <p className='error'>{errors.logradouro?.message}</p>

                            <label className="label">Número</label>
                            <input
                                placeholder='Opcional'
                                type='text'
                                className="input"
                                {...register('numero')}
                            />
                            <p style={{ visibility: 'hidden' }} className='error'></p>

                        </div>
                    </div>
                    <button type="submit" className='acessarCadastro'>Acessar</button>
                </form>
            </div>
        </div>
  )
}

export default CadastroPerceiro3
