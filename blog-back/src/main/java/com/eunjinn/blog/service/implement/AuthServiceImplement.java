package com.eunjinn.blog.service.implement;

import com.eunjinn.blog.dto.request.auth.JoinRequestDto;
import com.eunjinn.blog.dto.request.auth.LoginRequestDto;
import com.eunjinn.blog.dto.response.ResponseDto;
import com.eunjinn.blog.dto.response.auth.JoinResponseDto;
import com.eunjinn.blog.dto.response.auth.LoginResponseDto;
import com.eunjinn.blog.dto.response.user.GetUserInfoResponseDto;
import com.eunjinn.blog.entity.AuthEntity;
import com.eunjinn.blog.provider.JwtProvider;
import com.eunjinn.blog.repository.AuthRepository;
import com.eunjinn.blog.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtProvider jwtProvider;

    @Override
    public ResponseEntity<? super JoinResponseDto> join(JoinRequestDto dto) {
        try {
            String memberEmail = dto.getMemberEmail();
            boolean existEmail = authRepository.existsByMemberEmail(memberEmail);
            if (existEmail) return JoinResponseDto.duplicateEmail();

            String memberPassword = dto.getMemberPassword();
            String encodeMemberPassword = passwordEncoder.encode(memberPassword);
            dto.setMemberPassword(encodeMemberPassword);

            AuthEntity authEntity = new AuthEntity(dto);
            authRepository.save(authEntity);

        } catch (Exception e) {
            e.printStackTrace();
            JoinResponseDto.databaseError();
        }
        return JoinResponseDto.success();
    }

    @Override
    public ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto) {
            String token = null;
        try {
            String email = dto.getMemberEmail();
            AuthEntity authEntity = authRepository.findByMemberEmail(email);
            if(authEntity == null) return LoginResponseDto.loginFailed();

            String password = dto.getMemberPassword();
            String encodePassword = authEntity.getMemberPassword();

            boolean isMatched = passwordEncoder.matches(password, encodePassword);
            if(!isMatched) return LoginResponseDto.loginFailed();

            token = jwtProvider.createToken(email);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.databaseError();
        }
        return LoginResponseDto.sucess(token);
    }

    @Override
    public ResponseEntity<? super GetUserInfoResponseDto> getLoginUser(String email) {
        AuthEntity authEntity = null;
        try {
            authEntity = authRepository.findByMemberEmail(email);
            if(authEntity == null) return GetUserInfoResponseDto.noExistUser();
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserInfoResponseDto.success(authEntity);
    }
}
