import"./index.css";
// @ts-ignore
import logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {JOIN_PATH, LOGIN_PATH, MAIN_PATH} from "../../constants";
import {useCookies} from "react-cookie";
import LoginUserStore from "../../store/login-user.store";

export default function Header() {

    const navigator = useNavigate();
    const [cookies, setCookie] = useCookies();
    const { resetLoginUser } = LoginUserStore()

    const goToMain = () => {
        navigator(MAIN_PATH());
    }

    const goToLogout = () => {
        resetLoginUser();
        setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() })
        navigator(MAIN_PATH());
    }

    const goToLogin = () => {
        navigator(LOGIN_PATH());
    }

    return (
        <>
            <div className="header-container">
                <div className="header-wrap">
                    <div className="header-logo-wrap">
                        <div className="header-logo" style={{backgroundImage: `url(${logo})`}} onClick={goToMain}/>
                    </div>
                    <div className="header-menu-wrap">
                        <span>News</span>
                        <span>Movies</span>
                    </div>
                    <div className="header-search-wrap">
                        <input className="header-search" />
                    </div>

                    { cookies.accessToken && (
                        <>
                            <div className="header-login-wrap">
                                <span onClick={goToLogout}>Logout</span>
                            </div>
                        </>
                    ) }
                    { !cookies.accessToken && (
                        <>
                            <div className="header-login-wrap">
                                <span onClick={goToLogin}>Login</span>
                            </div>
                        </>
                    ) }
                </div>
            </div>
        </>
    )
}