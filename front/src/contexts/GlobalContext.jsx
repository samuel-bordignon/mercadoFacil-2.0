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

    const unidadeOptions = [
        { value: 'kg', label: 'Kg' },
        { value: 'g', label: 'g' },
        { value: 'l', label: 'L' },
        { value: 'ml', label: 'ml' },
        { value: 'un', label: 'Unidade' }
    ];

    // Estado para mercados
    const [mercadosdb, setMercadosdb] = useState([
        {
            id: 1,
            nome: "Mercado do João",
            cnpj: "00000000000000",
            logo: "1.png",
            telefone: 554899749819,
            email: "joao.mercado@gmail.com",
        },
        {
            id: 2,
            nome: "Mercado do José",
            cnpj: "00000001111111",
            logo: "2.png",
            telefone: 554893583919,
            email: "jose.mercado@gmail.com",
        },
        {
            id: 3,
            nome: "Mercado do Pedro",
            cnpj: "11111111111111",
            logo: "3.png",
            telefone: 554899749820,
            email: "pedro.mercado@gmail.com",
        },
        {
            id: 4,
            nome: "Mercadinho Logo Ali",
            cnpj: "22222222222222",
            logo: "mercadinho-logo-ali.png",
            telefone: 554899749821,
            email: "logo.ali.mercado@gmail.com",
        },
        {
            id: 5,
            nome: "Lua Mercado",
            cnpj: "33333333333333",
            logo: "lua-mercado.png",
            telefone: 554899749822,
            email: "lua.mercado@gmail.com",
        },
        {
            id: 6,
            nome: "Mercado da Terra",
            cnpj: "44444444444444",
            logo: "mercado-da-terra.jpg",
            telefone: 554899749823,
            email: "terra.mercado@gmail.com",
        },
        {
            id: 7,
            nome: "Mercadinho Estrela",
            cnpj: "55555555555555",
            logo: "mercadinho-estrela.png",
            telefone: 554899749824,
            email: "estrela.mercadinho@gmail.com",
        },
        {
            id: 8,
            nome: "Mercadinho Cipriani",
            cnpj: "66666666666666",
            logo: "mercadinho-cipriani.jpg",
            telefone: 554899749825,
            email: "cipriani.mercadinho@gmail.com",
        },
        {
            id: 9,
            nome: "Mercado Sempre Farto",
            cnpj: "77777777777777",
            logo: "mercado-sempre-farto.jpg",
            telefone: 554899749826,
            email: "sempre_Farto.mercado@gmail.com",
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
    // Funções de Local Storage
    const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? []
    const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado))

    // Chaves de Local Storage
    const chaveMercadoData = 'MercadoData'
    const chaveClienteData = 'ClienteData'
    const chaveGerenteData = 'GerenteData'
    const chaveEnderecoClienteLocal = 'EnderecoClienteData'
    const chaveEnderecoMercadoLocal = 'EnderecoMercadoData'
    const chaveProdutodbLocal = 'produtodbLocal'
    const chaveGerentedbLocal = 'gerentedbLocal'

    // Estado para Usuário logado
    const [clientedb, setClientedb] = useState({})

    const getData = async (table) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}`)
            return await response.json()
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        }
    }

    const getDataById = async (table, id) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`)
            return await response.json()
        } catch (error) {
            console.error('Erro ao buscar registro:', error)
        }
    }

    const getDataByForeignKey = async (table, fk_colum, fk_value) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${fk_colum}/${fk_value}`)
            return await response.json()
        } catch (error) {
            console.error('Erro ao buscar registro:', error)
        }
    }

    const addData = async (table, data) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok && result) {
                // Confirma se a resposta contém a chave de identificação esperada
                const primaryKey = Object.keys(result).find(key => key.startsWith("id_"))
                if (primaryKey) {
                    setLocalStorage(primaryKey, result[primaryKey])
                    console.log(`ID salvo: ${result[primaryKey]}`)
                }
            } else {
                console.error("Erro ao salvar dados:", result?.message || "Resposta inválida do servidor")
            }

            // Lógica para validar cliente e endereço
            if (table === 'clientes') setLocalStorage('isClienteVality', true)
            if (table === 'enderecoclientes') setLocalStorage('isEnderecoClienteVality', true)

            return result
        } catch (error) {
            console.error('Erro ao adicionar registro:', error)
            throw error
        }
    }

    const addRelation = async (idCliente, idEndereco) => {
        if (!idCliente || !idEndereco) {
            console.error("IDs para relacionamento não fornecidos")
            return
        }

        try {
            const response = await fetch('http://localhost:3000/endereco_cliente_relecao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fk_id_cliente: idCliente,
                    fk_id_enderecocliente: idEndereco,
                }),
            })

            if (response.ok) {
                console.log("Relacionamento salvo com sucesso")

            } else {
                console.error("Erro ao salvar relacionamento:", await response.json())
            }
        } catch (error) {
            console.error("Erro ao criar relacionamento:", error)
        }
    }

    const updateData = async (table, id, data) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            return await response.json()
        } catch (error) {
            console.error('Erro ao atualizar registro:', error)
        }
        if (table === 'clientes') {
            setLocalStorage('isClienteVality', true)
        }
        if (table === 'enderecoclientes') {
            setLocalStorage('isEnderecoClienteVality', true)
        }
    }

    const deleteData = async (table, id) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`, {
                method: 'DELETE',
            })
            return await response.json()
        } catch (error) {
            console.error('Erro ao deletar registro:', error)
        }
    }

    const checkEmailExists = async (table, email) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/email-exists/${email}`)
            const data = await response.json()
            return data.exists
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error)
            console.error(response.json())
            return false
        }
    }

    const login = async (table, email, columName, columValue) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/password-vality/${email}/${columName}/${columValue}`)
            const data = await response.json()

            if (data.loginSuccess) {
                const primaryKey = Object.keys(data).find(key => key.startsWith("id_"))
                
                if (primaryKey) {
                    setLocalStorage(primaryKey, data[primaryKey])
                    console.log(`ID salvo: ${data[primaryKey]}`)
                }

                return { success: true, message: 'Login bem-sucedido' }

            } else {
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error)
            return { success: false, message: 'Erro ao tentar logar' }
        }
    }

    const mercadosVisitados = [
        { nome: 'Big by Carrefour', distancia: '5.6 km', tempo: '146-156 min', logo: 'image1.png' },
        { nome: 'Nome do Mercado 2', distancia: '3.2 km', tempo: '120-130 min', logo: 'image2.avif' },
        // Adicione mais mercados conforme necessário
    ]

    // Exemplo de categorias
    const categoryOptions = [
        { value: 'categoria1', label: 'Hórtifrute' },
        { value: 'categoria2', label: 'Açougue' },
        { value: 'categoria3', label: 'Padaria' },
        { value: 'categoria4', label: 'Bebidas' },
        { value: 'categoria5', label: 'Freezer' },
    ]

    const getEndereco = async (cep) => {
        try {
            const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
            const data = await response.json()
            if (data.status && data.status !== 200) {
                throw new Error('CEP não encontrado.')
            }
            return data
            // Retorna o objeto com as informações do CEP
        } catch (error) {
            console.error('Erro ao obter endereço:', error)
            setError('Erro ao obter o endereço.')
            return null
        }
    }

    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            enderecosdb, setEnderecosdb,
            produtosdb, setProdutosdb, unidadeOptions,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            enderecoMercadodb, setEnderecoMercadodb,
            horarioFuncionamento, setHorarioFuncionamento,
            categoryOptions,

            getEndereco,

            getLocalStorage, setLocalStorage,

            chaveMercadoData, chaveClienteData, chaveEnderecoClienteLocal, chaveEnderecoMercadoLocal, chaveGerenteData,
            gerentedb, setGerentedb,
            getData, updateData, deleteData, addData, addRelation, getDataById, getDataByForeignKey, checkEmailExists, login
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
