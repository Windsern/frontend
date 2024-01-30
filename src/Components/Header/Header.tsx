import "./Header.sass"
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
    return (
        <div className="header-wrapper">

            <div className="left-container">
                <h3>Список строений</h3>
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;