import { createContext, useState } from "react"

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    // Estado para endereços
    const [enderecosdb, setEnderecosdb] = useState([

    ])
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
        {
            id: 1,
            nome: "Mercado do João",
            cnpj: "00000000000000",
            logo: "1.png",
            telefone: 554899749819,
            email: "",
        },
        {
            id: 2,
            nome: "Mercado do José",
            cnpj: "00000001111111",
            logo: "2.png",
            telefone: 554893583919,
            email: "",
        },
        {
            id: 3,
            nome: "Mercado do Pedro",
            cnpj: "11111111111111",
            logo: "3.png",
            telefone: 554899749820,
            email: "",
        },
        {
            id: 4,
            nome: "Mercadinho Logo Ali",
            cnpj: "22222222222222",
            logo: "mercadinho-logo-ali.png",
            telefone: 554899749821,
            email: "",
        },
        {
            id: 5,
            nome: "Mercado da Lua",
            cnpj: "33333333333333",
            logo: "5.png",
            telefone: 554899749822,
            email: "",
        },
        {
            id: 6,
            nome: "Mercadinho da Esquina",
            cnpj: "44444444444444",
            logo: "6.png",
            telefone: 554899749823,
            email: "",
        },
        {
            id: 7,
            nome: "Mercado do Carlos",
            cnpj: "55555555555555",
            logo: "7.png",
            telefone: 554899749824,
            email: "",
        },
        {
            id: 8,
            nome: "Mercado da Ana",
            cnpj: "66666666666666",
            logo: "8.png",
            telefone: 554899749825,
            email: "",
        },
        {
            id: 9,
            nome: "Mercado do Rodrigo",
            cnpj: "77777777777777",
            logo: "9.png",
            telefone: 554899749826,
            email: "",
        },

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
        {
            domingo: { inicio: null, fim: null },
            segunda: { inicio: "10:00", fim: "18:00" },
            terca: { inicio: "09:00", fim: "17:00" },
            quarta: { inicio: null, fim: null },
            quinta: { inicio: "11:00", fim: "20:00" },
            sexta: { inicio: "09:00", fim: "18:00" },
            sabado: { inicio: "08:00", fim: "16:00" },
            idMercado: 2,
            id: 2,
        },
        {
            domingo: { inicio: "06:00", fim: "18:00" },
            segunda: { inicio: "08:00", fim: "17:00" },
            terca: { inicio: "09:00", fim: "18:00" },
            quarta: { inicio: null, fim: null },
            quinta: { inicio: "10:00", fim: "19:00" },
            sexta: { inicio: "07:00", fim: "15:00" },
            sabado: { inicio: "09:00", fim: "18:00" },
            idMercado: 3,
            id: 3,
        },
        {
            domingo: { inicio: "08:30", fim: "19:30" },
            segunda: { inicio: "09:30", fim: "20:30" },
            terca: { inicio: null, fim: null },
            quarta: { inicio: "08:00", fim: "16:00" },
            quinta: { inicio: "07:30", fim: "17:30" },
            sexta: { inicio: "09:00", fim: "17:00" },
            sabado: { inicio: "11:00", fim: "19:00" },
            idMercado: 4,
            id: 4,
        },
        {
            domingo: { inicio: "07:00", fim: "15:00" },
            segunda: { inicio: "10:00", fim: "19:00" },
            terca: { inicio: "08:00", fim: "16:00" },
            quarta: { inicio: "06:30", fim: "14:30" },
            quinta: { inicio: "08:30", fim: "18:00" },
            sexta: { inicio: null, fim: null },
            sabado: { inicio: "09:00", fim: "17:00" },
            idMercado: 5,
            id: 5,
        },
        {
            domingo: { inicio: "09:00", fim: "17:00" },
            segunda: { inicio: "07:00", fim: "15:00" },
            terca: { inicio: "10:00", fim: "18:00" },
            quarta: { inicio: "08:00", fim: "16:00" },
            quinta: { inicio: "09:00", fim: "17:00" },
            sexta: { inicio: "10:00", fim: "18:00" },
            sabado: { inicio: "11:00", fim: "19:00" },
            idMercado: 6,
            id: 6,
        },
        {
            domingo: { inicio: "08:00", fim: "16:00" },
            segunda: { inicio: "09:00", fim: "17:00" },
            terca: { inicio: "08:30", fim: "16:30" },
            quarta: { inicio: "10:00", fim: "18:00" },
            quinta: { inicio: "07:00", fim: "15:00" },
            sexta: { inicio: "11:00", fim: "19:00" },
            sabado: { inicio: "09:00", fim: "17:00" },
            idMercado: 7,
            id: 7,
        },
        {
            domingo: { inicio: "08:00", fim: "20:00" },
            segunda: { inicio: "08:30", fim: "19:00" },
            terca: { inicio: "09:00", fim: "18:00" },
            quarta: { inicio: "10:00", fim: "19:00" },
            quinta: { inicio: "11:00", fim: "20:00" },
            sexta: { inicio: "09:00", fim: "18:00" },
            sabado: { inicio: "10:00", fim: "18:00" },
            idMercado: 8,
            id: 8,
        },
        {
            domingo: { inicio: null, fim: null },
            segunda: { inicio: "08:00", fim: "18:00" },
            terca: { inicio: null, fim: null },
            quarta: { inicio: "08:00", fim: "16:00" },
            quinta: { inicio: null, fim: null },
            sexta: { inicio: "07:30", fim: "15:30" },
            sabado: { inicio: "09:00", fim: "17:00" },
            idMercado: 9,
            id: 9,
        },

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

        }
    ])
    const mercadosVisitados = [
        { nome: 'Big by Carrefour', distancia: '5.6 km', tempo: '146-156 min', logo: 'image1.png' },
        { nome: 'Nome do Mercado 2', distancia: '3.2 km', tempo: '120-130 min', logo: 'image2.avif' },
        { nome: 'Nome do Mercado 3', distancia: '4.0 km', tempo: '130-140 min', logo: 'image3.avif' },
        { nome: 'Nome do Mercado 4', distancia: '6.1 km', tempo: '150-160 min', logo: 'image4.jpg' },
        { nome: 'Nome do Mercado 5', distancia: '2.0 km', tempo: '140-150 min', logo: 'image5.avif' },
        { nome: 'Nome do Mercado 6', distancia: '4.5 km', tempo: '160-170 min', logo: 'image6.avif' },
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
        { value: 'categoria5', label: 'Freezer' },
        // Adicione mais categorias conforme necessário
    ]
    // Função para obter os dados armazenados no localStorage
    const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []

    // Função para armazenar dados no localStorage
    const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

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
            chaveMercadoLocal, chaveClientedbLocal, chaveProdutodbLocal
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
