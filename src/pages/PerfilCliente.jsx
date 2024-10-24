import React from 'react'
import Navbar from '../components/Navbar'
import './PerfilCliente.css'

function PerfilCliente() {



  return (
    <div>
      <Navbar />
      <h1 className='cabecario'>Informações da Conta</h1>
      <div className='container-informacoes'>
      <h2>Informações Pessoais</h2>
      <button>Editar</button>

      </div>
    </div>
  )
}

export default PerfilCliente
