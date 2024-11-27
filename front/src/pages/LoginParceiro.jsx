import './Acessos.css';
import './EscolhaCadastro.css';
import './LoginMercado.css';
import Cover from '../assets/images/cover.png';
import SetaBranca from '../assets/images/setaBranca.png';
import NavbarLogo from '../components/NavbarLogo';
import Voltar from '../assets/images/Voltar.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function LoginParceiro() {
    const navigate = useNavigate();
    const [paginaAtual, setPaginaAtual] = useState('loginParceiro');
    const [selectedInfo, setSelectedInfo] = useState(''); // Definição do estado selectedInfo
    const [selectedOption, setSelectedOption] = useState('');
    const [submittedValue, setSubmittedValue] = useState(null);
    const [formLog, setFormLog] = useState({ identificador: '', senha: '' });

    const { login } = useContext(GlobalContext);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedOption) {
            alert('Por favor, selecione uma informação antes de continuar.');
            return;
        }
        setSubmittedValue(selectedOption);
        console.log(selectedOption); // Use o valor diretamente
        setPaginaAtual('loginParceiro2');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // const { email, senha } = formLog

        const result = await login('parceiros', selectedOption, 'senha', 'senha');

        if (result.success) {
            // setMessage(result.message)  // Exibe mensagem de sucesso
            // Redirecionar ou atualizar o estado da aplicação após login bem-sucedido
            navigate('/mercados');
        } else {
            // setMessage(result.message)  // Exibe mensagem de erro
        }
    };

    return (
        <div>
            {/* Primeira seção: loginParceiro */}
            {paginaAtual === 'loginParceiro' && (
                <div>
                    <NavbarLogo />

                    <div className="container">
                        <img className="direita" src={Cover} alt="Imagem de capa" />

                        <div className="esquerda login">
                            <div className="espacamento-acessoM">
                                <div className="cabecalho-acessoM">
                                    <h1 className="acesso-h1">Acesse Fácil</h1>
                                    <img
                                        className="botao-voltar"
                                        src={Voltar}
                                        alt="Botão voltar"
                                        onClick={() => navigate(-1)}
                                    />
                                </div>

                                <div className="container-inputs">
                                    <label className="informacao">Qual informação você quer usar?</label>
                                    <select
                                        className="input-select"
                                        value={selectedInfo}
                                        onChange={(e) => setSelectedInfo(e.target.value)} // Atualizando selectedInfo
                                    >
                                        <option value="" disabled>
                                            Selecione
                                        </option>
                                        <option value="cpf">CPF</option>
                                        <option value="cnpj">CNPJ</option>
                                        <option value="mei">MEI</option>
                                        <option value="email">Email</option>
                                    </select>

                                    <span className="Span">Selecione uma informação</span>

                                    <div className="container-botoes">
                                        <button
                                            className="continuar"
                                            onClick={() => setPaginaAtual('loginParceiro2')}
                                            disabled={!selectedInfo} // Desabilitar o botão caso não tenha selecionado
                                        >
                                            Continuar
                                        </button>

                                        <button className="abrir-conta" onClick={() => setPaginaAtual('logindois')}>
                                            Abrir conta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Segunda seção: loginParceiro2 */}
            {paginaAtual === 'loginParceiro2' && (
                <div>
                    <NavbarLogo />
                    <div className="container">
                        <img className="direita" src={Cover} alt="Imagem de capa" />

                        <div className="esquerdaAcesso loginM">
                            <div className="espacamento">
                                <div className="cabecalho-acessoM2">
                                    <h1 className="poppins-semibold">Acesse Fácil</h1>
                                    <img
                                        className="botao-voltar"
                                        src={Voltar}
                                        alt="Botão voltar"
                                        onClick={() => navigate(-1)}
                                    />
                                </div>

                                <div className="container-inputsM">
                                    {/* Mudando o label com base na escolha do parceiro */}
                                    <label className="label">{selectedInfo.toUpperCase()}</label>
                                    <input type="text" className="input-LoginCliente" />

                                    <label className="label">Senha</label>
                                    <input type="password" className="input-LoginCliente" />

                                    <span className="Span">A senha precisa ter 8 ou mais caracteres.</span>
                                    <button className="reset-senha">Esqueci a senha</button>
                                    <button
                                        className="acessar2 btnSeta"
                                        onClick={() => setPaginaAtual('mercados')}
                                        disabled={!selectedInfo} // Desabilitar o botão se selectedInfo não for válido
                                    >
                                        Acessar
                                        <img className="seta" src={SetaBranca} alt="Seta branca apontando para direita" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginParceiro;
