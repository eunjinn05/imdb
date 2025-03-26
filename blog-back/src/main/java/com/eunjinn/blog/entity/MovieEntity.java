package com.eunjinn.blog.entity;

import com.eunjinn.blog.dto.request.movie.MovieUploadRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="movie")
@Table(name="movie")
public class MovieEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieIdx;
    private String movieName;
    private String movieImage;
    private String moviePlot;
    private int movieThemeIdx;

    public MovieEntity(MovieUploadRequestDto dto) {
        this.movieName = dto.getMovieName();
        this.movieImage = dto.getMovieImage();
        this.moviePlot = dto.getMoviePlot();
        this.movieThemeIdx = dto.getMovieThemeIdx();
    }

}
