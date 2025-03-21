import"./index.css";
// @ts-ignore
import logo from "../../assets/logo.png";

export default function Header() {
    return (
        <>
            <div className="header-container">
                <div className="header-wrap">
                    <div className="header-logo-wrap">
                        <div className="header-logo" style={{backgroundImage: `url(${logo})`}} />
                    </div>
                    <div className="header-menu-wrap">
                        <span>News</span>
                        <span>Movies</span>
                    </div>
                    <div className="header-search-wrap">
                        <input className="header-search" />
                    </div>
                    {/*<div className="header-login-wrap">*/}
                    {/*    <span>Login</span>*/}
                    {/*</div>*/}
                    <div className="header-login-wrap">
                        <span>Sign In</span>
                    </div>

                </div>
            </div>
        </>
    )
}