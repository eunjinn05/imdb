package com.eunjinn.blog.dto.response.movie;

import com.eunjinn.blog.common.ResponseCode;
import com.eunjinn.blog.common.ResponseMessage;
import com.eunjinn.blog.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class MovieUploadResponseDto extends ResponseDto {

    private MovieUploadResponseDto () {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<? super MovieUploadResponseDto> success() {
        MovieUploadResponseDto response = new MovieUploadResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
