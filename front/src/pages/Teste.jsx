import React from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext, useState } from 'react'


function Teste() {
    const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey, compararListaDeCompras } = useContext(GlobalContext)
    const lista = getLocalStorage('listaDefout')
    const idMercado = 5
    const [resultado, setResultado] = useState(null)
    compararListaDeCompras(idMercado, lista)
    async function handleComparacao() {
        const res = await compararListaDeCompras(idMercado, lista);
    }
    return (
        <div>
            <button onClick={handleComparacao}>Comparar</button>
            <h1>Teste com a função de coparar listas</h1>
            <h3>Resultado:</h3>
        </div>
    )
}

export default Teste
