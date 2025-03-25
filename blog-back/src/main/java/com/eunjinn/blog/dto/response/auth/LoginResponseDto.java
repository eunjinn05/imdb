package com.eunjinn.blog.dto.response.auth;

import com.eunjinn.blog.common.ResponseCode;
import com.eunjinn.blog.common.ResponseMessage;
import com.eunjinn.blog.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class LoginResponseDto extends ResponseDto {

    private String token;
    private int expirationTime;

    public LoginResponseDto(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600;
    }

    public static ResponseEntity<? super LoginResponseDto> sucess (String token) {
        LoginResponseDto result = new LoginResponseDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<? super LoginResponseDto> loginFailed() {
        ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
