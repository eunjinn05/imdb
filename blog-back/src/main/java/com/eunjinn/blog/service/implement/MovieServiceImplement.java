package com.eunjinn.blog.service.implement;

import com.eunjinn.blog.dto.response.ResponseDto;
import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import com.eunjinn.blog.entity.MovieThemeEntity;
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

    @Override
    public ResponseEntity<? super MovieThemeResponseDto> themeList() {
        List<MovieThemeEntity> movieThemeEntity = null;
        try {
            movieThemeEntity = movieThemeRepository.findByOrderByThemeIdxDesc();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return MovieThemeResponseDto.success(movieThemeEntity);
    }
}
