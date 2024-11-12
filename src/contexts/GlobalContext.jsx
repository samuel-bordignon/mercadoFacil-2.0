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
    // Estado para Usuário logado
    const [clientedb, setClientedb] = useState({})

    const getData = async (table) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const getDataById = async (table, id) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar registro:', error);
        }
    };

    const addData = async (table, data) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar registro:', error);
        }
    };

    const updateData = async (table, id, data) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar registro:', error);
        }
    };

    const deleteData = async (table, id) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar registro:', error);
        }
    };

    const checkEmailExists = async (table, email) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/email-exists/${email}`);
            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            return false;
        }
    };

    const login = async (table, email, senha) => {
        try {
            const response = await fetch(`http://localhost:3000/${table}/password-vality/${email}/${senha}`);
            const data = await response.json();
            
            if (data.loginSuccess) {
                return { success: true, message: 'Login bem-sucedido' };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            return { success: false, message: 'Erro ao tentar logar' };
        }
    };

    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            enderecosdb, setEnderecosdb,
            produtosdb, setProdutosdb,
            mercadosdb, setMercadosdb,
            clientedb, setClientedb,
            gerentedb, setGerentedb,
            horarioFuncionamento, setHorarioFuncionamento,
            getData, updateData, deleteData, addData, getDataById, checkEmailExists,login

        }}>
            {children}
        </GlobalContext.Provider>
    )
}
