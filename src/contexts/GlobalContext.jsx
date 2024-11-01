import { createContext, useState } from "react";

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    // Estado para endereços
<<<<<<< HEAD
    const [enderecosdb, setEnderecosdb] = useState([])
=======
    const [enderecosdb, setEnderecosdb] = useState([
        // { id: 1, complemento: "Apto 10", numero: "84", cep: "88010-001", logradouro: "Rua Sao João", bairro: "Rio Vermelho", apelido: "Minha casa", atual: true },
        // { id: 2, complemento: "Casa 23", numero: "72", cep: "88058-080", logradouro: "Rua Sao João", bairro: "Rio Vermelho", apelido: "Minha casa", atual: false },
        // { id: 3, complemento: "Condominio", numero: "91", cep: "88058-087", logradouro: "Rua Sao João", bairro: "Rio Vermelho", apelido: "Minha casa", atual: false },
    ])
>>>>>>> 5a812fdf049027fe7fe3357c3811851a35079b83
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
<<<<<<< HEAD
    const [mercadosdb, setMercadosdb] = useState([{}])
=======
    const [mercadosdb, setMercadosdb] = useState([
        { id: 1, nome: "Mercado do João", endereco: "Rua das Flores, 123", cep: "88058089", logo: "1.png", atual: true, celular: 554899749819 },
        { id: 2, nome: "Mercado do José", endereco: "Rua das Palmeiras, 456", cep: "88058080", logo: "2.png", atual: false, celular: 554899749819 },
    ])

    const mercadosVisitados = [
        { nome: 'Big by Carrefour', distancia: '5.6 km', tempo: '146-156 min', img: 'image1.png' },
        { nome: 'Nome do Mercado 2', distancia: '3.2 km', tempo: '120-130 min', img: 'image2.avif' },
        { nome: 'Nome do Mercado 3', distancia: '4.0 km', tempo: '130-140 min', img: 'image3.avif' },
        { nome: 'Nome do Mercado 4', distancia: '6.1 km', tempo: '150-160 min', img: 'image4.jpg' },
        { nome: 'Nome do Mercado 5', distancia: '2.0 km', tempo: '140-150 min', img: 'image5.avif' },
        { nome: 'Nome do Mercado 6', distancia: '4.5 km', tempo: '160-170 min', img: 'image6.avif' },
      ];


>>>>>>> 5a812fdf049027fe7fe3357c3811851a35079b83
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
        endereco: {
            cep: "88058089",
            bairro: "Ingleses",
            logradouro: "Rua do Ingleses",
            numero: "23",
            complemento: "Apto 101"
        }
    })
    //constancia para redenrizar e desrenderizar os endereços na pagina endereços
    const [listaEnderecos, setListaEnderecos] = useState(true)






<<<<<<< HEAD
    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            enderecosdb, setEnderecosdb,
            produtosdb, setProdutosdb,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            parceirodb, setParceirodb
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
=======
// Prover estados e funções aos componentes filhos
return (
    <GlobalContext.Provider value={{
        enderecosdb, setEnderecosdb,
        produtosdb, setProdutosdb,
        mercadosdb, setMercadosdb,
        usuariodb, setUsuariodb,
        listaEnderecos, setListaEnderecos,
        mercadosVisitados // Adicionado aqui
    }}>
        {children}
    </GlobalContext.Provider>
)
}
>>>>>>> 5a812fdf049027fe7fe3357c3811851a35079b83
