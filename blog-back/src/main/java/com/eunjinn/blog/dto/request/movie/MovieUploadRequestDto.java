package com.eunjinn.blog.dto.request.movie;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MovieUploadRequestDto {
    private String movieName;
    private String movieImage;
    private String moviePlot;
    private int movieThemeIdx;
}
