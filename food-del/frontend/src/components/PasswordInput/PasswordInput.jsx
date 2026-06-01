import { useState } from "react";
import "./PasswordInput.css";

const PasswordInput = ({ value, onChange, placeholder, name, required, className }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={`password-input-wrapper ${className || ""}`}>
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                required={required}
            />
            <button
                type="button"
                className="password-toggle"
                onClick={() => setShow(s => !s)}
                tabIndex={-1}
                aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
                {show ? "*" : "👁"}
            </button>
        </div>
    );
};

export default PasswordInput;
