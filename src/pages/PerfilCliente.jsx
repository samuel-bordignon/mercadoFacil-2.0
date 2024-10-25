import React from 'react'
import Navbar from '../components/Navbar'
import './PerfilCliente.css'

function PerfilCliente() {



  return (
    <div className='tela-usuario'>
      <Navbar />
      <div className='cabecario'>
      <h1>Informações da Conta</h1>
      </div>
      <div className='container-informacoes'>
      <h2>Informações Pessoais</h2>
      <button>Editar</button>
      <div className='informacoes-detalhadas'>
      <label>Nome</label><br /><br />
      <input type="text" id="nome" value="João do Plugrande Silva" /><br />
      <hr /><br />
      <label>cpf</label><br /><br />
      <input type="text" id="cpf" value="123456789" /><br />
      <hr /><br />
      <label>Data de Nascimento</label><br /><br />
      <input type="date" id="dataNascimento" value="2000/00/00"/><br />
      <hr /><br />
      <label>Senha</label><br /><br />
      <input type="password" id="senha" value="123456" /><br />
      <hr /><br />
      </div>

      <div className='container-contato'>
      <h2>Contato</h2>
      <button>Editar</button>
      <div className='informacoes-detalhadas-contato'><br />
      <label>Telefone</label><br /><br />
      <input type="text" id="telefone" value="João do Plugrande Silva" /><br />
      <hr /><br />
      <label>Email</label><br /><br />
      <input type="email" id="email" value="joaoplugrande@gmail"br />
      <hr /><br />
      </div>

      <div className='container-endereco'>
      <h2>Endereço</h2>
      <button>Editar</button>
      <div className='informacoes-detalhadas-endereco'></div>
      <label>CEP</label><br /><br />
      <input type="text" id="cep" value="88888888"/><br />
      <hr /><br />
      <label>Bairro</label><br /><br />
      <input type="text" id='bairro' value="Ingleses" /><br />
      <hr /><br />
      <label>Lougradoro</label><br /><br />
      <input type="text" id="logradouro" value="Rua do Ingleses" />
      <hr /><br />
      <label>Numero</label><br /><br />
      <input type="text" id="numero" value="23" /><br />
      <hr /><br />
      <label>Complemento</label><br /><br />
      <input type="text" id="complemento" value="Apto 101"></input><br />
      <hr /><br />


      </div>

      </div>
      </div>
    </div>
  )
}

export default PerfilCliente
