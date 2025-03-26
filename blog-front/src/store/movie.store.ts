import {create} from "zustand/react";

interface MovieStore {
    movieName: string;
    movieImageUrl: string[];
    movieImageCheck: boolean;
    moviePlot: string;
    movieThemeIdx: number;
    setMovieName: (movieName: string) => void;
    setMovieImageUrl: (movieImageUrl: string[]) => void;
    setMovieImageCheck: (movieImageCheck: boolean) => void;
    setMoviePlot: (moviePlot: string) => void;
    setMovieThemeIdx: (movieThemeIdx: number) => void;
    resetMovie: () => void;
}

const useMovieStore = create<MovieStore>(set => ({
    movieName: '',
    movieImageUrl: [],
    movieImageCheck: false,
    moviePlot: '',
    movieThemeIdx: 0,
    setMovieName: (movieName: string) => set(state => ({...state, movieName})),
    setMovieImageUrl: (movieImageUrl: string[]) => set(state => ({...state, movieImageUrl})),
    setMovieImageCheck: (movieImageCheck: boolean) => set(state =>({...state, movieImageCheck})),
    setMoviePlot: (moviePlot: string) => set(state => ({...state, moviePlot})),
    setMovieThemeIdx: (movieThemeIdx: number) => set(state => ({...state, movieThemeIdx})),
    resetMovie: () => set(state => ({...state, movieName:'', movieImageUrl:[], moviePlot:'', movieThemeIdx:0}))
}));

export default useMovieStore;