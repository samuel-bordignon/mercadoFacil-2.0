import { use } from "framer-motion/client"
import { createContext, useState, useEffect } from "react"
import axios from "axios"

// Cria o contexto
export const GlobalContext = createContext()

// Provedor do contexto que irá envolver o app
export const GlobalContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    // Estados globais
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
    const chaveMercadoData = 'MercadoData'
    const chaveClienteData = 'ClienteData'
    const chaveGerenteData = 'GerenteData'
    const chaveEnderecoClienteLocal = 'EnderecoClienteData'
    const chaveEnderecoMercadoLocal = 'EnderecoMercadoData'

    // funções para manipular os dados do banco de dados
    const getData = async (table) => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3000/${table}`)
            return response.data
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        } finally {
            setLoading(false)
        }
    }
    const getDataById = async (table, id) => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3000/${table}/${id}`)
            return response.data
        } catch (error) {
            console.error('Erro ao buscar registro:', error)
        } finally {
            setLoading(false)
        }
    }
    const getDataByForeignKey = async (table, fk_colum, fk_value) => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3000/${table}/${fk_colum}/${fk_value}`)
            return response.data
        } catch (error) {
            console.error('Erro ao buscar registro:', error)
        } finally {
            setLoading(false)
        }
    }
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
            setLoading(true)
            const response = await axios.delete(`http://localhost:3000/${table}/${id}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar registro:", error)
        } finally {
            setLoading(false)
        }
    }
    const deleteDataByColumn = async (table, columName, columValue) => {
        try {
            setLoading(true)
            const response = await axios.delete(`http://localhost:3000/${table}/${columName}/${columValue}`)
            return response.data
        } catch (error) {
            console.error("Erro ao deletar registro:", error)
        } finally {
            setLoading(false)
        }
    }
    const checkEmailExists = async (table, email) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/auth/${table}/email-exists/${email}`);
            return response.data.exists;
        } catch (error) {
            console.error("Erro ao verificar e-mail:", error.message, "Tabela:", table, "Email:", email);            
            return false;
        } finally {
            setLoading(false);
            console.log(`Verificando email: ${email}, tabela: ${table}`);
        }
    };
    const login = async (table, identificador, identificadorValor, senhaValor) => {
        try {
            setLoading(true)
            const response = await axios.get(
                `http://localhost:3000/auth/${table}/password-vality/${identificador}/${identificadorValor}/${senhaValor}`
            )
            const data = response.data

            if (data.loginSuccess) {
                // Identificar a chave primária no objeto retornado
                const primaryKey = Object.keys(data.user).find((key) => key.startsWith("id_"))
                console.log("Chave primária:", primaryKey)

                if (primaryKey) {
                    setLocalStorage(primaryKey, data.user[primaryKey])
                    console.log(`ID salvo: ${data.user[primaryKey]}`)
                }

                return { success: true, message: "Login bem-sucedido" }
            } else {
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error("Erro ao tentar logar:", error)

            // Capturando mensagens específicas do erro, se disponíveis
            const errorMessage =
                error.response?.data?.message

            return { success: false, message: errorMessage }
        } finally {
            setLoading(false)
        }
    }
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
    const calcularDistanciaRaio = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3 // Raio da Terra em metros
        const rad = Math.PI / 180
        const dLat = (lat2 - lat1) * rad
        const dLon = (lon2 - lon1) * rad
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distancia = R * c // Distância em metros
        return distancia
    }
    // Função para obter as coordenadas de dois CEPs e calcular a distância entre eles
    const calcularDistanciaRota = async (endereco1, endereco2) => {
        if (endereco1 && endereco2) {
            const osrmProfile = 'car'
            const startPoint = [endereco1.longitude, endereco1.latitude] // Longitude e Latitude do primeiro CEP
            const endPoint = [endereco2.longitude, endereco2.latitude] // Longitude e Latitude do segundo CEP

            const veloCaminhada = 1.728 // Velocidade média de caminhada em m/s

            const url = `http://router.project-osrm.org/route/v1/${osrmProfile}/${startPoint.join(',')};${endPoint.join(',')}?overview=false&geometries=polyline`


            try {
                const response = await fetch(url)
                const data = await response.json()
                const route = data.routes[0]
                const distanceInMeters = route.distance
                const distanceInKm = (distanceInMeters / 1000).toFixed(2)
                const durationInHours = (distanceInMeters / veloCaminhada) / 60

                return { distanceInKm, durationInHours }

                if (!data.routes || data.routes.length === 0) {
                    console.error('Nenhuma rota encontrada');
                    return null;
                }
                

            } catch (error) {
                console.error('Erro:', error)
            }
        } else {
            console.error('endereços não encontardos não encontrados')
        }
    }
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
    
    // Exemplo de uso no componente
    const handleImageUpload = async (base64Image) => {
        const filePath = await uploadImage(base64Image)
        console.log('Caminho da imagem salva:', filePath)
    }
    
    

    const idCliente = getLocalStorage('id_cliente')
    const idGerente = getLocalStorage('id_gerente')
    const idEnderecoCliente = getLocalStorage("id_enderecocliente")
    const unidadeOptions = [{value:'Kg', label:'Kg'},{value:'g', label:'g'},{value:'L', label:'L'},{value:'ml', label:'ml'}]
    const [listaDefoutAtual, setListaDefoutAtual] = useState([])

    // Prover estados e funções aos componentes filhos
    return (
        <GlobalContext.Provider value={{
            idEnderecoCliente,
            loading,

            unidadeOptions,
            listaDefoutAtual, setListaDefoutAtual,
            

            getLocalStorage, setLocalStorage,
            chaveMercadoData,
            chaveClienteData,
            chaveEnderecoClienteLocal,
            chaveEnderecoMercadoLocal,
            chaveGerenteData,

            getData,
            updateData,
            deleteData,
            deleteDataByColumn,
            addData,
            addRelation,
            getDataById,
            getDataByForeignKey,
            checkEmailExists,
            login,
            getEndereco,
            calcularDistanciaRota,
            calcularDistanciaRaio,
            uploadImage
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
