import "./index.css";
// @ts-ignore
import logo from "../../assets/logo.png";

import Inputbox from "../../components/inputbox/inputbox";
import {ChangeEvent, useRef, useState, KeyboardEvent} from "react";
import {useNavigate} from "react-router-dom";
import LoginRequestDto from "../../apis/request/auth/login-request-dto";
import LoginResponseDto from "../../apis/response/auth/login-response-dto";
import ResponseDto from "../../apis/response/response.dto";
import {JOIN_PATH, MAIN_PATH} from "../../constants";
import {loginRequest} from "../../apis";
import {useCookies} from "react-cookie";


export default function Login () {
    const [memberEmail, setMemberEmail] = useState<string>('');
    const [memberEmailError, setMemberEmailError] = useState<boolean>(false);
    const [memberEmailErrorMessage, setMemberEmailErrorMessage] = useState<string>('');
    const memberEmailRef = useRef<HTMLInputElement | null>(null);

    const [memberPassword, setMemberPassword] = useState<string>('');
    const [memberPasswordError, setMemberPasswordError] = useState<boolean>(false);
    const [memberPasswordErrorMessage, setMemberPasswordErrorMessage] = useState<string>('');
    const memberPasswordRef = useRef<HTMLInputElement | null>(null);

    const navigator = useNavigate();

    const [cookies, setCookies] = useCookies();

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

    const onKeyDownMemberName = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        if (!memberEmailRef.current) return false;
        memberEmailRef.current.focus();
    }
    const onKeyDownMemberEmail = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        if (!memberPasswordRef.current) return;
        memberPasswordRef.current.focus();
    }

    const onKeyDownMemberPassword = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return false;
        onSignUpButtonClickHandler();
    }

    const onSignUpButtonClickHandler = () => {
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(memberEmail);
        if(!isEmailPattern){
            setMemberEmailError(true);
            setMemberEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
        }

        const isCheckedPassword = memberPassword.trim().length >= 8;
        if(!isCheckedPassword) {
            setMemberPasswordError(true);
            setMemberPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
        }

        if (!isEmailPattern || !isCheckedPassword) return false;

        const requestBody: LoginRequestDto = { memberPassword, memberEmail };

        const loginResponse = (responseBody: LoginResponseDto | ResponseDto | false) => {
            if(!responseBody) return false;
            const {code} = responseBody;
            if(code === "DBE") alert("데이터베이스 오류입니다.");
            if(code === "SF") alert("이메일, 비밀번호를 다시 입력해주세요.");
            if(code !== "SU") return false;

            const {token, expirationTime} = responseBody as LoginResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);
            setCookies('accessToken', token, {expires, path: MAIN_PATH()});
            navigator(MAIN_PATH());
        }
        loginRequest(requestBody).then(loginResponse);
    }

    const goToJoin = () => {
        navigator(JOIN_PATH());
    }


    return (
        <>
            <div className="join-container">
                <div className="join-logo-wrap">
                    <div className="join-logo" style={{backgroundImage: `url(${logo})`}} />
                </div>

                <div className="join-boarder-wrap">
                    <div className="join-boarder-text-wrap">
                        <span>Login account</span>
                    </div>
                    <div className="join-input-wrap">
                       <Inputbox ref={memberEmailRef}  value={memberEmail} placeholder="이메일을 입력해주세요" onChange={onChangeMemberEmailHandler} onKeyDown={onKeyDownMemberEmail} error={memberEmailError} errorMessage={memberEmailErrorMessage} type={'text'} />
                        <Inputbox value={memberPassword} placeholder="비밀번호를 입력해주세요" onChange={onChangeMemberPasswordHandler} onKeyDown={onKeyDownMemberPassword} error={memberPasswordError} errorMessage={memberPasswordErrorMessage} type={'password'} ref={memberPasswordRef} />
                    </div>
                    <div className="join-button-wrap">
                        <input type="button" className="join-button" value="Login your IMDb account" onClick={onSignUpButtonClickHandler}/>
                    </div>
                    <div className="login-go-to-join">
                        <span onClick={goToJoin}>Join</span>
                    </div>
                </div>

            </div>
        </>
    )
}