import "./CustomInput.sass"

const CustomInput = ({placeholder, value, setValue, disabled}) => {
    return (
        <div className="input-container">
            <label>{placeholder}</label>
            <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
        </div>
    )
}

export default CustomInput