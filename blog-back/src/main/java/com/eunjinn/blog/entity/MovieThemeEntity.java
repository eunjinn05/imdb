package com.eunjinn.blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="movie_theme")
@Table(name="movie_theme")
public class MovieThemeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int themeIdx;
    private String themeName;

}
