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
        <div className='text-loc'>
        <h3>Endereço do mercado</h3>
        <h4>Complemento</h4>
        </div>
        </div>

        <div className='horario-atendimento'>
        <h3>20 - 30 min</h3>
        </div>

        <div className='container-card-mer'>
        <div className='card-mer'>
        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h5>R$ 15,99</h5>

        </div>

        <div className='card-mer-2'>
        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h5>R$ 15,99</h5>

        </div>

        <div className='card-mer-2'>
        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>

        </div>

        <div className='card-mer-2'>
        <h4>Nome do Mercado</h4>
        <p>2,4 Km</p>
        <h4>R$ 15,99</h4>
        </div>

        </div>

        <div className='bot-enviar-lista'>
        <button>Enviar Lista</button>

        </div>
        </div>

        <div className='lista-merc'>

          <div className='cabecario-list'>
          <div className='lugar-da-foto-redonda'></div>
          <p>Nome do mercado</p>
          <button>Ver catálago</button>
          </div>

          <hr />

          <div className='produto-nao-encontrado'>
          <h2>Não encontramos 2 itens da lista</h2>
          <div className='detalhe'>
          <h3>Nome do mercado</h3>
          <h5>Peso/Qualquer coisa</h5>
            <h3>R$ 0,00</h3>
          </div>
          <p className='remover'>Remover</p>
          </div>
          
          <div className='add'>
          <i class="bi bi-dash"></i>
          <h5>1</h5>
          <i class="bi bi-plus"></i>
          </div>
          <hr />
          <div className='detalhe'>
          <h3>Nome do mercado</h3>
          <h5>Peso/Qualquer coisa</h5>
          <h3>R$ 0,00</h3>
          </div>
          <p className='remover'>Remover</p>
          <div className='add-icon'>
          <i class="bi bi-dash"></i>
          <h3>1</h3>
          <i class="bi bi-plus"></i>

          </div>

        </div>



    </div>
  )
}

export default ComparacaoLista
