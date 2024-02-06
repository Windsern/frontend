import CustomButton from "../CustomButton/CustomButton";
import {Link} from "react-router-dom";

const LinkButton = ({to, bg, children}) => {
    return (
        <Link to={to} style={{textDecoration: "none"}}>
            <CustomButton bg={bg}>
                {children}
            </CustomButton>
        </Link>
    )
}

export default LinkButton