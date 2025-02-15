import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cover from '../assets/images/cover.png'; // Certifique-se de que o caminho da imagem está correto
import NavbarLogo from '../components/NavbarLogo';
import SetaBranca from '../assets/images/setaBranca.png';
import Voltar from '../assets/images/Voltar.png'; // Importando a imagem corretamente
import './AcessoU.css';

function LoginCliente() {
  const { login, setLocalStorage  } = useContext(GlobalContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Definindo o esquema de validação com zod
  const validationSchema = z.object({
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onLogin = async (data) => {
    const { email, senha } = data;

    try {
        const result = await login('clientes', 'email', email, senha);
        if (result.loginSuccess) {
            setMessage('Login realizado com sucesso!');
            navigate('/mercados'); // Redirecionar para a página de mercados
            setLocalStorage('hasSeenWelcome', true) //garante que o poppup de boas vindas não apareça novamente
            setLocalStorage('id_cliente', result.user.id_cliente) //salva o id do cliente no local storage
        } else {
            setMessage(result.message); // Mostrar mensagem retornada pela API
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            // Mensagem retornada pela API
            setMessage(error.response.data.message);
        } else {
            // Mensagem genérica para outros erros
            setMessage('Ocorreu um erro inesperado.');
        }
        console.error('Erro no login:', error);
    }             
};


  return (
    <div className='containerAzul'>
      <NavbarLogo />

        <div className="container">
          {/* Imagem de Capa */}
          <img className="direita" src={Cover} alt="Imagem de capa" />

        <div className="esquerdaAcesso login">
          <div className="espacamento">
            <div className="cabecalho-acesso">
              <h1 className="poppins-semibold">Acesse Fácil</h1>
              {/* Botão Voltar */}
              <img
                className="botao-voltar"
                src={Voltar}
                alt="Botão voltar"
                onClick={() => navigate(-1)} // Voltar para a página anterior
              />
            </div>

            <form
              onSubmit={handleSubmit(onLogin)}
              className="container-inputsLoginCliente"
            >
              <label className="label">E-mail</label>
              <input
                type="email"
                className="input-LoginCliente"
                {...register('email')}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}

              <label className="label">Senha</label>
              <input
                type="password"
                className="input-LoginCliente"
                {...register('senha')}
              />
              {errors.senha && (
                <span className="error-message">{errors.senha.message}</span>
              )}
              {message && <p className="login-message" style={{color: 'red'}}>{message}</p>}
              <button className="acessar" type="submit" style={{marginTop: '50px'}}>
                Acessar
                <img
                  className="seta"
                  src={SetaBranca}
                  alt="Seta branca apontando para direita"
                />
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCliente;
