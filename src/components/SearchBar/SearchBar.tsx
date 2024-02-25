import "./SearchBar.sass"
import {FaSearch} from "react-icons/fa";

type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
}

const SearchBar = ({ query, setQuery }:SearchBarProps) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <div className="search-bar-wrapper">

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </div>
    )
}

export default SearchBar;