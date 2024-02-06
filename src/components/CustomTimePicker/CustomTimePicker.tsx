import "./CustomTimePicker.sass"

const CustomTimePicker = ({value, setValue, placeholder, disabled}) => {
    return (
        <div className="date-picker-wrapper">
            <span>{placeholder}</span>
            <input type="time" value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled}/>
        </div>
    )
}

export default CustomTimePicker