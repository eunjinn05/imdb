package com.eunjinn.blog.service.implement;

import com.eunjinn.blog.dto.request.movie.MovieUploadRequestDto;
import com.eunjinn.blog.dto.response.ResponseDto;
import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import com.eunjinn.blog.dto.response.movie.MovieUploadResponseDto;
import com.eunjinn.blog.entity.MovieEntity;
import com.eunjinn.blog.entity.MovieThemeEntity;
import com.eunjinn.blog.repository.MovieRepository;
import com.eunjinn.blog.repository.MovieThemeRepository;
import com.eunjinn.blog.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieServiceImplement implements MovieService {

    private final MovieThemeRepository movieThemeRepository;
    private final MovieRepository movieRepository;

    @Override
    public ResponseEntity<? super MovieThemeResponseDto> themeList() {
        List<MovieThemeEntity> movieThemeEntity = null;
        try {
            movieThemeEntity = movieThemeRepository.findByOrderByThemeIdxAsc();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return MovieThemeResponseDto.success(movieThemeEntity);
    }

    @Override
    public ResponseEntity<? super MovieUploadResponseDto> upload(MovieUploadRequestDto dto) {
        try {
            MovieEntity movieEntity = new MovieEntity(dto);
            movieRepository.save(movieEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return MovieUploadResponseDto.success();
    }
}
