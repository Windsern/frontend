import "./CustomTextarea.sass"

const CustomTextarea = ({value, placeholder, setValue}) => {
    return (
        <div className="textarea-container">
            <label>{placeholder}</label>
            <textarea placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} rows="5" cols="40"/>
        </div>
    )
}

export default CustomTextarea