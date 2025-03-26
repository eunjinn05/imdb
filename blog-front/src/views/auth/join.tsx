import "./index.css";
// @ts-ignore
import logo from "../../assets/logo.png";

import Inputbox from "../../components/inputbox/inputbox";
import {ChangeEvent, useRef, useState, KeyboardEvent} from "react";
import JoinRequestDto from "../../apis/request/auth/join-request-dto";
import {joinRequest} from "../../apis";
import JoinResponseDto from "../../apis/response/auth/join-response-dto";
import ResponseDto from "../../apis/response/response.dto";
import {useNavigate} from "react-router-dom";
import {JOIN_PATH, LOGIN_PATH} from "../../constants";


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

    const navigator = useNavigate();

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
        if (!memberPasswordCheckRef.current) return;
        memberPasswordCheckRef.current.focus();
    }
    const onKeyDownMemberPasswordCheck = (e: KeyboardEvent<HTMLInputElement>) => {
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

        const isEqualPassword = memberPassword === memberPasswordCheck;
        if(!isEqualPassword) {
            setMemberPasswordCheckError(true);
            setMemberPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
        }

        const hasName = memberName.trim().length !== 0;
        if (!hasName) {
            setMemberNameError(true);
            setMemberNameErrorMessage("이름을 입력해주세요");
        }

        if (!isEmailPattern || !isCheckedPassword || !isEqualPassword || !hasName) return false;

        const requestBody: JoinRequestDto = { memberName, memberPassword, memberEmail };

        const joinResponse = (responseBody: JoinResponseDto | ResponseDto | false) => {
            if(!responseBody) return false;
            const {code} = responseBody;
            if(code === "DBE") alert("데이터베이스 오류입니다.");
            if(code === "DE") alert("중복 이메일입니다.");
            if(code !== "SU") return false;

            navigator(LOGIN_PATH());
        }
        joinRequest(requestBody).then(joinResponse);

    }

    const goToLogin = () => {
        navigator(LOGIN_PATH());
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
                        <Inputbox ref={memberNameRef} value={memberName} placeholder="이름을 입력해주세요" onChange={onMemberNameChangeHandler} onKeyDown={onKeyDownMemberName} error={memberNameError} errorMessage={memberNameErrorMessage} type={'text'} />
                        <Inputbox ref={memberEmailRef}  value={memberEmail} placeholder="이메일을 입력해주세요" onChange={onChangeMemberEmailHandler} onKeyDown={onKeyDownMemberEmail} error={memberEmailError} errorMessage={memberEmailErrorMessage} type={'text'} />
                        <Inputbox value={memberPassword} placeholder="비밀번호를 입력해주세요" onChange={onChangeMemberPasswordHandler} onKeyDown={onKeyDownMemberPassword} error={memberPasswordError} errorMessage={memberPasswordErrorMessage} type={'password'} ref={memberPasswordRef} />
                        <Inputbox value={memberPasswordCheck} placeholder="확인 비밀번호를 입력해주세요" onChange={onChangeMemberPasswordCheckHandler} onKeyDown={onKeyDownMemberPasswordCheck} error={memberPasswordCheckError} errorMessage={memberPasswordCheckErrorMessage} type={'password'} ref={memberPasswordCheckRef} />
                    </div>
                    <div className="join-button-wrap">
                        <input type="button" className="join-button" value="Create your IMDb account" onClick={onSignUpButtonClickHandler}/>
                    </div>
                    <div className="join-go-to-login">
                        <span onClick={goToLogin}>Login</span>
                    </div>
                </div>

            </div>
        </>
    )
}