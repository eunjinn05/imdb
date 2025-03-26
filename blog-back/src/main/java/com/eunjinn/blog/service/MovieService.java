package com.eunjinn.blog.service;

import com.eunjinn.blog.dto.request.movie.MovieUploadRequestDto;
import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import com.eunjinn.blog.dto.response.movie.MovieUploadResponseDto;
import org.springframework.http.ResponseEntity;

public interface MovieService {
    ResponseEntity<? super MovieThemeResponseDto> themeList();
    ResponseEntity<? super MovieUploadResponseDto> upload(MovieUploadRequestDto dto);
}
