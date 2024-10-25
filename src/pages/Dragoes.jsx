import React from 'react'
import Navbar from '../components/Navbar'
import { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'


function Dragoes() {
    const {setDiaHoje, diaHoje, produtosdb} = useContext(GlobalContext)

    function mudarDia() {
        let dia = prompt('Qual dia da semana?')
        setDiaHoje(dia)
    }
  return (
    <div>
        <Navbar />
        {diaHoje}
        {produtosdb.map((produto) => {
            return (
                <div key={produto.id}>
                    <h2>{produto.nome}</h2>
                    <p>{produto.preco}</p>
                </div>
            )})
        }
      <h1>Dragões</h1>
      <p>Porque eles são</p>
        <button onClick={mudarDia}>Mudar dia</button>
    </div>
  )
}

export default Dragoes
