import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext, useEffect} from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

function Vertodos() {
    const { getLocalStorage, setLocalStorage, getDataById, getDataByForeignKey, listaDefoutAtual, setListaDefoutAtual, } = useContext(GlobalContext)
    const [mercadoAtual, setMercadoAtual] = useState([])
    const [enderecoMercadoAtual, setEnderecoMercadoAtual] = useState([])
    const [idProduto, setIdProduto] = useState('')
    const [produtos, setProdutos] = useState([])
    const [icon, setIcon] = useState('Mais')
    const idMercado = getLocalStorage('id_mercado')
    const listaDefout = getLocalStorage('listaDefout')
    const [produtosSessaoFeira, setProdutosSessaoFeira] = useState([])
    const [loading, setLoading] = useState(false)
    const [produtosdb, setProdutosdb] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMercado = async () => {
          try {
            const mercadoAtual = await getDataById('mercados', idMercado);
            setMercadoAtual(mercadoAtual);
          } catch (error) {
            console.error('Erro ao buscar mercado:', error);
          }
        };
    
        fetchMercado();
      }, [idMercado]);

    return (
        <div className='tudo'>
            <Navbar listaCompras={listaDefout} produtosdb={produtos} setProdutosdb={setProdutosdb}/>
            <div className="tela-dentro-mercado">
                <div className="sideBar-dentro-mercado">
                    <div className="cabecalio-mercado-container">
                        <div className="logo-container-mercado">
                            <img className="logo-mercado" src={`/uploads_images/${mercadoAtual.logo}`} alt="" />
                        </div>
                        <div className="nome-mercado-container">
                            <h5>{mercadoAtual.nome}</h5>

                        </div>
                    </div>
                    <div className="endereco-cnpj-container">
                        <p className="sub-titulo-verde">Sobre</p>
                        <h5 className="titulo-outras-info">Endereço</h5>
                        <p>{enderecoMercadoAtual.logradouro}</p>
                        <p>CEP: {enderecoMercadoAtual.cep}</p>
                        <h5 className="titulo-outras-info">Outras informações</h5>
                        <p>CNPJ: {mercadoAtual.cnpj}</p>
                    </div>
                    <div className="horario-container">
                        <div className="dias-funcion-container">
                            <p className="sub-titulo-verde">Horário</p>
                            <p>Domingo</p>
                            <p>Segunda-feira</p>
                            <p>Terça-feira</p>
                            <p>Quarta-feira</p>
                            <p>Quinta-feira</p>
                            <p>Sexta-feira</p>
                            <p>Sábado</p>
                        </div>
                        <div className="horarios-funcion-container">
                            <p>Não Abre</p>
                            <p>08:00 - 22:00</p>
                            <p>08:00 - 22:00</p>
                            <p>08:00 - 22:00</p>
                            <p>08:00 - 22:00</p>
                            <p>08:00 - 22:00</p>
                            <p>08:00 - 22:00</p>
                        </div>
                    </div>
                    <div className="contato-container">
                        <p className="sub-titulo-verde">Contato</p>
                        <p>{mercadoAtual.telefone}</p>
                        <p>{mercadoAtual.email}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Vertodos
