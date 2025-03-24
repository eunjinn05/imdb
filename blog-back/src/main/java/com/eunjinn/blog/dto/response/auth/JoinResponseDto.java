package com.eunjinn.blog.dto.response.auth;

import com.eunjinn.blog.common.ResponseCode;
import com.eunjinn.blog.common.ResponseMessage;
import com.eunjinn.blog.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class JoinResponseDto extends ResponseDto {
    private JoinResponseDto () {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super JoinResponseDto> success() {
        JoinResponseDto result = new JoinResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<? super JoinResponseDto> duplicateEmail() {
        ResponseDto response = new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
