import JoinRequestDto from "./request/auth/join-request-dto";
import axios from "axios";
import JoinResponseDto from "./response/auth/join-response-dto";
import ResponseDto from "./response/response.dto";
import LoginRequestDto from "./request/auth/login-request-dto";
import LoginResponseDto from "./response/auth/login-response-dto";
import MovieThemeListResponseDto from "./response/movie/movie-theme-list-response-dto";
import LoginUserResponseDto from "./response/auth/login-user-response-dto";
import MovieUploadRequestDto from "./request/movie/movie-upload-request.dto";
import MovieUploadResponseDto from "./response/movie/movie-upload-response.dto";

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const JOIN_URL = () => `${API_DOMAIN}/auth/join`;
const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;
const GET_LOGIN_USER_URL = () => `${API_DOMAIN}/auth/userInfo`;
const GET_MOVIE_THEME_LIST_URL = () => `${API_DOMAIN}/movie/themeList`;
const POST_MOVIE_UPLOAD_URL = () => `${API_DOMAIN}/movie/upload`;
const POST_MOVIE_FILE_UPLOAD_URL = () => `${DOMAIN}/file/upload`;

const authorization = (accessToken: string) => {return {headers : {Authorization: `Bearer ${accessToken}`}}}

export const joinRequest = async(requestBody: JoinRequestDto) => {
    const result = await axios.post(JOIN_URL(), requestBody)
        .then(response => {
            const responseBody: JoinResponseDto = response.data;
            return responseBody;
        }).catch(e => {
            const responseBody: ResponseDto = e.response.data;
            return responseBody;
        });
    return result;
}

export const loginRequest = async(requestBody: LoginRequestDto) => {
    const result = await axios.post(LOGIN_URL(), requestBody)
        .then(response => {
            const responseBody: LoginResponseDto = response.data;
            return responseBody;
        }).catch(e => {
            const responseBody: ResponseDto = e.response.data;
            return responseBody;
        });
    return result;
}

export const getMovieThemeListRequest = async () => {
    const result = await axios.get(GET_MOVIE_THEME_LIST_URL())
        .then(response => {
            const responseBody: MovieThemeListResponseDto = response.data;
            return responseBody;
        }).catch(e => {
            const responseBody: ResponseDto = e.response.data;
            return responseBody;
        });
    return result;
}

export const getLoginUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_LOGIN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: LoginUserResponseDto = response.data;
            return responseBody;
        }).catch(e => {
            const responseBody: ResponseDto = e.response.data;
            return responseBody;
        });
    return result;
}

export const postMovieUploadRequest = async (requestBody: MovieUploadRequestDto) => {
    const result = await axios.post(POST_MOVIE_UPLOAD_URL(), requestBody)
        .then(response => {
            const responseBody: MovieUploadResponseDto = response.data;
            return responseBody;
        }).catch(e => {
            const responseBody: ResponseDto = e.response.data;
            return responseBody;
        });
    return result;
}

export const postMovieFileUploadRequest = async (data: FormData) => {
    const result = await axios.post(POST_MOVIE_FILE_UPLOAD_URL(), data, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            const responseBody = response.data;
            return responseBody;
        }).catch(e => {
            return null;
        });
    return result;
}