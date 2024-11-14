import React from 'react'
import './ComparacaoLista.css'

function ComparacaoLista() {
  return (
    <div>
      <div className='comparacaoLista'>
        <button>Voltar</button>
        <img src="/public/logo.png" alt="" />
      </div>
      <div className='container-comparaLista'>
        <h1>Compare sua Lista de Compras</h1>
        <i class="bi bi-bicycle"></i>
        <i class="bi bi-car-front"></i>
        <i class="bi bi-person-walking"></i>

      </div>
    </div>
  )
}

export default ComparacaoLista
