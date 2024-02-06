import "./UploadButton.sass"
import React from "react";

const UploadButton = ({handleFileChange}) => {
    return (
        <label className="input-file">
            <input type="file" accept="image/*" name="file" onChange={handleFileChange} />
            <span className="input-file-btn">Выберите файл</span>
        </label>
    )
}

export default UploadButton