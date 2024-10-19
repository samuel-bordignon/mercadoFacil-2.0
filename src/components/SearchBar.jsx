import "./SearchBar.css"

function SearchBar() {
    return (
        <div id="search-bar">
            <button className="btn-search">
                <img src="search.svg" alt="Buscar" class="search-icon" />

            </button>
            <input type="text" placeholder="Busque por mercados" class="search-input" />
        </div>
    )
}

export default SearchBar
