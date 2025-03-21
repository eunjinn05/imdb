import {Outlet} from "react-router-dom";
import Footer from "../footer";
import Header from "../header";

export default function Container() {
    return (
        <>

                <Header />
                <div id="main-wrap">
                    <Outlet />
                </div>
                <Footer />
        </>
    )
}