import "./index.css";
import {ChangeEvent, forwardRef, KeyboardEvent} from "react";

interface Prop {
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    error: boolean;
    errorMessage: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (events: KeyboardEvent<HTMLInputElement>) => void;

}

const InputBox = forwardRef<HTMLInputElement, Prop>((props: Prop, ref) => {
    const {type, placeholder, value, error, errorMessage, onChange, onKeyDown} = props;
    return (
        <>
            <div className="input-box-wrap">
                <input className="input-box" type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} ref={ref} />
                {error && ( <div className="input-error-message"><p>{errorMessage}</p></div> )}
           </div>
        </>
    )
});

export default InputBox;
