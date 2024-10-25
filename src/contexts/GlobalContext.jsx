import { createContext, useState } from "react";

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
  // Estado para o usuário logado
  let usuarioLogado = 'ola samuel bordignon'
  
  // Estado para o dia atual
  const [diaHoje, setDiaHoje] = useState('quarta')

  // Estado para endereços
  const [enderecosdb, setEnderecosdb] = useState([
    { id: 1, endereco: "Endereço 1", numero: "84", cep: "88058089", atual: true },
    { id: 2, endereco: "Endereço 2", numero: "72", cep: "88058080", atual: false },
    { id: 3, endereco: "Endereço 3", numero: "91", cep: "88058087", atual: false },
  ])

  // Estado para produtos
  const [produtosdb, setProdutosdb] = useState([
    { id: 1, nome: "Arroz Branco", preco: 10.00, quantidade: 1, imagem: "arroz.png", informacaoAdicional: { peso: "5", unidade: "kg" } },
    { id: 2, nome: "Fardo Skol", preco: 5.50, quantidade: 1, imagem: "skol.png", informacaoAdicional: { peso: "12", unidade: "unidades" } },
    { id: 3, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
  ])

  // Estado para mercados
  const [mercadosdb, setMercadosdb] = useState([
    { id: 1, nome: "Mercado do João", endereco: "Rua das Flores, 123", cep: "88058089", logo: "1.png", atual: 'oi' },
    { id: 2, nome: "Mercado do José", endereco: "Rua das Palmeiras, 456", cep: "88058080", logo: "2.png", atual: false },
  ])

  // Função para alterar o endereço atual
  const setAdderessAtual = (cep) => {
    const updatedEnderecos = enderecosdb.map((endereco) => {
      return { ...endereco, atual: endereco.cep === cep }
    })
    setEnderecosdb(updatedEnderecos)
  }

  // Prover estados e funções aos componentes filhos
  return (
    <GlobalContext.Provider value={{
      usuarioLogado, diaHoje, setDiaHoje,
      enderecosdb, setEnderecosdb, setAdderessAtual,
      produtosdb, setProdutosdb,
      mercadosdb, setMercadosdb
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
