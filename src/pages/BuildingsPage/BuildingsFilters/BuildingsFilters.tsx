import "./BuildingsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useBuildings} from "../../../hooks/buildings/useBuildings";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const BuildingsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useBuildings()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="buildings-filters">

            <h2>Поиск зданий</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/buildings/add" bg={variables.primary}>
                        Добавить здание
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default BuildingsFilters