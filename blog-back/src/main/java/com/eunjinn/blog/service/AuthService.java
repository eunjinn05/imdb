package com.eunjinn.blog.service;

import com.eunjinn.blog.dto.request.auth.JoinRequestDto;
import com.eunjinn.blog.dto.request.auth.LoginRequestDto;
import com.eunjinn.blog.dto.response.auth.JoinResponseDto;
import com.eunjinn.blog.dto.response.auth.LoginResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super JoinResponseDto> join(JoinRequestDto dto);
    ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto);
}
