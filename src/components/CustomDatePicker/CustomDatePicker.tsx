import "./CustomDatePicker.sass"

const CustomDatePicker = ({value, setValue, placeholder, disabled}) => {
    return (
        <div className="date-picker-wrapper">
            <span>{placeholder}</span>
            <input type="date" value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
        </div>
    )
}

export default CustomDatePicker