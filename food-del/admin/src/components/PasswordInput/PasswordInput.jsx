import { useState } from "react";
import "./PasswordInput.css";

const PasswordInput = ({ value, onChange, placeholder, required, autoFocus }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="admin-password-wrapper">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoFocus={autoFocus}
            />
            <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShow(s => !s)}
                tabIndex={-1}
                aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
                {show ? "🙈" : "👁"}
            </button>
        </div>
    );
};

export default PasswordInput;
