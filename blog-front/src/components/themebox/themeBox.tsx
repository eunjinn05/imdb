import MovieThemeItem from "../../types/interface/movie-theme.interface";

interface Props {
    MovieTheme: MovieThemeItem
}

export default function ThemeBox({MovieTheme}: Props) {
    const {themeIdx, themeName} = MovieTheme;
    return (
        <option value={themeIdx}>{themeName}</option>
    )
};

