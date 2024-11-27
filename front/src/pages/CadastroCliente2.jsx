import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import './Cadastrese.css'
import Voltar from '../assets/flechaAzul.svg'
import Cover from '../assets/Cover.png'

function CadastroCliente2() {
    const { addData, updateData, getLocalStorage, setLocalStorage, chaveEnderecoClienteLocal, getEndereco, addRelation } = useContext(GlobalContext)

    const navigate = useNavigate()
    const id = getLocalStorage('id_enderecocliente')
    const storageLocal = getLocalStorage(chaveEnderecoClienteLocal)
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const validationSchema = z.object({
        cep: z.string().length(8, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
        logradouro: z.string().nonempty('Logradouro é obrigatório'),
        bairro: z.string().nonempty('Bairro é obrigatório'),
        apelido: z.string().nonempty('Apelido é obrigatório'),
        numero: z.string().optional(),
        complemento: z.string().optional(),
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
                    setValue('cidade', data.city)
                    setValue('estado', data.state)
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
            await updateData('enderecoclientes', id, {
                cep: data.cep,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                latitude: lat,
                longitude: lng,
                apelido: data.apelido,
                complemento: data.complemento
            })
        } else {
            await addData('enderecoclientes', {
                cep: data.cep,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                latitude: lat,
                longitude: lng,
                apelido: data.apelido,
                complemento: data.complemento
            })
        }

        // Atualize o LocalStorage com os dados do endereço
        setLocalStorage(chaveEnderecoClienteLocal, data)

        // Verifique as condições para realizar o POST na tabela de relação e avançar de tela
        const isClienteUpdated = getLocalStorage('isClienteVality') === true
        const isEnderecoUpdated = getLocalStorage('isEnderecoClienteVality') === true
        const idCliente = getLocalStorage('id_cliente')
        const idEndereco = getLocalStorage('id_enderecocliente')

        if (isClienteUpdated && isEnderecoUpdated && idCliente && idEndereco) {
            console.log('Adicionando a tabela enderecoclientes...')
            await addData('endereco_cliente_relecao', {
                fk_id_cliente: idCliente,
                fk_id_enderecocliente: idEndereco
            })

            // Atualize os indicadores no LocalStorage
            setLocalStorage('isClienteVality', false)
            setLocalStorage('isEnderecoClienteVality', false)

            // Avance para a próxima tela
            navigate('/mercados')
        } else {
            console.error('Erro: Cliente ou Endereço não foram atualizados corretamente.')
        }
    }


    // Verificar se o objeto tem dados válidos
    function verificaDadosObjeto(obj) {
        return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined)
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
                                type='number'
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

                            <label className="label">Logradouro</label>
                            <input
                                type='text'
                                className="input"
                                {...register('logradouro')}
                            />
                            <p className='error'>{errors.logradouro?.message}</p>
                        </div>
                        <div className="container-inputs">
                            <label className="label">Número</label>
                            <input
                                placeholder='Opcional'
                                type='number'
                                className="input"
                                {...register('numero')}
                            />
                            <p style={{ visibility: 'hidden' }} className='error'></p>

                            <label className="label">Complemento</label>
                            <input
                                placeholder='Opcional'
                                type='text'
                                className="input"
                                {...register('complemento')}
                            />
                            <p style={{ visibility: 'hidden' }} className='error'></p>

                            <label className="label">Apelido</label>
                            <input
                                placeholder='Como você deseja chamar esse endereço'
                                type='text'
                                className="input"
                                {...register('apelido')}
                            />
                            <p className='error'>{errors.apelido?.message}</p>
                        </div>
                    </div>
                    <button type="submit" className='acessarCadastro'>Acessar</button>
                </form>
            </div>
        </div>
    )
}

export default CadastroCliente2
