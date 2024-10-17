import "./SearchBar.css"

function SearchBar() {
    return (
        <div id="search-bar">
            <img src="Search.svg" alt="Buscar" class="search-icon" />
            <input type="text" placeholder="Busque por mercados" class="search-input" />
        </div>
    )
}

export default SearchBar
