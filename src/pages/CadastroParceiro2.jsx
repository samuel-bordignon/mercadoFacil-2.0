import { useNavigate } from 'react-router-dom';
import './CadastroM.css';


function CadastroPerceiro2() {
  const navigate = useNavigate();
  return (
    <div className="esquerda-cadastrese">
    <div className='espacamento'>
      <div className='cabecalho-cadastroM'>
        <h1 className='cabecalho'>Segunda Etapa do Cadastro</h1>
        <img className='botao-voltar' src='Voltar.png' alt="Botão voltar" />
      </div>
      <h2 className='dados'>Insira os dados do Mercado</h2>

      <div className="container-cadastrese">
        <div className="container-inputs">
          <label className="label">CNPJ</label>
          <input type="text" className="input" />

          <label className="label">Nome do Mercado</label>
          <input type="text" className="input" />

          <label className="label">E-mail do Mercado (empresarial)</label>
          <input type="email" className="input" />
        </div>

        <div className="container-inputs2">
          <label className="label">Telefone do Mercado</label>
          <input type="number" className="input" />

          <label className="label">Senha</label>
          <input type="password" className="input" />

          <label className="label">Verifique sua Senha</label>
          <input type="password" className="input" />

          <button className='etapas' onClick={() => navigate('/criarConta/cadastroParceiro3')}>Próxima etapa</button>
        </div>
      </div>
    </div>
  </div>
  );
}


export default CadastroPerceiro2;
