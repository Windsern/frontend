import "./VerificationConstructor.sass"
import {useVerification} from "../../hooks/verifications/useVerification";
import {Link} from "react-router-dom";

const VerificationConstructor = () => {

    const {verification_id} = useVerification()

    if (verification_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая проверка</span>
            </div>
        )
    }

    return (
        <Link to={`/verifications/${verification_id}`} className="constructor-container">
            <span className="title">Новая проверка</span>
        </Link>
    )
}

export default VerificationConstructor