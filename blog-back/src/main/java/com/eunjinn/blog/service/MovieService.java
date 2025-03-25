package com.eunjinn.blog.service;

import com.eunjinn.blog.dto.response.movie.MovieThemeResponseDto;
import org.springframework.http.ResponseEntity;

public interface MovieService {
    ResponseEntity<? super MovieThemeResponseDto> themeList();
}
