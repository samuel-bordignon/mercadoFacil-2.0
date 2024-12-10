import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'  // Adicionado o useEffect
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import './CadastroM.css'  // Usando o CSS antigo
import './Cadastrese.css'  // Usando o CSS antigo
import Voltar from '../assets/images/Voltar.png'  // Corrigido o caminho da imagem
import Cover from '../assets/images/cover.png'  // Imagem de capa
import NavbarLogo from '../components/NavbarLogo'  // Logo da navbar

function CadastroParceiro3() {
    const { addData, updateData, getLocalStorage, setLocalStorage, chaveEnderecoMercadoLocal, getEndereco } = useContext(GlobalContext)

    const navigate = useNavigate()
    const id = getLocalStorage('id_enderecomercado')
    const idMercado = getLocalStorage('id_mercado')
    const storageLocal = getLocalStorage(chaveEnderecoMercadoLocal)
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const validationSchema = z.object({
        cep: z.string().length(8, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
        logradouro: z.string().nonempty('Logradouro é obrigatório'),
        bairro: z.string().nonempty('Bairro é obrigatório'),
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
            try {
                updateData('enderecomercados', id, {
                    cep: data.cep,
                    bairro: data.bairro,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                    numero: data.numero,
                    latitude: lat,
                    longitude: lng,
                    fk_id_mercado: idMercado

                })
                navigate('/mercadoEstoque')
                setLocalStorage(chaveEnderecoMercadoLocal, data)
                setLocalStorage('cadastroConcluido', true)
            } catch (e) {
                console.log(e)
            }

        } else {
            try {
                addData('enderecomercados', {
                    cep: data.cep,
                    bairro: data.bairro,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                    numero: data.numero,
                    latitude: lat,
                    longitude: lng,
                    fk_id_mercado: idMercado
                })
                navigate('/mercadoEstoque')
                setLocalStorage(chaveEnderecoMercadoLocal, data)
                setLocalStorage('cadastroConcluido', true)
            } catch (e) {
                console.log(e)
            }
        }
    }

    // Verificar se o objeto tem dados válidos
    function verificaDadosObjeto(obj) {
        return Object.keys(obj).length > 0 && Object.values(obj).every(value => value !== null && value !== undefined);
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
                                <h4 className='cabecalho-cadastroMercado'>Terceira Etapa do Cadastro</h4>
                                <button className="btn-cadastro">
                                    <img
                                        className="botao-voltar"
                                        onClick={() => navigate('/criarConta/CadastroParceiro2')}
                                        src={Voltar}
                                        alt="Botão voltar"
                                    />
                                </button>
                            </div>

                            <h2 className='dados-cadastroMercado'>Insira os dados do Endereço</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="form-containerCM" id='form-endereco'>
                            <div className='form-endereco-cliente'>
                                <div className="container-inputs">
                                    <label className="labelCM">CEP</label>
                                    <input
                                        className="input"
                                        {...register('cep')}
                                    />
                                    <p className='error'>{errors.cep?.message}</p>

                                    <label className="labelCM">Bairro</label>
                                    <input
                                        type='text'
                                        className="input"
                                        {...register('bairro')}
                                    />
                                    <p className='error'>{errors.bairro?.message}</p>

                                    <label className="labelCM">Logradouro</label>
                                    <input
                                        type='text'
                                        className="input"
                                        {...register('logradouro')}
                                    />
                                    <p className='error'>{errors.logradouro?.message}</p>

                                </div>
                                <div className="container-inputs">

                                    <label className="labelCM">Número</label>
                                    <input
                                        placeholder='Opcional'
                                        type='text'
                                        className="input"
                                        {...register('numero')}
                                    />
                                    <p className='error'>{errors.numero?.message}</p>

                                    <label className="labelCM">Complemento</label>
                                    <input
                                        type='text'
                                        className="input"
                                        placeholder='Opcional'
                                        {...register('complemento')}
                                    />
                                    <p className='error'>{errors.complemento?.message}</p>

                                    <button type="submit" className='acessarCadastro'>Acessar</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroParceiro3
