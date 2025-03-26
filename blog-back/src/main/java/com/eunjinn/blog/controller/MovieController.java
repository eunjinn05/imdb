package com.eunjinn.blog.controller;

import com.eunjinn.blog.dto.request.movie.MovieUploadRequestDto;
import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import com.eunjinn.blog.dto.response.movie.MovieUploadResponseDto;
import com.eunjinn.blog.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/upload")
    public ResponseEntity<? super MovieUploadResponseDto> upload(@RequestBody @Valid MovieUploadRequestDto dto) {
        ResponseEntity<? super MovieUploadResponseDto> response = movieService.upload(dto);
        return response;
    }

}
