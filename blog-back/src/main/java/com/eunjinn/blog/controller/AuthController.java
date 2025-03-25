package com.eunjinn.blog.controller;

import com.eunjinn.blog.dto.request.auth.JoinRequestDto;
import com.eunjinn.blog.dto.request.auth.LoginRequestDto;
import com.eunjinn.blog.dto.response.auth.JoinResponseDto;
import com.eunjinn.blog.dto.response.auth.LoginResponseDto;
import com.eunjinn.blog.dto.response.user.GetUserInfoResponseDto;
import com.eunjinn.blog.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/join")
    public ResponseEntity<? super JoinResponseDto> join(@RequestBody @Valid JoinRequestDto dto) {
        ResponseEntity<? super JoinResponseDto> response = authService.join(dto);
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<? super LoginResponseDto> login(@RequestBody LoginRequestDto dto) {
        ResponseEntity<? super LoginResponseDto> response = authService.login(dto);
        return response;
    }

    @GetMapping("/userInfo")
    public ResponseEntity<? super GetUserInfoResponseDto> getLoginUserInfo(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetUserInfoResponseDto> response = authService.getLoginUser(email);
        return response;
    }
}
