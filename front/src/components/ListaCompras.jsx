import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // useNavigate para navegação
import './PopUpListaCompras.css';

const ListaCompras = () => {
    const [produtosdb, setProdutosdb] = useState([
        { id: 1, nome: "Arroz Branco", preco: 10.00, quantidade: 1, imagem: "arroz.png", informacaoAdicional: { peso: "5", unidade: "kg" } },
        { id: 2, nome: "Fardo Skol", preco: 5.50, quantidade: 1, imagem: "skol.png", informacaoAdicional: { peso: "12", unidade: "unidades" } },
        { id: 3, nome: "Farinha de Trigo", preco: 4.20, quantidade: 1, imagem: "farinha.png", informacaoAdicional: { peso: "1", unidade: "kg" } },
    ]);

    const [mercadosdb, setMercadosdb] = useState([
        { id: 1, nome: "Mercado do João", endereco: "Rua das Flores, 123", cep: "88058089", logo: "1.png", atual: true, celular: 554899749819 },
        { id: 2, nome: "Mercado do José", endereco: "Rua das Palmeiras, 456", cep: "88058080", logo: "2.png", atual: false, celular: 554899749819 },
    ]);

    const deleteProduto = (id) => {
        setProdutosdb(produtosdb.filter(produto => produto.id !== id));
    };

    const incrementaProduto = (id) => {
        setProdutosdb(produtosdb.map(produto =>
            produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
        ));
    };

    const desincrementaProduto = (id) => {
        setProdutosdb(produtosdb.map(produto =>
            produto.id === id && produto.quantidade > 1 ? { ...produto, quantidade: produto.quantidade - 1 } : produto
        ));
    };

    // Função para calcular o total
    const calcularTotal = () => {
        return produtosdb.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
    };

    const navigate = useNavigate(); // Para navegação

    return (
        <div className="shopping-list2">
            {mercadosdb.length === 0 ? (
                <span className="empty-list">Nenhum mercado disponível.</span>
            ) : (
                mercadosdb.map((mercado) => {
                    if (mercado.atual) {
                        return (
                            <div key={mercado.id} className="market-list2">
                                <div className="logo-name">
                                    <img src={mercado.logo} alt="Logo do mercado" className="logo-mercado" />
                                    <span className="market-name">{mercado.nome}</span>
                                </div>
                                <NavLink to="/mercado" className="visitar-mercado2">Ver Catálogo</NavLink>
                            </div>
                        );
                    }
                    return null;
                })
            )}
            <div className="list-itens">
                {produtosdb.length > 0 ? (
                    produtosdb.map((item) => (
                        <div key={item.id} className="list-item2">
                            <div className="item-info">
                                <div className="img-details2">
                                    <div className="item-image">
                                        <img src={item.imagem} alt={item.nome} />
                                    </div>
                                    <div className="details2">
                                        <span className="item-name">{item.nome}</span>
                                        <span className="item-additional-info">
                                            {item.informacaoAdicional.peso} {item.informacaoAdicional.unidade}
                                        </span>
                                    </div>
                                </div>
                                <div className="preco">
                                    <span className="item-preco2">R$ {item.preco.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="quantity-controls-container2">
                                <button className="remove-btn" onClick={() => deleteProduto(item.id)}>
                                    Remover
                                </button>
                                <div className="quantity-control2">
                                    <button className="decrease-btn" onClick={() => desincrementaProduto(item.id)}>
                                        −
                                    </button>
                                    <span className="quantity">{item.quantidade}</span>
                                    <button className="increase-btn" onClick={() => incrementaProduto(item.id)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className="empty-list">Sua lista de compras está vazia.</span>
                )}
            </div>
            <div className="total-container2">
                <div className="total-details">
                    <span className="total-text">Total</span>
                    <span className="total-preco">R$ {calcularTotal()}</span>
                </div>
                <div className="total-btns">
                    <button className="comparar-btn" onClick={() => navigate('/comparacaoListas')}>
                        Comparar Listas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListaCompras;
