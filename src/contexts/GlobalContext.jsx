import { createContext, useState } from "react"

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    // Estado para endereços
    const [enderecosdb, setEnderecosdb] = useState([])

    // Estado para produtos
    const [produtosdb, setProdutosdb] = useState([
        { id: 1, idMercado: 2, nome: "Arroz Branco", preco: 10.00, quantidade: 1, imagem: "arroz.png", informacaoAdicional: { peso: "5", unidade: "kg" } },
        { id: 2, idMercado: 1, nome: "Fardo Skol", preco: 5.50, quantidade: 1, imagem: "skol.png", informacaoAdicional: { peso: "12", unidade: "unidades" } },
        { id: 3, idMercado: 5, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 4, idMercado: 4, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 5, idMercado: 6, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 6, idMercado: 3, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
    ])

    // Estado para mercados
    const [mercadosdb, setMercadosdb] = useState([
        { id: 1, nome: "Mercado do João", cnpj: "00000000000000", logo: "1.png", telefone: 554899749819, email: "joao.mercado@gmail.com" },
        { id: 2, nome: "Mercado do José", cnpj: "00000001111111", logo: "2.png", telefone: 554893583919, email: "jose.mercado@gmail.com" },
        { id: 3, nome: "Mercado do Pedro", cnpj: "11111111111111", logo: "3.png", telefone: 554899749820, email: "pedro.mercado@gmail.com" },
        { id: 4, nome: "Mercadinho Logo Ali", cnpj: "22222222222222", logo: "mercadinho-logo-ali.png", telefone: 554899749821, email: "logo.ali.mercado@gmail.com" },
        { id: 5, nome: "Mercado da Lua", cnpj: "33333333333333", logo: "5.png", telefone: 554899749822, email: "lua.mercado@gmail.com" },
        { id: 6, nome: "Mercadinho da Esquina", cnpj: "44444444444444", logo: "6.png", telefone: 554899749823, email: "esquina.mercado@gmail.com" },
        { id: 7, nome: "Mercado do Carlos", cnpj: "55555555555555", logo: "7.png", telefone: 554899749824, email: "carlos.mercado@gmail.com" },
        { id: 8, nome: "Mercado da Ana", cnpj: "66666666666666", logo: "8.png", telefone: 554899749825, email: "ana.mercado@gmail.com" },
        { id: 9, nome: "Mercado do Rodrigo", cnpj: "77777777777777", logo: "9.png", telefone: 554899749826, email: "rodrigo.mercado@gmail.com" },
    ])

    const [enderecoMercadodb, setEnderecoMercadodb] = useState([
        { id: 1, idMercado: 1, cep: 89122234, logradouro: "Rua das Flores" },
        { id: 2, idMercado: 2, cep: 86869274, logradouro: "Rua das Águas" },
        { id: 3, idMercado: 3, cep: 91543867, logradouro: "Rua das Praias" },
        { id: 4, idMercado: 4, cep: 76924013, logradouro: "Av. dos Cristais" },
        { id: 5, idMercado: 5, cep: 82054185, logradouro: "Rua dos Papagaios" },
        { id: 6, idMercado: 6, cep: 80346573, logradouro: "Rua da Figueira" },
        { id: 7, idMercado: 7, cep: 81205743, logradouro: "Av. do Beija-Flor" },
        { id: 8, idMercado: 8, cep: 70456332, logradouro: "Av. da Lua" },
        { id: 9, idMercado: 9, cep: 23479643, logradouro: "Rua da Estrela" },
    ])

    const [horarioFuncionamento, setHorarioFuncionamento] = useState([
        {
            domingo: { inicio: "08:00", fim: "20:00" },
            segunda: { inicio: "08:00", fim: "20:00" },
            terca: { inicio: "08:00", fim: "20:00" },
            quarta: { inicio: "08:00", fim: "20:00" },
            quinta: { inicio: "08:00", fim: "20:00" },
            sexta: { inicio: "08:00", fim: "20:00" },
            sabado: { inicio: "08:00", fim: "20:00" },
            idMercado: 1,
            id: 1,
        },
        // Adicione mais objetos de horários conforme necessário
    ])

    const [gerentedb, setGerentedb] = useState([
        {
            id: 1,
            idMercado: 1,
            nome: "João da Silva",
            cpf: "123456789",
            dataNascimento: "2000-01-01",
            senha: "123456",
            telefone: "48999999999",
            email: "",
        },
        {
            id: 2,
            idMercado: 2,
            nome: "Maria da Silva",
            cpf: "987654321",
            dataNascimento: "2001-01-01",
            senha: "123456",
            telefone: "48988888888",
            email: "",
        },
    ])

    const mercadosVisitados = [
        { nome: 'Big by Carrefour', distancia: '5.6 km', tempo: '146-156 min', logo: 'image1.png' },
        { nome: 'Nome do Mercado 2', distancia: '3.2 km', tempo: '120-130 min', logo: 'image2.avif' },
        // Adicione mais mercados conforme necessário
    ]

    const [idMercadoAtivo, setIdMercadoAtivo] = useState()

    // Estado para Usuário logado
    const [clientedb, setClientedb] = useState({})

    // Exemplo de categorias
    const categoryOptions = [
        { value: 'categoria1', label: 'Hórtifrute' },
        { value: 'categoria2', label: 'Açougue' },
        { value: 'categoria3', label: 'Padaria' },
        { value: 'categoria4', label: 'Bebidas' },
        { value: 'categoria5', label: 'Freezer' },
    ]

    // Funções de Local Storage
    const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []
    const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

    // Chaves de Local Storage
    const chaveMercadoLocal = 'mercadosdbLocal'
    const chaveClientedbLocal = 'ClientedbLocal'
    const chaveProdutodbLocal = 'produtodbLocal'

    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            enderecosdb, setEnderecosdb,
            produtosdb, setProdutosdb,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            enderecoMercadodb, setEnderecoMercadodb,
            horarioFuncionamento, setHorarioFuncionamento,
            idMercadoAtivo, setIdMercadoAtivo,
            categoryOptions,
            getLocalStorage, setLocalStorage,
            chaveMercadoLocal, chaveClientedbLocal, chaveProdutodbLocal,
            gerentedb, setGerentedb,
            mercadosVisitados
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
