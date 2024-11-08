import React from 'react'
import Sidebar from '../components/Sidebar'
import { GlobalContext } from '../contexts/GlobalContext'
import { useState, useContext } from 'react'

function MercadoEstoque() {
  return (
    <div>
      <Sidebar/>
      <div className="container-mercadoEstoque">
        
      </div>
    </div>
  )
}

export default MercadoEstoque
