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

        <div className='info-localizacao'>
        <img src="/public/endereco.png" alt="" />
        <h3>Endereço do mercado</h3>
        <h4>Complemento</h4>
        </div>

        <div className='card-mer'>
        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>

        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>

        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>

        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>
        </div>

        <button>Enviar Lista</button>

      </div>


    </div>
  )
}

export default ComparacaoLista
