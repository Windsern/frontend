import "./SearchBar.sass"

const SearchBar = ({ query, setQuery, placeholder }) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <div className="search-bar-wrapper">

            <input
                type="text"
                placeholder={placeholder}
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

        </div>
    )
}

export default SearchBar;