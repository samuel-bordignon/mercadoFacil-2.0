import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalContext } from '../contexts/GlobalContext'
import InputMask from 'react-input-mask'
import './Cadastrese.css'
import Voltar from '../assets/flechaAzul.svg'
import Cover from '../assets/Cover.png'

const validationSchema = z.object({
    cep: z.string().length(9, 'CEP deve ter 8 dígitos').nonempty('CEP é obrigatório'),
    logradouro: z.string().nonempty('Logradouro é obrigatório'),
    bairro: z.string().nonempty('Bairro é obrigatório'),
    numero: z.string().optional(),
    complemento: z.string().optional(),
})

function CadastroCliente2() {
    const navigate = useNavigate()
    const { enderecosdb, setEnderecosdb } = useContext(GlobalContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: enderecosdb
    })

    const onSubmitEndereco = (data) => {
        setEnderecosdb([data]); // Salva o endereço como o primeiro e único no array ao submeter
        console.log("Endereço atualizado:", enderecosdb[0]);
        navigate('/mercados'); // Navega para a próxima página
    }

    return (
        <div className='background-cadastro'>
            <div className='image-container'>
                <img src={Cover} alt="" />
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
                <form onSubmit={handleSubmit(onSubmitEndereco)} className="form-container">
                    <div className="container-inputs">
                        <label className="label">CEP</label>
                        <InputMask
                            mask="99999-999"
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
                            type='text'
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

                        <button type="submit" className='acessarCadastro'>Acessar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CadastroCliente2
