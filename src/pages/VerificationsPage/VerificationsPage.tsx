import VerificationsTable from "./VerificationsTable/VerificationsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const VerificationsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/buildings")
        }
    }, [])

    return (
        <div>
            <VerificationsTable />
        </div>
    )
}

export default VerificationsPage;

