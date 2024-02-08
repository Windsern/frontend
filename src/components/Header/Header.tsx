import "./Header.sass"
import NavMenu from "./NavMenu/NavMenu";
import logo from "/src/assets/logo.png"

const Header = () => {
    return (
        <div className="header-wrapper">

            <div className="left-container">
                <img src={logo} alt=""/>
               <h3>Технадзор строительных объектов МГТУ</h3>
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;