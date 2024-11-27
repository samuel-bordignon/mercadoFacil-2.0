import Navbar from "../components/Navbar"


import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState } from 'react'
import "./TelaInfoProduto.css"


function TelaInfoProduto() {
    const { getLocalStorage, chaveMercadoLocal, mercadosdb, enderecoMercadodb, chaveProdutoLocal, produtosdb } = useContext(GlobalContext)


    const idMercado = getLocalStorage(chaveMercadoLocal)

    const mercadoAtual = mercadosdb.find((mercado) => mercado.id === idMercado)
    const enderecoAtual = enderecoMercadodb.find((endereco) => endereco.idMercado === idMercado)
    enderecoMercadodb.forEach((element) => console.log(element.idMercado))
    mercadosdb.forEach((element) => console.log(element.cnpj))

    const idProduto = getLocalStorage(chaveProdutoLocal)

    const ProdutoAtual = produtosdb.find((produto) => produtosdb.id === idProduto)
    // produtosdb.forEach((element) => console.log(element.cnpj))

    return (
        <div className='tudo-tela'>
            <Navbar />
            <div className="tela-info-mercado">
                <div className="sideBar-dentro-mercado">
                    <div className="nome-mercado-container">
                        <h5>{mercadoAtual.nome}</h5>
                    </div>
                    <div className="endereco-cnpj-container">
                        <p className="sub-titulo-verde">Sobre</p>
                        {/* <h5>{mercadosdb.find((endereco) => endereco.idMercado === idMercadoAtivo)}</h5> */}
                        <p>Informações sobre o endereço do mercado</p>
                        <p>{enderecoAtual.cep}</p>
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
                        <p>+{mercadoAtual.telefone}</p>
                        <p>{mercadoAtual.email}</p>
                    </div>
                </div>
                <div className="geral-produto-container">
                    <div className="produto-especifico-container">
                        <div className="espaco-img-prod-container">
                            <div className="fundo-img">
                                <img src="acucar.png" alt="" />
                                {/* <img src={ProdutoAtual.imagem} alt="" /> */}
                            </div>
                        </div>
                        <div className="infos-produto-container">
                            <h1 className="nome-produto">Açúcar Refinado</h1>
                            <p className="descricao-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                            <p className="preco-produto">R$00,00</p>
                            <hr />
                            <button>Adicionar à Lista</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TelaInfoProduto