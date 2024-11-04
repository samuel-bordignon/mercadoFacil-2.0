import { createContext, useState } from "react"

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    // Estado para endereços
    const [enderecosdb, setEnderecosdb] = useState([{ id: 1, cep: "", bairro: "", logradouro: "", numero: "", complemento: "", atual: true },])
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
    const [mercadosdb, setMercadosdb] = useState([
        {
            id: 1,
            nome: "Mercado do João",
            endereco: "Rua das Flores, 123",
            cnpj: "00000000000000",
            logo: "1.png",
            telefone: 554899749819,
            email: "",
            atual: false,
        },
        {
            id: 2,
            nome: "Mercado do João",
            endereco: "Rua das Flores, 123",
            cnpj: "00000000000000",
            logo: "2.png",
            telefone: 554899749819,
            email: "",
            atual: false,

        }
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
        { nome: 'Big by Carrefour', distancia: '5.6 km', tempo: '146-156 min', img: 'image1.png' },
        { nome: 'Nome do Mercado 2', distancia: '3.2 km', tempo: '120-130 min', img: 'image2.avif' },
        { nome: 'Nome do Mercado 3', distancia: '4.0 km', tempo: '130-140 min', img: 'image3.avif' },
        { nome: 'Nome do Mercado 4', distancia: '6.1 km', tempo: '150-160 min', img: 'image4.jpg' },
        { nome: 'Nome do Mercado 5', distancia: '2.0 km', tempo: '140-150 min', img: 'image5.avif' },
        { nome: 'Nome do Mercado 6', distancia: '4.5 km', tempo: '160-170 min', img: 'image6.avif' },
    ]
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
    //constancia para redenrizar e desrenderizar os endereços na pagina endereços
    const [listaEnderecos, setListaEnderecos] = useState(true)

    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            enderecosdb, setEnderecosdb,
            produtosdb, setProdutosdb,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            gerentedb, setGerentedb,
            mercadosVisitados // Adicionado aqui
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
