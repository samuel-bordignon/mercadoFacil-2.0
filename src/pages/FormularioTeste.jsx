import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/Navbar'

function FormularioTeste() {
    const { getData, updateData, deleteData, addData, getDataById, login, checkEmailExists } = useContext(GlobalContext)
    const [clientes, setClientes] = useState([])
    const [mercados, setMercados] = useState([])
    const [formCad, setFormCad] = useState({ nome: '', email: '', senha: '' })
    const [formLog, setFormLog] = useState({ email: '', senha: '' }) // Correção aqui: removeu "nome"
    const [editingUserId, setEditingUserId] = useState(null) // Estado para identificar o usuário sendo editado
    const [message, setMessage] = useState('')
    const [listaDeItens, setListaDeItens] = useState(['banana', 'maçã', 'laranja'])

    useEffect(() => {
        getData('clientes').then(data => setClientes(data))
        getData('mercados').then(data => setMercados(data))

    }, [])

    const handleEdit = async (id) => {
        const userData = await getDataById('clientes', id)
        setFormCad({ nome: userData.nome, email: userData.email, senha: userData.senha }) // Preencher o formulário com os dados do usuário
        setEditingUserId(id) // Armazena o ID do usuário sendo editado
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, email, senha } = formCad;

        if (editingUserId) {
            // Fetch existing user data by ID to check if the email has changed
            const existingUser = await getDataById('clientes', editingUserId);

            // Check if the email has changed, and if so, check if the new email already exists
            if (existingUser.email !== email) {
                const emailExists = await checkEmailExists('clientes', email);
                if (emailExists) {
                    alert('Email já cadastrado!');
                    return;
                }
            }

            // If email is unique or unchanged, proceed to update
            await updateData('clientes', editingUserId, { nome, email, senha });
            setClientes(clientes.map(cliente =>
                cliente.id === editingUserId ? { ...cliente, nome, email, senha } : cliente
            ));
        } else {
            // For new user, check if email already exists
            const emailExists = await checkEmailExists('clientes', email);
            if (emailExists) {
                alert('Email já cadastrado!');
                return;
            }

            // If email is unique, proceed to add new client
            const newClient = await addData('clientes', { nome, email, senha });
            setClientes([...clientes, newClient]);
        }

        // Reset form and editing state
        setFormCad({ nome: '', email: '', senha: '' });
        setEditingUserId(null);
    };


    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, senha } = formLog

        const result = await login('clientes', email, senha)

        if (result.success) {
            setMessage(result.message)  // Exibe mensagem de sucesso
            // Redirecionar ou atualizar o estado da aplicação após login bem-sucedido
        } else {
            setMessage(result.message)  // Exibe mensagem de erro
        }
    }

    const handleDelete = async (id) => {
        await deleteData('clientes', id)
        setClientes(clientes.filter(cliente => cliente.id !== id))
    }

    return (
        <div>
            <Navbar />
            <h1>Formulario Teste</h1>
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                <label htmlFor='nome'>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={formCad.nome}
                    onChange={(e) => setFormCad({ ...formCad, nome: e.target.value })}
                    required
                />
                <br />
                <label htmlFor='email'>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formCad.email}
                    onChange={(e) => setFormCad({ ...formCad, email: e.target.value })}
                    required
                />
                <br />
                <label htmlFor='senha'>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={formCad.senha}
                    onChange={(e) => setFormCad({ ...formCad, senha: e.target.value })}
                    required
                />
                <br />
                <button type='submit'>{editingUserId ? 'Salvar' : 'Enviar'}</button>
            </form>

            <form onSubmit={handleLogin}>
                <h2>Login</h2>

                <label htmlFor='email'>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formLog.email}
                    onChange={(e) => setFormLog({ ...formLog, email: e.target.value })} // Correção aqui
                    required
                />
                <br />
                <label htmlFor='senha'>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={formLog.senha}
                    onChange={(e) => setFormLog({ ...formLog, senha: e.target.value })} // Correção aqui
                    required
                />
                <br />
                <button type='submit'>Login</button>
                {message && <p>{message}</p>}
            </form>

            <div>
                {clientes.map(cliente => (
                    <div key={cliente.id}>
                        <h2>{cliente.nome}</h2>
                        <p>{cliente.id_cliente}</p>
                        <p>{cliente.email}</p>
                        <p>{cliente.senha}</p>
                        <p>{cliente.telefone}</p>
                        <p>{cliente.cpf}</p>
                        <p>{cliente.data_nasc}</p>
                        <button onClick={() => handleEdit(cliente.id)}>Editar</button>
                        <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
                    </div>
                ))}
                {mercados.map(mercado => (
                    <div key={mercado.id}>
                        <h2>{mercado.nome}</h2>
                        <p>{mercado.id_mercado}</p>
                        <p>{mercado.email}</p>
                        <p>{mercado.senha}</p>
                        <p>{mercado.telefone}</p>
                        <button onClick={() => handleEdit(cliente.id)}>Editar</button>
                        <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FormularioTeste
