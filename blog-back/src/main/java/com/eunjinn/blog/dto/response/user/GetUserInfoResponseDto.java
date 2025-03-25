package com.eunjinn.blog.dto.response.user;

import com.eunjinn.blog.common.ResponseCode;
import com.eunjinn.blog.common.ResponseMessage;
import com.eunjinn.blog.dto.response.ResponseDto;
import com.eunjinn.blog.entity.AuthEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserInfoResponseDto extends ResponseDto {

    private String memberEmail;
    private String memberName;

    private GetUserInfoResponseDto(AuthEntity authEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.memberEmail = authEntity.getMemberEmail();
        this.memberName = authEntity.getMemberName();
    }

    public static ResponseEntity<? super GetUserInfoResponseDto> success(AuthEntity authEntity) {
        GetUserInfoResponseDto response = new GetUserInfoResponseDto(authEntity);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static ResponseEntity<? super GetUserInfoResponseDto> noExistUser() {
        ResponseDto response = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }


}
