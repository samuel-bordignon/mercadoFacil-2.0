import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './GerenciaListas.css';
import buscar from '../assets/images/SearchAzul.svg'; // A imagem da lupa
import ListaCompras from '../components/ListaCompras';
import btnMais from '../assets/images/Mais.svg';
import VerMais from '../assets/images/VerMais.svg';

function GerenciaListas() {
    const [tagAtiva, setTagAtiva] = useState('Todas'); // Estado para controlar a tag ativa

    const aoClicarNaTag = (tag) => {
        setTagAtiva(tag); // Define a tag ativa ao clicar
    };

    return (
        <div>
            <Navbar />
            <div className="container-gerenciaListas">
                <div className='lista'>
                    <div className="cabecalho-lista">
                        <h3 className='h3-GerenciaLista'>Enviada para:</h3>
                        <h3 className='h3-GerenciaLista'>Data: 00/00/00</h3>
                    </div>

                    <ListaCompras />
                </div>

                <div className="container-lista">
                    <h1 className='h1-cabecalho'>Central de Listas</h1>
                    <div className="background-searchBar">
                        <div id="search-bar2">
                            <button className="btn-search">
                                <img src={buscar} alt="Buscar" className="search-icon" />
                            </button>
                            <input type="text" placeholder="Busque por mercados" className="search-input" />
                        </div>
                        <button className="btn-lista">
                            <img src={btnMais} alt="Ícone de Mais" className="btn-mais-icon" />
                            Lista
                        </button>
                    </div>

                    {/* Container de tags */}
                    <div className="tags">
                        <h3
                            className={`tag ${tagAtiva === 'Todas' ? 'tagVerde' : ''}`}
                            onClick={() => aoClicarNaTag('Todas')}
                        >
                            Todas
                        </h3>
                        <h3
                            className={`tag ${tagAtiva === 'Mais Recentes' ? 'tagVerde' : ''}`}
                            onClick={() => aoClicarNaTag('Mais Recentes')}
                        >
                            Mais Recentes
                        </h3>
                        <h3
                            className={`tag ${tagAtiva === 'Menos Recentes' ? 'tagVerde' : ''}`}
                            onClick={() => aoClicarNaTag('Menos Recentes')}
                        >
                            Menos Recentes
                        </h3>
                        <h3
                            className={`tag ${tagAtiva === 'Mercados' ? 'tagVerde' : ''}`}
                            onClick={() => aoClicarNaTag('Mercados')}
                        >
                            Mercados
                        </h3>
                        <h3
                            className={`tag ${tagAtiva === 'Itens' ? 'tagVerde' : ''}`}
                            onClick={() => aoClicarNaTag('Itens')}
                        >
                            Itens
                        </h3>
                    </div>

                    <div className="container2-listas">
                        <div className='cabecalhoContainer2'>
                            <h1 className='classeListas'>Favoritos</h1>
                            <div className="btn-VerMais">
                                <button className='btnVerMais'>Ver Mais</button>
                                <img className='VerMais' src={VerMais} alt="Ícone Ver Mais Verde" />
                            </div>
                        </div>

                        <div className="divzaoListas">
                            <div className='lista-div'>
                                <div className="texto-div">
                                    <h2 className='nomeLista'>Produtos de Higiene</h2>
                                    <h2 className='itensLista'>Itens: Desinfetante, Papel Higiênico, Sabonete</h2>
                                </div>
                                <h2 className='dataLista'>Data: 00/00/00</h2>
                            </div>

                            <div className='lista-div'>
                                <div className="texto-div">
                                    <h2 className='nomeLista'>Produtos de Higiene</h2>
                                    <h2 className='itensLista'>Itens: Desinfetante, Papel Higiênico, Sabonete</h2>
                                </div>
                                <h2 className='dataLista'>Data: 00/00/00</h2>
                            </div>
                        </div>

                        <div className="container3-listas">
                        <div className='cabecalhoContainer2'>
                            <h1 className='classeListas'>Histórico</h1>
                            <div className="btn-VerMais">
                                <button className='btnVerMais'>Ver Mais</button>
                                <img className='VerMais' src={VerMais} alt="Ícone Ver Mais Verde" />
                            </div>
                        </div>

                        <div className="divzaoListas">
                            <div className='lista-div'>
                                <div className="texto-div">
                                    <h2 className='nomeLista'>Produtos de Higiene</h2>
                                    <h2 className='itensLista'>Itens: Desinfetante, Papel Higiênico, Sabonete</h2>
                                </div>
                                <h2 className='dataLista'>Data: 00/00/00</h2>
                            </div>

                            <div className='lista-div'>
                                <div className="texto-div">
                                    <h2 className='nomeLista'>Produtos de Higiene</h2>
                                    <h2 className='itensLista'>Itens: Desinfetante, Papel Higiênico, Sabonete</h2>
                                </div>
                                <h2 className='dataLista'>Data: 00/00/00</h2>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GerenciaListas;
