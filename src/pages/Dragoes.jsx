import React from 'react'
import Navbar from '../components/Navbar'
import { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'


function Dragoes() {
    const {setDiaHoje, diaHoje} = useContext(GlobalContext)

    function mudarDia() {
        let dia = prompt('Qual dia da semana?')
        setDiaHoje(dia)
    }
  return (
    <div>
        <Navbar />
        {diaHoje}
      <h1>Dragões</h1>
      <p>Porque eles são</p>
        <button onClick={mudarDia}>Mudar dia</button>
    </div>
  )
}

export default Dragoes
