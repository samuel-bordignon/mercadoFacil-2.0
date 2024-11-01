import { createContext, useState } from "react";

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    // Estado para endereços
    const [enderecosdb, setEnderecosdb] = useState([])
    // Estado para produtos
    const [produtosdb, setProdutosdb] = useState([
        { id: 1, nome: "Arroz Branco", preco: 10.00, quantidade: 1, imagem: "arroz.png", informacaoAdicional: { peso: "5", unidade: "kg" } },
        { id: 2, nome: "Fardo Skol", preco: 5.50, quantidade: 1, imagem: "skol.png", informacaoAdicional: { peso: "12", unidade: "unidades" } },
        { id: 3, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 4, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 5, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 6, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
    ])
    // Estado para mercados
    const [mercadosdb, setMercadosdb] = useState([{}])
    // Estado para Usuário logado
    const [clientedb, setClientedb] = useState({})
    // Estado para Parceiro logado
    const [parceirodb, setParceirodb] = useState({
        id: 1,
        nome: "",
        cpf: "",
        dataNascimento: "",
        senha: "",
        telefone: "",
        email: "",
        mercado: {
            nome: "",
            logo: "",
            celular: "",
            email: "",
            cnpj: "",
            endereco: {
                cep: "",
                bairro: "",
                logradouro: "",
                numero: "",
                complemento: ""
            },
        }
    })

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
            enderecosdb, setEnderecosdb,
            setAdderessAtual,
            produtosdb, setProdutosdb,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            parceirodb, setParceirodb
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
