import "./movie.css";
import {ChangeEvent, useEffect, useRef, useState} from "react";
// @ts-ignore
import upload from "../../assets/upload.png";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../constants";
import {getMovieThemeListRequest, postMovieFileUploadRequest} from "../../apis";
import MovieThemeListResponseDto from "../../apis/response/movie/movie-theme-list-response-dto";
import ThemeBox from "../../components/themebox/themeBox";
import MovieThemeItem from "../../types/interface/movie-theme.interface";
import useMovieStore from "../../store/movie.store";


export const MovieWrite = () => {

    const [cookies, setCookies] = useCookies();
    const navigator = useNavigate();

    const [getThemeList, setGetThemeList] = useState<MovieThemeItem[]>([]);

    const getMovieThemeListResponse = (responseBody: any) => {
        if(!responseBody) return false;
        const {code, getThemeList} = responseBody;
        if(code !== "SU") return false;
        setGetThemeList(getThemeList);
    }

    useEffect(() => {
        if(!cookies.accessToken) {
            alert("로그인 후 접근 가능합니다.");
            navigator(MAIN_PATH());
        }
        getMovieThemeListRequest().then(getMovieThemeListResponse);
    }, []);

    const movieImageRef = useRef<HTMLDivElement | null>(null);
    const movieFileRef = useRef<HTMLInputElement | null>(null);

    const {movieName, setMovieName, moviePlot, setMoviePlot, movieThemeIdx, setMovieThemeIdx, movieImageUrl, setMovieImageUrl, resetMovie, movieImageCheck, setMovieImageCheck} = useMovieStore();

    const onChangeMovieName = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMovieName(value);
    }

    const onChangeMoviePlot = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        setMoviePlot(value);
    }

    const onClickMovieWriteImage = () => {
        if(!movieFileRef.current) return false;
        movieFileRef.current.click();
        setMovieImageCheck(false);
    }

    const onChangeMovieImage =(e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || e.target.files.length === 0) return false;
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        movieImageUrl.push(imageUrl);
        setMovieImageUrl(movieImageUrl);
        setMovieImageCheck(true);

        if(!movieImageRef.current) return false;
        movieImageRef.current.style.backgroundSize = "contain";
        movieImageRef.current.style.backgroundPosition = "center";
    }

    const onClickMovieUploadButton = async () => {
        const data = new FormData();
        movieImageUrl.forEach((item) => {
            data.append('file', item);
        });
        await postMovieFileUploadRequest(data);
    }

    return (
        <>
            <div className="movie-write-container">
                <h1>영화 등록</h1>
                <div className="movie-write-wrap">
                    <div className="movie-write-context">
                        {!movieImageCheck &&(
                            <div className="movie-write-image" style={{backgroundImage: `url( ${upload} )`}} onClick={onClickMovieWriteImage} />
                        )}
                        {movieImageCheck &&(
                            <div className="movie-write-image" style={{backgroundImage: `url( ${movieImageUrl} )`, backgroundSize:'cover', backgroundPosition:'center'}}  onClick={onClickMovieWriteImage} ref={movieImageRef} />
                        )}
                        <input type="file" accept="image/*" style={{display: 'none'}} ref={movieFileRef} onChange={onChangeMovieImage}/>
                        <div className="movie-write-title-wrap">
                            <input type="text" value={movieName} onChange={onChangeMovieName} placeholder="영화 제목을 입력해주세요." /> <br/>
                            <select>
                                <option>장르를 선택해주세요</option>
                                {getThemeList.map(list => <ThemeBox MovieTheme={list} />)}
                            </select>
                        </div>
                    </div>
                    <div className="movie-write-plot-wrap">
                        <textarea onChange={onChangeMoviePlot} placeholder="영화 줄거리를 입력해주세요.">{moviePlot}</textarea>
                    </div>

                    <div className="movie-write-upload-button-wrap">
                        <input type="button" className="movie-write-upload-button" onClick={onClickMovieUploadButton} value="업로드" />
                    </div>
                </div>
            </div>
        </>
    )
}