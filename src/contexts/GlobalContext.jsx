import { createContext, useState } from "react";


export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
let usuarioLogado = 'ola samuel bordignon'
// let diaHoje = 'quarta'
const [diaHoje, setDiaHoje] = useState('quarta')
    return(
        <GlobalContext.Provider value={{usuarioLogado, diaHoje ,setDiaHoje}}>
            {children}
        </GlobalContext.Provider>
    )
}
