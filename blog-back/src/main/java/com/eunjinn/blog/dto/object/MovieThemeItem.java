package com.eunjinn.blog.dto.object;

import com.eunjinn.blog.entity.MovieThemeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MovieThemeItem {
    private int themeIdx;
    private String themeName;

    public MovieThemeItem(MovieThemeEntity movieThemeEntity) {
        this.themeIdx = movieThemeEntity.getThemeIdx();
        this.themeName = movieThemeEntity.getThemeName();
    }

    public static List<MovieThemeItem> getThemeList(List<MovieThemeEntity> movieThemeEntities) {
        List<MovieThemeItem> list = new ArrayList<>();
        for(MovieThemeEntity movieThemeEntity: movieThemeEntities) {
            MovieThemeItem movieThemeItem = new MovieThemeItem(movieThemeEntity);
            list.add(movieThemeItem);
        }
        return list;
    }

}
