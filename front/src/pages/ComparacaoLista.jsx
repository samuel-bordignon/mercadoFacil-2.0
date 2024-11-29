import React from 'react'
import './ComparacaoLista.css'

function ComparacaoLista() {
  return (
    <div>
      <div className='navBar-comparaLista'>
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
        <div className='cabecario-mer'>
        <div className='logo-mercado-compara-lista'></div>
        <h3>Nome do Mercado</h3>
        </div>
        <h4>2,4 Km</h4>
        <h4>R$ 15,99</h4>

        </div>

        <div className='card-mer-2'>
        <div className='cabecario-mer'>
        <div className='logo-mercado-compara-lista' ></div>
        <h3>Nome do Mercado</h3>
        </div>
        <h4>2,4 Km</h4>
        <h4>R$ 15,99</h4>

        </div>

        <div className='card-mer-2'>
        <div className='cabecario-mer'>
        <div className='logo-mercado-compara-lista'></div>
        <h3>Nome do Mercado</h3>
        </div>
        <h4>2,4 Km</h4>
        <h4>R$ 15,99</h4>

        </div>

        <div className='card-mer-2'>
        <div className='cabecario-mer'>
        <div className='logo-mercado-compara-lista'></div>
        <h3>Nome do Mercado</h3>
        </div>
        <h4>2,4 Km</h4>
        <h4>R$ 15,99</h4>
        </div>

        </div>

        <div className='bot-enviar-lista'>
        <button>Enviar Lista</button>

        </div>
        </div>

{/* SidBar da lista de produtos não encontrados e que precisaram ser substituidos */}

        <div className='lista-merc'>

          <div className='cabecario-list'>
          <div className='foto-redonda'></div>
          <p>Nome do mercado</p>
          <button>Ver catálago</button>
          </div>

          <hr />

          <div className='produto-nao-encontrado'>
          <h4>Não encontramos 2 itens da lista</h4>
          <div className='foto-produto'>
          <img src="oleo.png" alt="" />
          <div className='detalhe'>
          <h3>Nome do produto</h3>
          <h5>Peso/Qualquer coisa</h5>
          <h3>R$ 0,00</h3>
          </div>
          </div>
          </div>

          <div className='add'>
          <button className='but-remover'>Remover</button>
          <div className='menosÉmais'>
          <i class="bi bi-dash"></i>
          <h5>1</h5>
          <i class="bi bi-plus"></i>
          </div>
          </div>
          
          <hr />

          <div className='produto-nao-encontrado'>
          <div className='foto-produto'>
          <img src="oleo.png" alt="" />
          <div className='detalhe'>
          <h3>Nome do mercado</h3>
          <h5>Peso/Qualquer coisa</h5>
          <h3>R$ 0,00</h3>
          </div>
          </div>
          <div className='add'>
          <button className='remover'>Remover</button>
          <i class="bi bi-dash-lg"></i>
          <h5>1</h5>
          <i class="bi bi-plus-lg"></i>
          </div>
          </div>

          <hr />

          <div className='produto-nao-encontrado'>
          <h4>Substituimos pelos seguintes itens</h4>
          <div className='foto-produto'>
          <img src="oleo.png" alt="" />
          <div className='detalhe'>
          <h3>Nome do produto</h3>
          <h5>Peso/Qualquer coisa</h5>
          <h3>R$ 0,00</h3>
          </div>
          </div>
          </div>

          <div className='add'>
          <button className='but-remover'>Remover</button>
          <div className='menosÉmais'>
          <i class="bi bi-dash"></i>
          <h5>1</h5>
          <i class="bi bi-plus"></i>
          </div>
          </div>
          
          <hr />

          <div className='produto-nao-encontrado'>
          <div className='foto-produto'>
          <img src="oleo.png" alt="" />
          <div className='detalhe'>
          <h3>Nome do produto</h3>
          <h5>Peso/Qualquer coisa</h5>
          <h3>R$ 0,00</h3>
          </div>
          </div>
          <div className='add'>
          <button className='remover'>Remover</button>
          <i class="bi bi-dash-lg"></i>
          <h5>1</h5>
          <i class="bi bi-plus-lg"></i>
          </div>
          </div>
        </div>



    </div>
  )
}

export default ComparacaoLista
