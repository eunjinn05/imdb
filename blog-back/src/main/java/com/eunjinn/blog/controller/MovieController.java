package com.eunjinn.blog.controller;

import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import com.eunjinn.blog.repository.MovieRepository;
import com.eunjinn.blog.repository.MovieThemeRepository;
import com.eunjinn.blog.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/movie")
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/themeList")
    public ResponseEntity<? super MovieThemeResponseDto> themeList() {
        ResponseEntity<? super MovieThemeResponseDto> response = movieService.themeList();
        return response;
    }
}
