// Importações necessárias
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Criação do contexto
export const GlobalContext = createContext();

// Provedor do contexto
export const GlobalContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // Estados globais
    const [enderecosCliente, setEnderecosCliente] = useState([{ cep: "", logradouro: "", numero: "", complemento: "", bairro: "", apelido: "" }]);
    const [cliente, setCliente] = useState({ nome: "", cpf: "", data_nasc: "", telefone: "", email: "", senha: "" });
    const [gerente, setGerente] = useState(null);
    const [mercado, setMercado] = useState(null);
    const [mercados, setMercados] = useState([]);
    const [enderecoMercado, setEnderecoMercado] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [enderecosMercados, setEnderecosMercados] = useState([]);
    const [horariosComerciais, setHorariosComerciais] = useState([]);


    // Chaves de Local Storage
    const chaveMercadoData = "MercadoData";
    const chaveClienteData = "ClienteData";
    const chaveGerenteData = "GerenteData";
    const chaveEnderecoClienteLocal = "EnderecoClienteData";
    const chaveEnderecoMercadoLocal = "EnderecoMercadoData";

    // Funções de Local Storage
    const getLocalStorage = (chave) => JSON.parse(localStorage.getItem(chave)) ?? [];
    const setLocalStorage = (chave, dado) => localStorage.setItem(chave, JSON.stringify(dado));

    // Funções para salvar e obter horários comerciais
    const salvarHorariosComerciais = (dados) => {
        setHorariosComerciais(dados);
        setLocalStorage("horariosComerciais", dados);
    };

    const obterHorariosComerciais = () => {
        const dadosSalvos = getLocalStorage("horariosComerciais");
        return dadosSalvos || horariosComerciais;
    };

    useEffect(() => {
        const dadosSalvos = getLocalStorage("horariosComerciais");
        if (dadosSalvos.length > 0) {
            setHorariosComerciais(dadosSalvos);
        }
    }, []);

    // Funções para manipular o banco de dados
    const getData = async (table) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/${table}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDataById = async (table, id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/${table}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar registro:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDataByForeignKey = async (table, fk_colum, fk_value) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/${table}/${fk_colum}/${fk_value}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar registro:", error);
        } finally {
            setLoading(false);
        }
    };

    const addData = async (table, data) => {
        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/${table}`, data)
            if (response.status === 200 && response.data) {
                // Confirma se a resposta contém a chave de identificação esperada
                const primaryKey = Object.keys(response.data).find(key => key.startsWith("id_"))
                if (primaryKey) {
                    setLocalStorage(primaryKey, response.data[primaryKey])
                    console.log(`ID salvo: ${response.data[primaryKey]}`)
                }
            } else {
                console.error("Erro ao salvar dados:", response.data?.message || "Resposta inválida do servidor")
            }
            // Lógica para validar cliente e endereço
            if (table === "clientes") setLocalStorage("isClienteVality", true)
            if (table === "enderecoclientes") setLocalStorage("isEnderecoClienteVality", true)
            return response.data
        } catch (error) {
            console.error("Erro ao adicionar registro:", error)
            throw error
            
        } finally {
            setLoading(false)
        }
    }
    const addRelation = async (table, data) => {
        if (!data) {
            console.error("Dados não foras fornecidos")
            return
            setLoading(false);
        }
    

        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/${table}`, data)
            if (response.status === 200) {
                console.log("Relacionamento salvo com sucesso")
            } else {
                console.error("Erro ao salvar relacionamento:", response.data)
            }
        } catch (error) {
            console.error("Erro ao criar relacionamento:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateData = async (table, id, data) => {
        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3000/${table}/${id}`, data)
            if (table === "clientes") {
                setLocalStorage("isClienteVality", true)
            }
            if (table === "enderecoclientes") {
                setLocalStorage("isEnderecoClienteVality", true)
            }
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar registro:", error)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async (table, id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:3000/${table}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar registro:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteDataByColumn = async (table, columName, columValue) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:3000/${table}/${columName}/${columValue}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar registro:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkEmailExists = async (table, email) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/auth/${table}/email-exists/${email}`);
            return response.data.exists;
        } catch (error) {
            console.error("Erro ao verificar e-mail:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (table, identificador, identificadorValor, senhaValor) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/auth/${table}/password-vality/${identificador}/${identificadorValor}/${senhaValor}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao tentar logar:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter endereço:", error);
            return null;
        }
    };

    const calcularDistanciaRaio = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Raio da Terra em metros
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLon = (lon2 - lon1) * rad;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calcularDistanciaRota = async (endereco1, endereco2) => {
        if (endereco1 && endereco2) {
            const osrmProfile = "car";
            const startPoint = [endereco1.longitude, endereco1.latitude];
            const endPoint = [endereco2.longitude, endereco2.latitude];
            const url = `http://router.project-osrm.org/route/v1/${osrmProfile}/${startPoint.join(",")};${endPoint.join(",")}?overview=false`;
            try {
                const response = await axios.get(url);
                const route = response.data.routes[0];
                return { distanceInKm: (route.distance / 1000).toFixed(2) };
            } catch (error) {
                console.error("Erro ao calcular rota:", error);
                return null;
            }
        }
        return null;
    };

    const uploadImage = async (base64Image) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/images/upload',
                { image: base64Image },
                { headers: { 'Content-Type': 'application/json' } }
            )
            // O caminho do arquivo salvo no servidor
            return response.data.filePath
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error)
            throw error
        }
    }
    const compararListaDeCompras = async (idMercado, listaCompras) => {
        const apiUrl = 'http://localhost:3000/comparar-lista'
        try {
            // Enviando a requisição ao backend
            const response = await axios.post(apiUrl, {
                idMercado,
                listaCompras,
            })
            // Retorna os dados da resposta
            return response.data
        } catch (error) {
            // Tratamento de erros
            console.error('Erro ao comparar lista de compras:', error)
            if (error.response) {
                // O backend retornou um erro
                return { error: error.response.data.message || 'Erro na API' }
            } else {
                // Erro na requisição ou outro problema
                return { error: error.message || 'Erro desconhecido' }
            }
        }
    }
    const idCliente = getLocalStorage('id_cliente')
    const idGerente = getLocalStorage('id_gerente')
    const idEnderecoCliente = getLocalStorage("id_enderecocliente")
    const unidadeOptions = [{ value: 'Kg', label: 'Kg' }, { value: 'g', label: 'g' }, { value: 'L', label: 'L' }, { value: 'ml', label: 'ml' }, { value: 'un', label: 'un' }]
    const [listaDefoutAtual, setListaDefoutAtual] = useState([])
    return (
        <GlobalContext.Provider
            value={{
                loading,
                horariosComerciais,
                salvarHorariosComerciais,
                obterHorariosComerciais,
                getLocalStorage,
                setLocalStorage,
                enderecosCliente,
                setEnderecosCliente,
                cliente,
                setCliente,
                gerente,
                setGerente,
                mercado,
                setMercado,
                mercados,
                setMercados,
                enderecoMercado,
                setEnderecoMercado,
                produtos,
                setProdutos,
                categorias,
                setCategorias,
                enderecosMercados,
                setEnderecosMercados,
                unidadeOptions,
                getData,
                getDataById,
                getDataByForeignKey,
                addData,
                updateData,
                deleteData,
                deleteDataByColumn,
                checkEmailExists,
                login,
                getEndereco,
                calcularDistanciaRaio,
                calcularDistanciaRota,
                compararListaDeCompras,
                uploadImage,
                addRelation
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
