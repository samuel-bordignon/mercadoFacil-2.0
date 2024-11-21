import Navbar from "../components/Navbar"

import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState } from 'react'

function TelaInfoProduto() {


    const idMercado = getLocalStorage(chaveMercadoLocal)

    return (
        <div className='tudo-tela'>
            <Navbar />
            <div className="tela-info-mercado">
                <div className="sideBar-dentro-mercado">

                </div>
            </div>

        </div>
    )
}

export default TelaInfoProduto
