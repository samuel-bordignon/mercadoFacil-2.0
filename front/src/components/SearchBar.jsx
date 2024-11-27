import { div } from "framer-motion/client";
import "./SearchBar.css";
import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isListVisible, setIsListVisible] = useState(false);
    const inputRef = useRef(null);

    // Função para transformar a entrada, removendo acentos, espaços e caracteres especiais
    const transformarEntrada = (input) => {
        const semAcentos = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return semAcentos.replace(/[^a-zA-Z0-9]/g, ""); // Mantém apenas letras e números
    };

    // Captura o que o usuário digita (com acentos e espaços) e transforma "por baixo dos panos"
    const handleChange = (e) => {
        const valorOriginal = e.target.value; // Entrada original do usuário
        setSearchTerm(valorOriginal); // Armazena o valor original no estado
    };

    // Mostrar a lista ao clicar no input
    const handleInputClick = () => {
        setIsListVisible(true);
    };

    // Ocultar a lista ao clicar fora do input
    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setIsListVisible(false);
        }
    };

    // Adicionar/remover o evento para detectar clique fora do input
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filtrar dados com base no termo "limpo" da pesquisa
    const termoLimpo = transformarEntrada(searchTerm);
    const filteredData = data.filter((item) =>
        transformarEntrada(item).toLowerCase().includes(termoLimpo.toLowerCase())
    );

    return (
        <div id="search-bar-container">
            <div id="search-bar" ref={inputRef}>
                <button className="btn-search">
                    <img src="search.svg" alt="Buscar" className="search-icon" />
                </button>
                <input
                    type="text"
                    placeholder="Busque por mercados"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleChange}
                    onClick={handleInputClick} // Mostrar lista ao clicar
                />
            </div>
            <div id="list-itens">
                {isListVisible && (
                    <ul className="list">
                        {filteredData.map((item, index) => (
                            <li key={index} className="list-item-search">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
