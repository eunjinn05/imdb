import "./index.css";
// @ts-ignore
import logo from "../../assets/logo.png";

import Inputbox from "../../components/inputbox/inputbox";
import {ChangeEvent, useRef, useState, KeyboardEvent} from "react";


export default function Join () {

    const [memberName, setMemberName] = useState<string>('');
    const [memberNameError, setMemberNameError] = useState<boolean>(false);
    const [memberNameErrorMessage, setMemberNameErrorMessage] = useState<string>('');
    const memberNameRef = useRef<HTMLInputElement | null>(null);

    const [memberEmail, setMemberEmail] = useState<string>('');
    const [memberEmailError, setMemberEmailError] = useState<boolean>(false);
    const [memberEmailErrorMessage, setMemberEmailErrorMessage] = useState<string>('');
    const memberEmailRef = useRef<HTMLInputElement | null>(null);

    const [memberPassword, setMemberPassword] = useState<string>('');
    const [memberPasswordError, setMemberPasswordError] = useState<boolean>(false);
    const [memberPasswordErrorMessage, setMemberPasswordErrorMessage] = useState<string>('');
    const memberPasswordRef = useRef<HTMLInputElement | null>(null);

    const [memberPasswordCheck, setMemberPasswordCheck] = useState<string>('');
    const [memberPasswordCheckError, setMemberPasswordCheckError] = useState<boolean>(false);
    const [memberPasswordCheckErrorMessage, setMemberPasswordCheckErrorMessage] = useState<string>('');
    const memberPasswordCheckRef = useRef<HTMLInputElement | null>(null);


    const onMemberNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMemberName(value);
        setMemberNameError(false);
        setMemberNameErrorMessage('');
    }
    const onChangeMemberEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMemberEmail(value);
        setMemberEmailError(false);
        setMemberEmailErrorMessage('');
    }
    const onChangeMemberPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMemberPassword(value);
        setMemberPasswordError(false);
        setMemberPasswordErrorMessage('');
    }
    const onChangeMemberPasswordCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMemberPasswordCheck(value);
        setMemberPasswordCheckError(false);
        setMemberNameErrorMessage('');
    }


    const onKeyDownMemberName = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        if (!memberEmailRef.current) return;
        memberEmailRef.current.focus();
    }
    const onKeyDownMemberEmail = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        if (!memberPasswordRef.current) return;
        memberPasswordRef.current.focus();
    }
    const onKeyDownMemberPassword = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        if (!memberPasswordCheckRef.current) return;
        memberPasswordCheckRef.current.focus();
    }
    const onKeyDownMemberPasswordCheck = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
    }



    return (
        <>
            <div className="join-container">
                <div className="join-logo-wrap">
                    <div className="join-logo" style={{backgroundImage: `url(${logo})`}} />
                </div>

                <div className="join-boarder-wrap">
                    <div className="join-boarder-text-wrap">
                        <span>Create account</span>
                    </div>
                    <div className="join-input-wrap">
                        <Inputbox value={memberName} placeholder="이름을 입력해주세요" onChange={onMemberNameChangeHandler} onKeyDown={onKeyDownMemberName} error={memberNameError} errorMessage={memberNameErrorMessage} type={'text'} ref={memberNameRef}/>
                        <Inputbox value={memberEmail} placeholder="이메일을 입력해주세요" onChange={onChangeMemberEmailHandler} onKeyDown={onKeyDownMemberEmail} error={memberEmailError} errorMessage={memberEmailErrorMessage} type={'text'} ref={memberEmailRef}/>
                        <Inputbox value={memberPassword} placeholder="비밀번호를 입력해주세요" onChange={onChangeMemberPasswordHandler} onKeyDown={onKeyDownMemberPassword} error={memberPasswordError} errorMessage={memberPasswordErrorMessage} type={'text'} ref={memberPasswordRef}/>
                        <Inputbox value={memberPasswordCheck} placeholder="확인 비밀번호를 입력해주세요" onChange={onChangeMemberPasswordCheckHandler} onKeyDown={onKeyDownMemberPasswordCheck} error={memberPasswordCheckError} errorMessage={memberPasswordCheckErrorMessage} type={'text'} ref={memberPasswordCheckRef}/>
                    </div>
                    <div className="join-button-wrap">
                        <input type="button" className="join-button" value="Create your IMDb account"/>
                    </div>
                    <div className="join-go-to-login">
                        <span>Login</span>
                    </div>
                </div>

            </div>
        </>
    )
}