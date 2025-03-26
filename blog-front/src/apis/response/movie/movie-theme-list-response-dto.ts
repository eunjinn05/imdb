import ResponseDto from "../response.dto";
import User from "../../../types/interface/user.interface";
import MovieThemeItem from "../../../types/interface/movie-theme.interface";

export default interface MovieThemeListResponseDto extends ResponseDto, User {
    getThemeList: MovieThemeItem;
}