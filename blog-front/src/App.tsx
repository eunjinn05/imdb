import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Container from "./layouts/container";
import {JOIN_PATH, LOGIN_PATH, MAIN_PATH, MOVIE_WRITE_PATH} from "./constants";
import Main from "./views/main/main";
import Join from "./views/auth/join";
import Login from "./views/auth/login";
import {MovieWrite} from "./views/movie/movieWrite";
import {useCookies} from "react-cookie";
import useLoginUserStore from "./store/login-user.store";
import {getLoginUserRequest} from "./apis";
import LoginUserResponseDto from "./apis/response/auth/login-user-response-dto";
import ResponseDto from "./apis/response/response.dto";
import User from "./types/interface/user.interface";

function App() {

    const [cookies, setCookies] = useCookies();
    const {setLoginUser, resetLoginUser} = useLoginUserStore();

    const getLoginUserResponse = (responseBody: LoginUserResponseDto | ResponseDto | false) => {
        if(!responseBody) return false;
        const code = responseBody.code;
        if(code === "NU" || code === "DBE") {
            resetLoginUser();
            return false;
        }
        const loginUser: User = { ...responseBody as LoginUserResponseDto};
        setLoginUser(loginUser);
    }



    useEffect(() => {
        if(!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        getLoginUserRequest(cookies.accessToken).then(getLoginUserResponse);
    }, [cookies.accessToken]);


  return (
      <Routes>
          <Route element={<Container />}>
              <Route path={MAIN_PATH()} element={<Main />} />
              <Route path={JOIN_PATH()} element={<Join />} />
              <Route path={LOGIN_PATH()} element={<Login />} />
              <Route path={MOVIE_WRITE_PATH()} element={<MovieWrite />} />
          </Route>
      </Routes>
  );
}

export default App;
