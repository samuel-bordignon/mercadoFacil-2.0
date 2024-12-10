import Voltar from '../assets/images/Voltar.png';
import Casa from '../assets/images/casaIcone.png';
import Cafe from '../assets/images/cafeIcone.png';
import Endereco from '../assets/images/EnderecoIMG.png';
import Localizacao from '../assets/images/Localizacao.png';
import SetaVerde from '../assets/images/setaVerde.png';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import './AddEndereco.css';

function Alelec() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
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
                                    <button className="btn-salvar">Salvar Endereço</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="enderecosSalvos">
                        <div className="quadradinhoBranco">
                            <div className="paddingEnd">
                                <div className="cabecalhoEnd">
                                    <button>
                                        <img
                                            className="setaVerde"
                                            src={SetaVerde}
                                            alt="Botão verde"
                                        />
                                    </button>

                                    <h2 className='EndSalvos'>Endereços Salvos</h2>
                                </div>

                                <div id="search-barEnd">
                                    <input
                                        type="text"
                                        placeholder="Busque por mercados"
                                        className="search-inputEnd"
                                    // Mostrar lista ao clicar
                                    />
                                </div>

                                <div className="loc">
                                    <img src={Localizacao} alt="ícone de localização" />
                                    <div className="emLinha">
                                        <h3 className="preto">Usar minha localização</h3>
                                        <h3 className="cinza">Rod. José Carlos Daux - Saco Grande - Florianópolis</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alelec;