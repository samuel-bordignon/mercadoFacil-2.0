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
        { id: 1, idMercado: 2 , nome: "Arroz Branco", preco: 10.00, quantidade: 1, imagem: "arroz.png", informacaoAdicional: { peso: "5", unidade: "kg" } },
        { id: 2, idMercado: 1 , nome: "Fardo Skol", preco: 5.50, quantidade: 1, imagem: "skol.png", informacaoAdicional: { peso: "12", unidade: "unidades" } },
        { id: 3, idMercado: 5 , nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 4, idMercado: 4 , nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 5, idMercado: 6 , nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
        { id: 6, idMercado: 3 , nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
    ])
    // Estado para mercados
    const [mercadosdb, setMercadosdb] = useState([
        {
            id: 1,
            nome: "Mercado do João",
            endereco: "Rua das Flores, 123",
            cnpj: "00000000000000",
            logo: "1.png",
            telefone: 554899749819,
            email: "",
        },
        {
            id: 2,
            nome: "Mercado do José",
            endereco: "Rua das Águas, 13",
            cnpj: "00000001111111",
            logo: "2.png",
            telefone: 554893583919,
            email: "",
        },
        {
            id: 3,
            nome: "Mercado da Pedro",
            endereco: "Av. Brasil, 456",
            cnpj: "11111111111111",
            logo: "3.png",
            telefone: 554899749820,
            email: "",
        },
        {
            id: 4,
            nome: "Mercadinho Logo Ali",
            endereco: "Rua do Sol, 789",
            cnpj: "22222222222222",
            logo: "mercadinho-logo-ali.png",
            telefone: 554899749821,
            email: "",
        },
        {
            id: 5,
            nome: "Mercado da Lua",
            endereco: "Rua das Árvores, 101",
            cnpj: "33333333333333",
            logo: "5.png",
            telefone: 554899749822,
            email: "",
        },
        {
            id: 6,
            nome: "Mercado do Pedro",
            endereco: "Rua da Paz, 123",
            cnpj: "44444444444444",
            logo: "6.png",
            telefone: 554899749823,
            email: "",
        },
        {
            id: 7,
            nome: "Mercado do Carlos",
            endereco: "Rua 7, 456",
            cnpj: "55555555555555",
            logo: "7.png",
            telefone: 554899749824,
            email: "",
        },
        {
            id: 8,
            nome: "Mercado da Ana",
            endereco: "Rua São João, 234",
            cnpj: "66666666666666",
            logo: "8.png",
            telefone: 554899749825,
            email: "",
        },
        {
            id: 9,
            nome: "Mercado do Rodrigo",
            endereco: "Rua do Comércio, 123",
            cnpj: "77777777777777",
            logo: "9.png",
            telefone: 554899749826,
            email: "",
        },
       
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
            domingo: { inicio: "08:00", fim: "20:00" },
            segunda: { inicio: "08:00", fim: "20:00" },
            terca: { inicio: "08:00", fim: "20:00" },
            quarta: { inicio: "08:00", fim: "20:00" },
            quinta: { inicio: "08:00", fim: "20:00" },
            sexta: { inicio: "08:00", fim: "20:00" },
            sabado: { inicio: "08:00", fim: "20:00" },
            idMercado: 2,
            id: 2,
        }
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
    // Estado para Parceiro logado
    const [parceirodb, setParceirodb] = useState({
        id: 1,
        nome: "João da Silva",
        cpf: "123456789",
        dataNascimento: "2000-01-01",
        senha: "123456",
        telefone: "48999999999",
        email: "jao@gmail.com",
    })

     // Exemplo de categorias
    const categoryOptions = [
    { value: 'categoria1', label: 'Hórtifrute' },
    { value: 'categoria2', label: 'Açougue' },
    { value: 'categoria3', label: 'Padaria' },
    { value: 'categoria4', label: 'Bebidas' },
    { value: 'categoria5', label: 'Freezer' },
    { value: 'categoria5', label: 'Freezer' },
    // Adicione mais categorias conforme necessário
  ];




// Prover estados e funções aos componentes filhos
return (
    <GlobalContext.Provider value={{
        enderecosdb, setEnderecosdb,
        produtosdb, setProdutosdb,
        mercadosdb, setMercadosdb,
        clientedb, setClientedb,
        mercadosVisitados,
        categoryOptions,
    }}>
        {children}
    </GlobalContext.Provider>
)
}
