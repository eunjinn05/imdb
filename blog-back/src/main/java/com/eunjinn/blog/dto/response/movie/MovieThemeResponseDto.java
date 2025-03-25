package com.eunjinn.blog.dto.response.movie;

import com.eunjinn.blog.common.ResponseCode;
import com.eunjinn.blog.common.ResponseMessage;
import com.eunjinn.blog.dto.object.MovieThemeItem;
import com.eunjinn.blog.dto.response.ResponseDto;
import com.eunjinn.blog.entity.MovieThemeEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class MovieThemeResponseDto extends ResponseDto {

    private List<MovieThemeItem> getThemeList;

    private MovieThemeResponseDto (List<MovieThemeEntity> movieThemeEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.getThemeList = MovieThemeItem.getThemeList(movieThemeEntities);
    }

    public static ResponseEntity<? super MovieThemeResponseDto> success(List<MovieThemeEntity> movieThemeEntities) {
        MovieThemeResponseDto response = new MovieThemeResponseDto(movieThemeEntities);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
